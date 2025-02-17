using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;

public class UpdateDanhGiaDonViCommandHandler : ICommandHandler<UpdateDanhGiaDonViCommand>
{
    private readonly IRepositoryWithEvents<DanhGiaDonVi> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;
    private readonly IVetXuLyDanhGiaToChucService _vetXuLyDanhGiaToChucService;
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;
    private readonly IMediator _mdeiator;
    private readonly IDapperRepository _dapperRepository;
    public UpdateDanhGiaDonViCommandHandler(IRepositoryWithEvents<DanhGiaDonVi> repositoryWithEvents, ICurrentUser currentUser, IVetXuLyDanhGiaToChucService vetXuLyDanhGiaToChucService, IReadRepository<BuocXuLy> buocXuLyRepo, IDapperRepository dapperRepository, IMediator mdeiator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _vetXuLyDanhGiaToChucService = vetXuLyDanhGiaToChucService;
        _buocXuLyRepo = buocXuLyRepo;
        _dapperRepository = dapperRepository;
        _mdeiator = mdeiator;
    }

    public async Task<Result> Handle(UpdateDanhGiaDonViCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhGiaDonVi với mã: {request.Id} chưa được thêm vào hệ thống");
        //
        string currentUserId = _currentUser.GetUserGroupId() ?? string.Empty;
        var buocXuLy = await _buocXuLyRepo.GetByIdAsync(request.BuocHienTaiId, cancellationToken) ??
       throw new NotFoundException($"Bước xử lý với Id: {request.BuocHienTaiId} không tồn tại hoặc đã bị xóa");

        await _vetXuLyDanhGiaToChucService.Add(Guid.Parse(currentUserId), (Guid)itemExitst.BuocHienTaiId, itemExitst.Id, "UpdateDanhGia", request.TenThaoTacVetXuLy, _currentUser.GetUserFullName(), _currentUser.GetUserName(), request.LaNguoiDaXuLy ?? false, buocXuLy.TrangThaiDanhGiaId, cancellationToken);
        var updatedTinBai = itemExitst.Update(request.MaPhieu, request.ChiTietDiemDanhGia, request.TenPhongBan, request.MaPhongBan, request.TenDonVi, request.MaDonVi, request.TrangThai, request.PhanLoaiTuDanhGia, request.PhanLoaiDanhGia,
           request.DiemDanhGia, request.DiemTuDanhGia, request.NamDanhGia, request.ThoiGianTao, request.ThoiGianDanhGia, request.SuDung,
           request.MaDonViCha, request.YKienTuDanhGia, request.YKienDanhGia,
           request.FileDinhKem, request.FileDinhKemDG, request.TenMauPhieuDanhGia, request.MaMauPhieuDanhGia, request.DaXem, request.ThoiGianQuery, request.LoaiThoiGian, request.ThoiGian, request.MaBoTieuChuan,
           request.QuyTrinhXuLyId, request.UrlPdf, request.UrlDocx,
           request.DiemThamMuu, request.PhanLoaiThamMuu, request.ThoiGianThamMuu,
           request.NguoiTuDanhGia, request.NguoiTuDanhGiaId, request.NguoiThamMuu, request.NguoiThamMuuId, request.NguoiDanhGia, request.NguoiDanhGiaId, request.BuocHienTaiId, request.BuocTruocId, request.NguoiDangXuLyId, request.YKienLanhDao, request.YKienThamMuu, request.FileDinhKemTM, request.PhanLoaiLanhDaoDanhGia, request.DiemLanhDaoDanhGia,
           request.IsKySoDonVi, request.IsKySoThamMuu, request.IsKySoLanhDao, request.ResetUrlPhieu);
        try
        {
            await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);

        }
        catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }

        return (Result)Result.Success();
    }
}
