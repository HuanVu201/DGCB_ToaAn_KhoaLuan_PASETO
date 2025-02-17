using Microsoft.Extensions.Configuration;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
using TD.DanhGiaCanBo.Application.Business.HoSoCongTacDanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
public class AddDanhGiaCommandHandler : ICommandHandler<AddDanhGiaCommand, Guid>
{
    private readonly IRepositoryWithEvents<DanhGia> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;
    private readonly IVetXuLyDanhGiaService _vetXuLyDanhGiaService;
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;
    private readonly IMediator _mediator;
    private readonly IDapperRepository _dapperRepository;

    public AddDanhGiaCommandHandler(IRepositoryWithEvents<DanhGia> repositoryWithEvents, ICurrentUser currentUser, IVetXuLyDanhGiaService vetXuLyDanhGiaService, IReadRepository<BuocXuLy> buocXuLyRepo, IDapperRepository dapperRepository, IMediator mdeiator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
        _buocXuLyRepo = buocXuLyRepo;
        _dapperRepository = dapperRepository;
        _mediator = mdeiator;
    }
    public async Task<Result<DefaultIdType>> Handle(AddDanhGiaCommand request, CancellationToken cancellationToken)
    {
        Guid maPhieu = Guid.NewGuid();
        /// Nhận idQuyTrinhLa bước hiện tại
        var currentUserId = _currentUser.GetUserId();
        var currentUserGroupId = _currentUser.GetUserGroupId();
        IReadOnlyList<string> userIds = new List<string>() { currentUserId.ToString() };
        if (string.IsNullOrEmpty(request.LoaiDanhGia))
            request.LoaiDanhGia = "Cá nhân";
        var danhGia = DanhGia.Create(maPhieu.ToString(), request.LoaiDanhGia, request.ChiTietDiemDanhGia, request.HoVaTen, request.TaiKhoan, request.MaNguoiDung, request.ChucVu,
           request.ChucDanh, request.TenPhongBan, request.MaPhongBan, request.TenDonVi, request.MaDonVi, request.TrangThai, request.PhanLoaiLanhDaoDanhGia, request.PhanLoaiTuDanhGia, request.PhanLoaiDanhGia, request.PhanLoaiNhanXet,
           request.DiemDanhGia, request.DiemTuDanhGia, request.DiemNhanXet, request.DiemThamMuu, request.DiemLanhDaoDanhGia, request.PhanLoaiThamMuu, request.NamDanhGia, request.ThoiGianTao, request.ThoiGianNhanXet, request.ThoiGianDanhGia, request.ThoiGianHDDanhGia, request.ThoiGianThamMuu, request.TruongDonVi, request.SuDung,
           request.MaDonViCha, request.LyDoThayDoiXepLoai, request.YKienLanhDao, request.YKienTuDanhGia, request.YKienNhanXet, request.YKienThamMuu, request.YKienDanhGia,
           request.FileDinhKem, request.FileDinhKemNX, request.FileDinhKemTM, request.FileDinhKemDG, request.KhongDanhGia, request.KiemNhiem, request.Phone, request.Email,
           request.NguoiTaoUser, request.NguoiSuaUser, request.NgaySuaUser, request.NgayTaoUser, request.ThuTu, request.TenMauPhieuDanhGia, request.MaMauPhieuDanhGia, request.NguoiTuDanhGia, request.NguoiTuDanhGiaId,
           request.NguoiNhanXet, request.NguoiNhanXetId, request.NguoiThamMuu, request.NguoiThamMuuId, request.NguoiDanhGia, request.NguoiDanhGiaId, request.ThamQuyenXepLoai, request.BuocHienTaiId, request.BuocTruocId, request.NguoiDangXuLyId,
           request.DaXem, request.MaHoSo, request.ThoiGianQuery, request.LoaiThoiGian, request.ThoiGian, request.MaBoTieuChuan, request.TenBoTieuChuan, request.DanhSachPhanLoaiDanhGia, request.QuyTrinhXuLyId, request.UrlPdf, request.UrlDocx,
           request.IsKySoCaNhan, request.IsKySoNhanXet, request.IsKySoThamMuu, request.IsKySoLanhDao, request.MaDonViFull);
        var buocXuLy = await _buocXuLyRepo.GetByIdAsync(request.BuocHienTaiId, cancellationToken) ??
         throw new NotFoundException($"Bước xử lý với Id: {request.BuocHienTaiId} không tồn tại hoặc đã bị xóa");

        var count = await CheckKyDanhGia(request.MaBoTieuChuan, request.ThoiGianQuery, request.TaiKhoan, request.MaDonVi);
        if (!string.IsNullOrEmpty(count))
        {
            var guidID = Guid.Parse(count);
            var itemExitst = await _repositoryWithEvents.GetByIdAsync(guidID, cancellationToken);
            var updatedDanhGia = itemExitst.Update(maPhieu.ToString(), request.LoaiDanhGia, request.ChiTietDiemDanhGia, request.HoVaTen, request.TaiKhoan, request.MaNguoiDung, request.ChucVu,
            request.ChucDanh, request.TenPhongBan, request.MaPhongBan, request.TenDonVi, request.MaDonVi, request.TrangThai, request.PhanLoaiLanhDaoDanhGia, request.PhanLoaiTuDanhGia, request.PhanLoaiDanhGia, request.PhanLoaiNhanXet,
            request.DiemDanhGia, request.DiemTuDanhGia, request.DiemNhanXet, request.DiemThamMuu, request.DiemLanhDaoDanhGia, request.PhanLoaiThamMuu, request.NamDanhGia, request.ThoiGianTao, request.ThoiGianNhanXet, request.ThoiGianDanhGia, request.ThoiGianHDDanhGia, request.ThoiGianThamMuu, request.TruongDonVi, request.SuDung,
            request.MaDonViCha, request.LyDoThayDoiXepLoai, request.YKienLanhDao, request.YKienTuDanhGia, request.YKienNhanXet, request.YKienThamMuu, request.YKienDanhGia,
            request.FileDinhKem, request.FileDinhKemNX, request.FileDinhKemTM, request.FileDinhKemDG, request.KhongDanhGia, request.KiemNhiem, request.Phone, request.Email,
            request.NguoiTaoUser, request.NguoiSuaUser, request.NgaySuaUser, request.NgayTaoUser, request.ThuTu, request.TenMauPhieuDanhGia, request.MaMauPhieuDanhGia, request.NguoiTuDanhGia, request.NguoiTuDanhGiaId,
            request.NguoiNhanXet, request.NguoiNhanXetId, request.NguoiThamMuu, request.NguoiThamMuuId, request.NguoiDanhGia, request.NguoiDanhGiaId, request.ThamQuyenXepLoai, request.BuocHienTaiId, request.BuocTruocId, request.NguoiDangXuLyId,
            request.DaXem, request.MaHoSo, request.ThoiGianQuery, request.LoaiThoiGian, request.ThoiGian, request.MaBoTieuChuan, request.QuyTrinhXuLyId, request.UrlPdf, request.UrlDocx, request.IsKySoCaNhan, request.IsKySoNhanXet, request.IsKySoThamMuu, request.IsKySoLanhDao, false, request.MaDonViFull);
            await _repositoryWithEvents.UpdateAsync(updatedDanhGia, cancellationToken);
            await _vetXuLyDanhGiaService.Add(Guid.Parse(currentUserGroupId), updatedDanhGia.BuocHienTaiId, updatedDanhGia.Id, "TuDanhGia", request.TenThaoTacVetXuLy, _currentUser.GetUserFullName(), _currentUser.GetUserName(), request.LaNguoiDaXuLy ?? false, buocXuLy.TrangThaiDanhGiaId, cancellationToken);
            var req = new CapNhatDuLieuThongKeCommand()
            {
                Type = "DanhGia",
                XuLy = "Them",
                Input = updatedDanhGia,
                InputKT = null,
                PhanLoaiCu = null,
                TrangThaiCVCu = null,
            };
            var res = await _mediator.Send(req);
        }
        else
        {
            try
            {
                var results = await _repositoryWithEvents.AddAsync(danhGia, cancellationToken);
                await _vetXuLyDanhGiaService.Add(Guid.Parse(currentUserGroupId), results.BuocHienTaiId, results.Id, "TuDanhGia", request.TenThaoTacVetXuLy, _currentUser.GetUserFullName(), _currentUser.GetUserName(), request.LaNguoiDaXuLy ?? false, buocXuLy.TrangThaiDanhGiaId, cancellationToken);
                var req = new CapNhatDuLieuThongKeCommand()
                {
                    Type = "DanhGia",
                    XuLy = "Them",
                    Input = danhGia,
                    InputKT = null,
                    PhanLoaiCu = null,
                    TrangThaiCVCu = null,
                };

                var res = await _mediator.Send(req);
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

    public async Task<string> CheckKyDanhGia(string BoTieuChuanID, int? ky, string tkUser, string donVi = null, string xuLyAdd = null)
    {
        string idDg = string.Empty;

        // var idBo = int.Parse(BoTieuChuanID);
        var intNam = DateTime.Today.Year;
        string query = "SELECT top 1 ID FROM " + "Business.DanhGias";
        string where = " WHERE SuDung = 1  AND DeletedOn IS NULL";
        if (!string.IsNullOrEmpty(xuLyAdd)) where += $" and TrangThai!=N'Chưa đánh giá'";

        // else where += $" and TrangThai = N'Chưa đánh giá'";
        where += $" and TaiKhoan = N'{tkUser}'";
        if (!string.IsNullOrEmpty(donVi)) where += $" and MaDonVi = N'{donVi}'";
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
