using Microsoft.Extensions.Configuration;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Business.HoSoCongTacDanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;
public class AddDanhGiaDonViCommandHandler : ICommandHandler<AddDanhGiaDonViCommand, Guid>
{
    private readonly IRepositoryWithEvents<DanhGiaDonVi> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;
    private readonly IVetXuLyDanhGiaToChucService _VetXuLyDanhGiaToChucService;
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;
    private readonly IMediator _mediator;
    private readonly IDapperRepository _dapperRepository;

    public AddDanhGiaDonViCommandHandler(IRepositoryWithEvents<DanhGiaDonVi> repositoryWithEvents, ICurrentUser currentUser, IVetXuLyDanhGiaToChucService VetXuLyDanhGiaToChucService, IReadRepository<BuocXuLy> buocXuLyRepo, IDapperRepository dapperRepository, IMediator mdeiator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _VetXuLyDanhGiaToChucService = VetXuLyDanhGiaToChucService;
        _buocXuLyRepo = buocXuLyRepo;
        _dapperRepository = dapperRepository;
        _mediator = mdeiator;
    }

    public async Task<Result<DefaultIdType>> Handle(AddDanhGiaDonViCommand request, CancellationToken cancellationToken)
    {
        Guid maPhieu = Guid.NewGuid();
        var currentUserId = _currentUser.GetUserId();
        string currentUserGroupId = _currentUser.GetUserGroupId();
        IReadOnlyList<string> userIds = new List<string>() { currentUserId.ToString() };
        var danhGia = DanhGiaDonVi.Create(maPhieu.ToString(), request.ChiTietDiemDanhGia, request.TenPhongBan, request.MaPhongBan, request.TenDonVi, request.MaDonVi, request.TrangThai, request.PhanLoaiTuDanhGia, request.PhanLoaiDanhGia,
           request.DiemDanhGia, request.DiemTuDanhGia, request.NamDanhGia, request.ThoiGianTao, request.ThoiGianDanhGia, request.SuDung,
           request.MaDonViCha, request.YKienTuDanhGia, request.YKienDanhGia,
           request.FileDinhKem, request.FileDinhKemDG, request.TenMauPhieuDanhGia, request.MaMauPhieuDanhGia, request.DaXem, request.ThoiGianQuery, request.LoaiThoiGian, request.ThoiGian, request.MaBoTieuChuan, request.TenBoTieuChuan, request.DanhSachPhanLoaiDanhGia,
           request.QuyTrinhXuLyId, request.UrlPdf, request.UrlDocx, request.DiemThamMuu, request.PhanLoaiThamMuu, request.ThoiGianThamMuu,
           request.NguoiTuDanhGia, request.NguoiTuDanhGiaId, request.NguoiThamMuu, request.NguoiThamMuuId, request.NguoiDanhGia, request.NguoiDanhGiaId, request.BuocHienTaiId, request.BuocTruocId, request.NguoiDangXuLyId
           , request.YKienLanhDao, request.YKienThamMuu, request.FileDinhKemTM, request.PhanLoaiLanhDaoDanhGia, request.DiemLanhDaoDanhGia, request.IsKySoDonVi, request.IsKySoThamMuu, request.IsKySoLanhDao);
        var buocXuLy = await _buocXuLyRepo.GetByIdAsync(request.BuocHienTaiId, cancellationToken) ??
        throw new NotFoundException($"Bước xử lý với Id: {request.BuocHienTaiId} không tồn tại hoặc đã bị xóa");
        string count = await CheckKyDanhGia(request.MaBoTieuChuan ?? string.Empty, request.ThoiGianQuery, request.MaDonVi ?? string.Empty);
        if (!string.IsNullOrEmpty(count))
        {
            var idGuid = Guid.Parse(count);
            var itemExitst = await _repositoryWithEvents.GetByIdAsync(idGuid, cancellationToken);
            var updatedDanhGia = itemExitst.Update(maPhieu.ToString(), request.ChiTietDiemDanhGia, request.TenPhongBan, request.MaPhongBan, request.TenDonVi, request.MaDonVi, request.TrangThai, request.PhanLoaiTuDanhGia, request.PhanLoaiDanhGia,
               request.DiemDanhGia, request.DiemTuDanhGia, request.NamDanhGia, request.ThoiGianTao, request.ThoiGianDanhGia, request.SuDung,
               request.MaDonViCha, request.YKienTuDanhGia, request.YKienDanhGia,
               request.FileDinhKem, request.FileDinhKemDG, request.TenMauPhieuDanhGia, request.MaMauPhieuDanhGia, request.DaXem, request.ThoiGianQuery, request.LoaiThoiGian, request.ThoiGian, request.MaBoTieuChuan, request.QuyTrinhXuLyId, request.UrlPdf, request.UrlDocx, request.DiemThamMuu, request.PhanLoaiThamMuu, request.ThoiGianThamMuu,
               request.NguoiTuDanhGia, request.NguoiTuDanhGiaId, request.NguoiThamMuu, request.NguoiThamMuuId, request.NguoiDanhGia, request.NguoiDanhGiaId, request.BuocHienTaiId, request.BuocTruocId, request.NguoiDangXuLyId, request.YKienLanhDao, request.YKienThamMuu, request.FileDinhKemTM, request.PhanLoaiLanhDaoDanhGia, request.DiemLanhDaoDanhGia,
               request.IsKySoDonVi, request.IsKySoThamMuu, request.IsKySoLanhDao, false);

            await _repositoryWithEvents.UpdateAsync(updatedDanhGia, cancellationToken);

            await _VetXuLyDanhGiaToChucService.Add(Guid.Parse(currentUserGroupId), updatedDanhGia.BuocHienTaiId, updatedDanhGia.Id, "TuDanhGia", request.TenThaoTacVetXuLy, _currentUser.GetUserFullName(), _currentUser.GetUserName(), request.LaNguoiDaXuLy ?? false, buocXuLy.TrangThaiDanhGiaId, cancellationToken);


        }
        else
        {
            try
            {
                var results = await _repositoryWithEvents.AddAsync(danhGia, cancellationToken);

                await _VetXuLyDanhGiaToChucService.Add(Guid.Parse(currentUserGroupId), results.BuocHienTaiId, results.Id, "TuDanhGia", request.TenThaoTacVetXuLy, _currentUser.GetUserFullName(), _currentUser.GetUserName(), request.LaNguoiDaXuLy ?? false, buocXuLy.TrangThaiDanhGiaId, cancellationToken);


            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }

        await _mediator.Send(new AddHoSoCongTacDanhGiaCommand()
        {
            DanhGiaId = danhGia.Id.ToString()
        });

        return Result<Guid>.Success(maPhieu);
    }

    public async Task<string> CheckKyDanhGia(string BoTieuChuanID, int? ky, string donVi = null, string xuLyAdd = null)
    {
        string idDg = string.Empty;

        // var idBo = int.Parse(BoTieuChuanID);
        int intNam = DateTime.Today.Year;
        string query = "SELECT top 1 ID FROM " + "Business.DanhGiaDonVis";
        string where = " WHERE SuDung = 1 AND DeletedOn IS NULL";
        if (!string.IsNullOrEmpty(xuLyAdd)) where += $" and TrangThai!=N'Chưa đánh giá'";
        if (!string.IsNullOrEmpty(donVi)) where += $" and MaPhongBan = N'{donVi}'";
        //where += $" and NamDanhGia = {intNam}";
        where += $" and MaBoTieuChuan = '{BoTieuChuanID}'";
        where += $" and ThoiGianQuery = {ky}";

        var itemDG = await _dapperRepository.QueryAsync<DanhGia>(query + where);

        // Kiểm tra nếu có kết quả
        if (itemDG != null && itemDG.Any())
        {
            idDg = itemDG.First().Id.ToString(); // Lấy ID của bản ghi đầu tiên
        }

        return idDg;
    }
}
