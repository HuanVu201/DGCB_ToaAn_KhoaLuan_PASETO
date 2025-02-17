using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
public class UpdateDanhGiaWithoutBuocIdCommandHandler : ICommandHandler<UpdateDanhGiaWithoutBuocIdCommand>
{
    private readonly IRepository<DanhGia> _repositoryWithEvents;

    public UpdateDanhGiaWithoutBuocIdCommandHandler(IRepository<DanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateDanhGiaWithoutBuocIdCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhGia với mã: {request.Id} chưa được thêm vào hệ thống");

        var updateDanhGia = itemExitst.Update(request.MaPhieu, request.LoaiDanhGia, request.ChiTietDiemDanhGia, request.HoVaTen, request.TaiKhoan, request.MaNguoiDung, request.ChucVu,
             request.ChucDanh, request.TenPhongBan, request.MaPhongBan, request.TenDonVi, request.MaDonVi, request.TrangThai, request.PhanLoaiLanhDaoDanhGia, request.PhanLoaiTuDanhGia, request.PhanLoaiDanhGia, request.PhanLoaiNhanXet,
             request.DiemDanhGia, request.DiemTuDanhGia, request.DiemNhanXet, request.DiemThamMuu, request.DiemLanhDaoDanhGia, request.PhanLoaiThamMuu, request.NamDanhGia, request.ThoiGianTao, request.ThoiGianNhanXet, request.ThoiGianDanhGia, request.ThoiGianHDDanhGia, request.ThoiGianThamMuu, request.TruongDonVi, request.SuDung,
             request.MaDonViCha, request.LyDoThayDoiXepLoai, request.YKienLanhDao, request.YKienTuDanhGia, request.YKienNhanXet, request.YKienThamMuu, request.YkienDanhGia,
             request.FileDinhKem, request.FileDinhKemNX, request.FileDinhKemTM, request.FileDinhKemDG, request.KhongDanhGia, request.KiemNhiem, request.Phone, request.Email,
             request.NguoiTaoUser, request.NguoiSuaUser, request.NgaySuaUser, request.NgayTaoUser, request.ThuTu, request.TenMauPhieuDanhGia, request.MaMauPhieuDanhGia, request.NguoiTuDanhGia, request.NguoiTuDanhGiaId,
             request.NguoiNhanXet, request.NguoiNhanXetId, request.NguoiThamMuu, request.NguoiThamMuuId, request.NguoiDanhGia, request.NguoiDanhGiaId, request.ThamQuyenXepLoai, request.BuocHienTaiId, request.BuocTruocId, request.NguoiDangXuLyId,
             request.DaXem, request.MaHoSo, request.ThoiGianQuery, request.LoaiThoiGian, request.ThoiGian, request.MaBoTieuChuan, request.QuyTrinhXuLyId, request.UrlPdf, request.UrlDocx, request.IsKySoCaNhan, request.IsKySoNhanXet, request.IsKySoThamMuu, request.IsKySoLanhDao, request.ResetUrlPhieu, request.MaDonViFull);
        await _repositoryWithEvents.UpdateAsync(updateDanhGia, cancellationToken);
        return (Result)Result.Success(message: "Cập nhật thành công");
    }
}