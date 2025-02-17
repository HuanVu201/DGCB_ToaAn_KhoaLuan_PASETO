using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
public class XoaDiemLanhDaoChamDGDVCommandHandler : ICommandHandler<XoaDiemLanhDaoChamDGDVCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<DanhGiaDonVi> _readRepository;
    private readonly IVetXuLyDanhGiaService _vetXuLyDanhGiaService;
    private readonly ICurrentUser _currentUser;
    private readonly IRepository<DanhGiaDonVi> _danhGiaRepo;
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;

    public XoaDiemLanhDaoChamDGDVCommandHandler(IDapperRepository dapperRepository, IReadRepository<DanhGiaDonVi> readRepository, IVetXuLyDanhGiaService vetXuLyDanhGiaService, ICurrentUser currentUser, IRepository<DanhGiaDonVi> danhGiaRepo, IReadRepository<BuocXuLy> buocXuLyRepo)
    {
        _dapperRepository = dapperRepository;
        _readRepository = readRepository;
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
        _currentUser = currentUser;
        _danhGiaRepo = danhGiaRepo;
        _buocXuLyRepo = buocXuLyRepo;
    }

    public async Task<Result> Handle(XoaDiemLanhDaoChamDGDVCommand request, CancellationToken cancellationToken)
    {
        var currentUserGroupId = _currentUser.GetUserGroupId();
        if (string.IsNullOrEmpty(currentUserGroupId))
        {
            throw new NotFoundException($"Không có thông tin user chưa được thêm vào hệ thống");
        }


        string currentUserId = _currentUser.GetUserGroupId() ?? string.Empty;
        IReadOnlyList<string> userIds = new List<string>() { currentUserId };
        var danhGia = await _danhGiaRepo.GetByIdAsync(request.DanhGiaId, cancellationToken);

        if (danhGia == null)
            throw new NotFoundException($"Đánh giá với Id: {request.DanhGiaId} không tồn tại hoặc đã bị xóa");

        // var buocXuLy = await _buocXuLyRepo.GetByIdAsync(danhGia.BuocHienTaiId, cancellationToken) ??
        // throw new NotFoundException($"Bước xử lý với Id: {danhGia.BuocHienTaiId} không tồn tại hoặc đã bị xóa");

        try
        {
            danhGia.XoaDiemLanhDaoCham(request.LoaiDiem, danhGia.NguoiThamMuu);
            await XoaDiemChiTietPhieu(danhGia.MaPhieu, request.LoaiDiem);
        }
        catch (Exception ex)
        {
            throw new NotFoundException(ex.Message);
        }


        // await _vetXuLyDanhGiaService.Add(Guid.Parse(currentUserId), (Guid)danhGia.BuocHienTaiId, danhGia.Id, request.TenThaoTac, request.TenThaoTac, _currentUser.GetUserFullName(), _currentUser.GetUserName(), false, (Guid)buocXuLy.TrangThaiDanhGiaId, cancellationToken);
        await _danhGiaRepo.SaveChangesAsync(cancellationToken);

        return (Result)Result.Success(message: "Xóa thông tin chấm điểm thành công!");
    }

    public async Task XoaDiemChiTietPhieu(string maPhieu, string loaiDiem)
    {
        string query = $"SELECT ID FROM {TableNames.ChiTietDanhGiaDonVis} WHERE MaPhieu = @MaPhieu";
        var lstDG = (await _dapperRepository.QueryAsync<ChiTietDanhGiaDonVi2Dto>(query, new { MaPhieu = maPhieu })).ToList();

        if (lstDG.Count > 0)
        {
            foreach (var item in lstDG)
            {
                var propUpdate = new List<string>();

                 if (loaiDiem == "ThamMuu")
                {
                    propUpdate.Add("DiemThamMuu = NULL");
                    propUpdate.Add("DataThamMuu = NULL");
                }
                else if (loaiDiem == "DanhGia")
                {
                    propUpdate.Add("DiemLanhDaoDanhGia = NULL");
                    propUpdate.Add("DataLanhDaoDanhGia = NULL");
                }

                // propUpdate.Add("SuDung = 1");

                string whereUpdate = $" WHERE ID = @Id";
                string sqlQuery = $"UPDATE {TableNames.ChiTietDanhGiaDonVis} SET {string.Join(", ", propUpdate)}" + whereUpdate;

                try
                {
                    await _dapperRepository.ExcuteAsync(sqlQuery, new { Id = item.Id });
                }
                catch (Exception ex)
                {
                    throw new Exception("Lỗi cập nhật [Business].[ChiTietDanhGiaDonVis]: " + ex.Message);
                }
            }
        }
    }
}
