using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class XoaDanhGiaQTQueryHandler : ICommandHandler<XoaDanhGiaQTQuery>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<DanhGia> _repositoryWithEvents;
    private readonly IVetXuLyDanhGiaService _vetXuLyDanhGiaService;
    private readonly ICurrentUser _currentUser;
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;
    public XoaDanhGiaQTQueryHandler(IDapperRepository dapperRepository, IRepositoryWithEvents<DanhGia> repositoryWithEvents, IVetXuLyDanhGiaService vetXuLyDanhGiaService, ICurrentUser currentUser, IReadRepository<BuocXuLy> buocXuLyRepo)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
        _currentUser = currentUser;
        _buocXuLyRepo = buocXuLyRepo;
    }
    public async Task<Result> Handle(XoaDanhGiaQTQuery request, CancellationToken cancellationToken)
    {
        var currentUserID = _currentUser.GetUserGroupId();
        var tenThaoTac = "Xoa";

        //var namHT = DateTime.Now.Year.ToString();
        //string tableCheck = string.Empty;
        //if (!string.IsNullOrEmpty(request.namDanhGia) && request.namDanhGia != namHT && int.Parse(request.namDanhGia) <= int.Parse(namTachDuLieuMoiNhat)) tableCheck = { TableNames.DanhGias}
        //+request.namDanhGia;
        //else tableCheck = { TableNames.DanhGias};
        var itemDg = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken) ?? throw new NotFoundException($"DanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        if (itemDg.TrangThai == "Chưa đánh giá")
        {

        }
        else
        {
            var buocXuly = await _buocXuLyRepo.GetByIdAsync(itemDg.BuocHienTaiId, cancellationToken);
            await _vetXuLyDanhGiaService.Add(Guid.Parse(currentUserID), (Guid)itemDg.BuocHienTai.Id, itemDg.Id, tenThaoTac, buocXuly.TenBuoc, _currentUser.GetUserFullName(), _currentUser.GetUserName(), false, buocXuly.TrangThaiDanhGiaId, cancellationToken);

        }
        //if (itemDg.TrangThai != "Chưa đánh giá")
        //{
        //    var danhGia = DanhGia.Create(itemDg.MaPhieu, itemDg.LoaiDanhGia, itemDg.ChiTietDiemDanhGia, itemDg.HoVaTen, itemDg.TaiKhoan, itemDg.MaNguoiDung, itemDg.ChucVu,
        //     itemDg.ChucDanh, itemDg.TenPhongBan, itemDg.MaPhongBan, itemDg.TenDonVi, itemDg.MaDonVi, "Chưa đánh giá", itemDg.PhanLoaiLanhDaoDanhGia, itemDg.PhanLoaiTuDanhGia, itemDg.PhanLoaiDanhGia, itemDg.PhanLoaiNhanXet,
        //     itemDg.DiemDanhGia, itemDg.DiemTuDanhGia, itemDg.DiemNhanXet, itemDg.DiemThamMuu, itemDg.DiemLanhDaoDanhGia, itemDg.PhanLoaiThamMuu, itemDg.NamDanhGia, itemDg.ThoiGianTao, itemDg.ThoiGianNhanXet, itemDg.ThoiGianDanhGia, itemDg.ThoiGianHDDanhGia, itemDg.ThoiGianThamMuu, itemDg.TruongDonVi, itemDg.SuDung,
        //     itemDg.MaDonViCha, itemDg.LyDoThayDoiXepLoai, itemDg.YKienLanhDao, itemDg.YKienTuDanhGia, itemDg.YKienNhanXet, itemDg.YKienThamMuu, itemDg.YKienDanhGia,
        //     itemDg.FileDinhKem, itemDg.FileDinhKemNX, itemDg.FileDinhKemTM, itemDg.FileDinhKemDG, itemDg.KhongDanhGia, itemDg.KiemNhiem, itemDg.Phone, itemDg.Email,
        //     itemDg.NguoiTaoUser, itemDg.NguoiSuaUser, itemDg.NgaySuaUser, itemDg.NgayTaoUser, itemDg.ThuTu, itemDg.TenMauPhieuDanhGia, itemDg.MaMauPhieuDanhGia, itemDg.NguoiTuDanhGia, itemDg.NguoiTuDanhGiaId,
        //     itemDg.NguoiNhanXet, itemDg.NguoiNhanXetId, itemDg.NguoiThamMuu, itemDg.NguoiThamMuuId, itemDg.NguoiDanhGia, itemDg.NguoiDanhGiaId, itemDg.ThamQuyenXepLoai, itemDg.BuocHienTaiId, itemDg.BuocTruocId, itemDg.NguoiDangXuLyId,
        //     itemDg.DaXem, itemDg.MaHoSo, itemDg.ThoiGianQuery, itemDg.LoaiThoiGian, itemDg.ThoiGian, itemDg.MaBoTieuChuan, itemDg.TenBoTieuChuan, itemDg.DanhSachPhanLoaiDanhGia, itemDg.QuyTrinhXuLyId, itemDg.UrlPdf, itemDg.UrlDocx, itemDg.IsKySoCaNhan, itemDg.IsKySoNhanXet, itemDg.IsKySoThamMuu, itemDg.IsKySoLanhDao, itemDg.MaDonViFull);
        //    await _repositoryWithEvents.AddAsync(danhGia, cancellationToken);
        //}
        return (Result)Result.Success();
    }
}
