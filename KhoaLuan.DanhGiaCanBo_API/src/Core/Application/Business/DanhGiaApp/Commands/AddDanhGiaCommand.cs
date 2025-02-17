using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
public class AddDanhGiaCommand : ICommand<Guid>
{

    [MaxLength(50)]
    public string? MaPhieu { get; set; } = Guid.NewGuid().ToString();
    [MaxLength(20)]
    public string? LoaiDanhGia { get; set; } // Đơn vị, cá nhân
    [MaxLength(50)]
    public string? ChiTietDiemDanhGia { get; set; }
    [MaxLength(255)]
    public string? HoVaTen { get; set; }
    [MaxLength(255)]
    public string? TaiKhoan { get; set; }
    [MaxLength(255)]
    public string? MaNguoiDung { get; set; }
    [MaxLength(255)]
    public string? ChucVu { get; set; }
    [MaxLength(255)]
    public string? ChucDanh { get; set; }
    [MaxLength(255)]
    public string? TenPhongBan { get; set; }
    [MaxLength(255)]
    public string? MaPhongBan { get; set; }
    [MaxLength(255)]
    public string? TenDonVi { get; set; }
    [MaxLength(255)]
    public string? MaDonVi { get; set; }
    [MaxLength(30)]
    public string? TrangThai { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiLanhDaoDanhGia { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiTuDanhGia { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiDanhGia { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiNhanXet { get; set; }
    public double? DiemDanhGia { get; set; }
    public double? DiemTuDanhGia { get; set; }
    public double? DiemNhanXet { get; set; }
    public double? DiemThamMuu { get; set; }
    public double? DiemLanhDaoDanhGia { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiThamMuu { get; set; }
    public int NamDanhGia { get; set; }

    public DateTime? ThoiGianTao { get; set; }
    public DateTime? ThoiGianNhanXet { get; set; }
    public DateTime? ThoiGianDanhGia { get; set; }
    public DateTime? ThoiGianHDDanhGia { get; set; }
    public DateTime? ThoiGianThamMuu { get; set; }
    public int? TruongDonVi { get; set; } = 0;
    public bool SuDung { get; set; }
    [MaxLength(255)]
    public string? MaDonViCha { get; set; }
    [MaxLength(3000)]
    public string? LyDoThayDoiXepLoai { get; set; }
    [MaxLength(3000)]
    public string? YKienLanhDao { get; set; }
    [MaxLength(3000)]
    public string? YKienTuDanhGia { get; set; }
    [MaxLength(3000)]
    public string? YKienNhanXet { get; set; }
    [MaxLength(3000)]
    public string? YKienThamMuu { get; set; }
    [MaxLength(3000)]
    public string? YKienDanhGia { get; set; }
    public string? FileDinhKem { get; set; }
    public string? FileDinhKemNX { get; set; }
    public string? FileDinhKemTM { get; set; }
    public string? FileDinhKemDG { get; set; }
    public bool? KhongDanhGia { get; set; } = false;
    public bool? KiemNhiem { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string? Phone { get; set; }
    [MaxLength(255)]
    public string? Email { get; set; }
    [MaxLength(255)]
    public string? NguoiTaoUser { get; set; }
    [MaxLength(255)]
    public string? NguoiSuaUser { get; set; }
    public DateTime? NgaySuaUser { get; set; }
    public DateTime? NgayTaoUser { get; set; }
    public int? ThuTu { get; set; }
    [MaxLength(1500)]
    public string? TenMauPhieuDanhGia { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(200)]
    public string? MaMauPhieuDanhGia { get; set; }
    [MaxLength(100)]
    public string? NguoiTuDanhGia { get; set; }
    public string? NguoiTuDanhGiaId { get; set; }
    [MaxLength(100)]
    public string? NguoiNhanXet { get; set; }
    public string? NguoiNhanXetId { get; set; }
    [MaxLength(100)]
    public string? NguoiThamMuu { get; set; }
    public string? NguoiThamMuuId { get; set; }
    [MaxLength(100)]
    public string? NguoiDanhGia { get; set; }
    public string? NguoiDanhGiaId { get; set; }
    [MaxLength(1)]
    public string? ThamQuyenXepLoai { get; set; }
    public DefaultIdType? BuocHienTaiId { get; set; }
    public DefaultIdType? BuocTruocId { get; set; }
    [MaxLength(36)]
    public string? NguoiDangXuLyId { get; set; }
    [MaxLength(1)]
    public string? DaXem { get; set; } = "0";
    [MaxLength(100)]
    public string? MaHoSo { get; set; }
    public int? ThoiGianQuery { get; set; }
    [MaxLength(15)]
    public string? LoaiThoiGian { get; set; }
    [MaxLength(15)]
    public string? ThoiGian { get; set; }

    public string? MaBoTieuChuan { get; set; }
    public string? TenBoTieuChuan { get; set; }

    public string? DanhSachPhanLoaiDanhGia { get; set; }
    public bool? LaNguoiDaXuLy { get; set; } = false;
    public string TenThaoTacVetXuLy { get; set; } = string.Empty;
    public string? QuyTrinhXuLyId { get; set; } = string.Empty;
    public string? UrlPdf { get; set; } = string.Empty;
    public string? UrlDocx { get; set; } = string.Empty;
    public bool? IsKySoCaNhan { get; set; }
    public bool? IsKySoNhanXet { get; set; }
    public bool? IsKySoThamMuu { get; set; }
    public bool? IsKySoLanhDao { get; set; }
    public string? MaDonViFull { get; set; }

}
