using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;

public class UpdateDanhGiaCommandHandler : ICommandHandler<UpdateDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<DanhGia> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;
    private readonly IVetXuLyDanhGiaService _vetXuLyDanhGiaService;
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;
    private readonly IMediator _mdeiator;
    private readonly IDapperRepository _dapperRepository;
    public UpdateDanhGiaCommandHandler(IRepositoryWithEvents<DanhGia> repositoryWithEvents, ICurrentUser currentUser, IVetXuLyDanhGiaService vetXuLyDanhGiaService, IReadRepository<BuocXuLy> buocXuLyRepo, IDapperRepository dapperRepository, IMediator mdeiator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
        _buocXuLyRepo = buocXuLyRepo;
        _dapperRepository = dapperRepository;
        _mdeiator = mdeiator;
    }

    public async Task<Result> Handle(UpdateDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        string currentUserId = _currentUser.GetUserGroupId() ?? string.Empty;
        var buocXuLy = await _buocXuLyRepo.GetByIdAsync(request.BuocHienTaiId, cancellationToken) ??
       throw new NotFoundException($"Bước xử lý với Id: {request.BuocHienTaiId} không tồn tại hoặc đã bị xóa");

        await _vetXuLyDanhGiaService.Add(Guid.Parse(currentUserId), (Guid)itemExitst.BuocHienTaiId, itemExitst.Id, "UpdateDanhGia", request.TenThaoTacVetXuLy, _currentUser.GetUserFullName(), _currentUser.GetUserName(), request.LaNguoiDaXuLy ?? false, buocXuLy.TrangThaiDanhGiaId, cancellationToken);
        var updatedTinBai = itemExitst.Update(request.MaPhieu, request.LoaiDanhGia, request.ChiTietDiemDanhGia, request.HoVaTen, request.TaiKhoan, request.MaNguoiDung, request.ChucVu,
            request.ChucDanh, request.TenPhongBan, request.MaPhongBan, request.TenDonVi, request.MaDonVi, request.TrangThai, request.PhanLoaiLanhDaoDanhGia, request.PhanLoaiTuDanhGia, request.PhanLoaiDanhGia, request.PhanLoaiNhanXet,
            request.DiemDanhGia, request.DiemTuDanhGia, request.DiemNhanXet, request.DiemThamMuu, request.DiemLanhDaoDanhGia, request.PhanLoaiThamMuu, request.NamDanhGia, request.ThoiGianTao, request.ThoiGianNhanXet, request.ThoiGianDanhGia, request.ThoiGianHDDanhGia, request.ThoiGianThamMuu, request.TruongDonVi, request.SuDung,
            request.MaDonViCha, request.LyDoThayDoiXepLoai, request.YKienLanhDao, request.YKienTuDanhGia, request.YKienNhanXet, request.YKienThamMuu, request.YkienDanhGia,
            request.FileDinhKem, request.FileDinhKemNX, request.FileDinhKemTM, request.FileDinhKemDG, request.KhongDanhGia, request.KiemNhiem, request.Phone, request.Email,
            request.NguoiTaoUser, request.NguoiSuaUser, request.NgaySuaUser, request.NgayTaoUser, request.ThuTu, request.TenMauPhieuDanhGia, request.MaMauPhieuDanhGia, request.NguoiTuDanhGia, request.NguoiTuDanhGiaId,
            request.NguoiNhanXet, request.NguoiNhanXetId, request.NguoiThamMuu, request.NguoiThamMuuId, request.NguoiDanhGia, request.NguoiDanhGiaId, request.ThamQuyenXepLoai, request.BuocHienTaiId, request.BuocTruocId, request.NguoiDangXuLyId,
            request.DaXem, request.MaHoSo, request.ThoiGianQuery, request.LoaiThoiGian, request.ThoiGian, request.MaBoTieuChuan, request.QuyTrinhXuLyId, request.UrlPdf, request.UrlDocx, request.IsKySoCaNhan, request.IsKySoNhanXet, request.IsKySoThamMuu, request.IsKySoLanhDao, request.ResetUrlPhieu, request.MaDonViFull);
        try
        {
            await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        }
        catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }

        var req = new CapNhatDuLieuThongKeCommand()
        {
            Type = "DanhGia",
            XuLy = "Sua",
            Input = updatedTinBai,
            InputKT = null,
            PhanLoaiCu = itemExitst.TrangThai,
            TrangThaiCVCu = itemExitst.PhanLoaiDanhGia,
        };
        var res = await _mdeiator.Send(req);
        return (Result)Result.Success();
    }
}
