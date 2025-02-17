using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
public sealed class UpdateDanhGiaCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? MaPhieu { get; set; }
    public string? HoVaTen { get; set; }
    public string? LoaiDanhGia { get; set; }//Đơn vị, cá nhân
    public string? ChiTietDiemDanhGia { get; set; }
    public string? TaiKhoan { get; set; }
    public string? MaNguoiDung { get; set; }
    public string? ChucVu { get; set; }
    public string? ChucDanh { get; set; }
    public string? TenPhongBan { get; set; }
    public string? MaPhongBan { get; set; }
    public string? TenDonVi { get; set; }
    public string? MaDonVi { get; set; }
    public string? TrangThai { get; set; }
    public string? PhanLoaiLanhDaoDanhGia { get; set; }
    public string? PhanLoaiTuDanhGia { get; set; }
    public string? PhanLoaiDanhGia { get; set; }
    public string? PhanLoaiNhanXet { get; set; }
    public double? DiemDanhGia { get; set; }
    public double? DiemTuDanhGia { get; set; }
    public double? DiemNhanXet { get; set; }
    public double? DiemThamMuu { get; set; }
    public double? DiemLanhDaoDanhGia { get; set; }
    public string? PhanLoaiThamMuu { get; set; }
    public int? NamDanhGia { get; set; }
    public DateTime? ThoiGianTao { get; set; }
    public DateTime? ThoiGianNhanXet { get; set; }
    public DateTime? ThoiGianDanhGia { get; set; }
    public DateTime? ThoiGianHDDanhGia { get; set; }
    public DateTime? ThoiGianThamMuu { get; set; }
    public int? TruongDonVi { get; set; }
    public bool? SuDung { get; set; }
    public string? MaDonViCha { get; set; }
    public string? LyDoThayDoiXepLoai { get; set; }
    public string? YKienLanhDao { get; set; }
    public string? YKienTuDanhGia { get; set; }
    public string? YKienNhanXet { get; set; }
    public string? YKienThamMuu { get; set; }
    public string? YkienDanhGia { get; set; }
    public string? FileDinhKem { get; set; }
    public string? FileDinhKemNX { get; set; }
    public string? FileDinhKemTM { get; set; }
    public string? FileDinhKemDG { get; set; }
    public bool? KhongDanhGia { get; set; }
    public bool? KiemNhiem { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? NguoiTaoUser { get; set; }
    public string? NguoiSuaUser { get; set; }
    public DateTime? NgaySuaUser { get; set; }
    public DateTime? NgayTaoUser { get; set; }
    public int? ThuTu { get; set; }
    public string? TenMauPhieuDanhGia { get; set; }
    public string? MaMauPhieuDanhGia { get; set; }
    public string? NguoiTuDanhGia { get; set; }
    public string? NguoiTuDanhGiaId { get; set; }
    public string? NguoiNhanXet { get; set; }
    public string? NguoiNhanXetId { get; set; }
    public string? NguoiThamMuu { get; set; }
    public string? NguoiThamMuuId { get; set; }
    public string? NguoiDanhGia { get; set; }
    public string? NguoiDanhGiaId { get; set; }
    public string? ThamQuyenXepLoai { get; set; }
    public DefaultIdType? BuocHienTaiId { get; set; }
    public DefaultIdType? BuocTruocId { get; set; }
    public string? NguoiDangXuLyId { get; set; }
    public string? DaXem { get; set; }
    public string? MaHoSo { get; set; }
    public int? ThoiGianQuery { get; set; }
    public string? LoaiThoiGian { get; set; }
    public string? ThoiGian { get; set; }

    public string? MaBoTieuChuan { get; set; }
    public bool? LaNguoiDaXuLy { get; set; } = false;
    public string TenThaoTacVetXuLy { get; set; } = string.Empty;
    public string? QuyTrinhXuLyId { get; set; } = string.Empty;
    public string? UrlPdf { get; set; } = string.Empty;
    public string? UrlDocx { get; set; } = string.Empty;
    public bool? IsKySoCaNhan { get; set; }
    public bool? IsKySoNhanXet { get; set; }
    public bool? IsKySoThamMuu { get; set; }
    public bool? IsKySoLanhDao { get; set; }
    public bool? ResetUrlPhieu { get; set; } = false;
    public string? MaDonViFull { get; set; }

}
