using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;
public class ThuHoiPhieuDanhGiaCommandHandler : ICommandHandler<ThuHoiPhieuDanhGiaDonViCommand>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<DanhGiaDonVi> _readRepository;
    private readonly IVetXuLyDanhGiaToChucService _vetXuLyDanhGiaService;
    private readonly ICurrentUser _currentUser;
    public ThuHoiPhieuDanhGiaCommandHandler(IDapperRepository dapperRepository, IReadRepository<DanhGiaDonVi> readRepository, IVetXuLyDanhGiaToChucService vetXuLyDanhGiaService, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _readRepository = readRepository;
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
        _currentUser = currentUser;
    }

    public async Task<Result> Handle(ThuHoiPhieuDanhGiaDonViCommand request, CancellationToken cancellationToken)
    {
        var currentUserGroupId = _currentUser.GetUserGroupId();
        if (string.IsNullOrEmpty(currentUserGroupId))
        {
            throw new NotFoundException($"Không có thông tin user chưa được thêm vào hệ thống");
        }

        string trangThai = string.Empty;
        var itemDG = await _readRepository.FirstOrDefaultAsync(new GetDanhGiaDonViByIdSpec(request.Id), cancellationToken);
        if (itemDG == null)
        {
            throw new NotFoundException($"DanhGiaDonVi với mã: {request.Id} chưa được thêm vào hệ thống");
        }

        string daXem = itemDG.DaXem ?? string.Empty;
        string propUpdate = string.Empty;

       if (itemDG.TrangThai == "Chờ tham mưu")
        {

            if (daXem != "2")
            {
               
                    propUpdate += $"TrangThai = N'Đang đánh giá', DaXem = N'0', NguoiThamMuu = NULL, NguoiThamMuuId = NULL,NguoiDangXuLyId = CreatedBy, BuocHienTaiId = BuocTruocId, BuocTruocId = NULL,";
                    trangThai = "Đang đánh giá";
                
            }
            else
            {
                return (Result)Result.Fail(message: "Lãnh đạo cấp trên đã xem, không thể trả lại!");
            }
        }
        else if (itemDG.TrangThai == "Chờ đánh giá")
        {
            if (daXem != "3")
            {
                if (!string.IsNullOrEmpty(itemDG.NguoiThamMuu))
                {

                    propUpdate += $"TrangThai = N'Chờ tham mưu', DaXem = N'2', NguoiDanhGiaDonVi = NULL, NguoiDanhGiaId = NULL,NguoiDangXuLyId = NguoiThamMuuId, BuocHienTaiId = BuocTruocId, BuocTruocId = NULL,";
                    trangThai = "Chờ tham mưu";
                }
                else
                {
                    propUpdate += $"TrangThai = N'Đang đánh giá', DaXem = N'0', NguoiDanhGiaDonVi = NULL, NguoiDanhGiaId = NULL, NguoiDangXuLyId =CreatedBy,BuocHienTaiId = BuocTruocId, BuocTruocId = NULL,";
                    trangThai = "Đang đánh giá";
                }
            }
            else
            {
                return (Result)Result.Fail(message: "Lãnh đạo cấp trên đã xem, không thể trả lại!");
            }
        }

        // Lấy phiếu đánh giá theo id
        // Kiểm tra trạng thái  nếu  CHờ nhận xét

        string sql = $"UPDATE [Business].[DanhGias] SET {propUpdate.TrimEnd(',')} WHERE [Id] = @ID";
        if (string.IsNullOrEmpty(trangThai))
        {
            return (Result)Result.Fail(message: "Không có thông tin của trang thái!");
        }

        try
        {
            string sqlTrangThai = $@"Select Ten, Id From {TableNames.TrangThaiDanhGias} Where Ten = @Ten";
            var itemTrangThai = await _dapperRepository.QueryFirstOrDefaultAsync<TrangThaiDanhGiaDto>(sqlTrangThai, new { Ten = trangThai });
            if (itemTrangThai == null)
                return (Result)Result.Fail(message: $"Trạng thái {trangThai} chưa tồn tại");

            await _dapperRepository.ExcuteAsync(sql, new { Id = request.Id });
            await _vetXuLyDanhGiaService.Add(Guid.Parse(currentUserGroupId), (Guid)itemDG.BuocTruocId, itemDG.Id, "ThuHoiChamDiem", request.TenBuocXuLy, _currentUser.GetUserFullName(), _currentUser.GetUserName(), true, itemTrangThai.Id, cancellationToken);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message, ex);
        }

        return (Result)Result.Success(message: "Thu hồi đánh giá thành công!");
    }
}
