using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

public class DanhGiaDto : IDto
{
    // public DichVuBaseDto? DichVuCha { get; set; }
    public Guid Id { get; set; }
    //
    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string? MaPhieu { get; set; }
    [MaxLength(20)]
    public string? LoaiDanhGia { get; set; }//Đơn vị, cá nhân
    [MaxLength(255)]
    public string? HoVaTen { get; set; }
    [MaxLength(255)]
    public string? TaiKhoan { get; set; }
    [MaxLength(255)]
    public string? ChucDanh { get; set; }
    public string? ChucVu { get; set; }

    [MaxLength(255)]
    public string? TenPhongBan { get; set; }
    public string? TenDonVi { get; set; }
    [MaxLength(255)]
    public string? MaDonVi { get; set; }
    [MaxLength(30)]
    public string? TrangThai { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiTuDanhGia { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiDanhGia { get; set; }
    [MaxLength(70)]
    public double? DiemDanhGia { get; set; }
    public double? DiemTuDanhGia { get; set; }
    public double? DiemNhanXet { get; set; }
    public double? DiemThamMuu { get; set; }
    public double? DiemLanhDaoDanhGia { get; set; }
    public int NamDanhGia { get; set; }

    public DateTime? ThoiGianTao { get; set; }
    public DateTime? ThoiGianNhanXet { get; set; }
    public DateTime? ThoiGianDanhGia { get; set; }
    public DateTime? ThoiGianHDDanhGia { get; set; }
    public DateTime? ThoiGianThamMuu { get; set; }
    public int? TruongDonVi { get; set; }

    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string? Phone { get; set; }
    [MaxLength(255)]
    public string? Email { get; set; }
    public string? NguoiDanhGia { get; set; }
    public string? NguoiTuDanhGia { get; set; }
    public string? NguoiNhanXet { get; set; }
    public string? NguoiThamMuu { get; set; }

    //UpdateDanhGia
    [Column(TypeName = "VARCHAR")]
    [MaxLength(1)]
    public string? DaXem { get; set; }
    public int? ThoiGianQuery { get; set; }
    [MaxLength(15)]
    public string? LoaiThoiGian { get; set; }
    [MaxLength(15)]
    public string? ThoiGian { get; set; }
    public DateTime? CreatedOn { get; set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModifiedOn { get; set; }
    public DefaultIdType? BuocTruocId { get; set; }
    public DefaultIdType? BuocHienTaiId { get; set; }
    public DefaultIdType? KhieuNaiId { get; set; }
    public string? TrangThaiKhieuNai { get; set; }
    public DefaultIdType? HoSoCongTacId { get; set; }
    public bool? IsKySoCaNhan { get; set; }
    public bool? IsKySoNhanXet { get; set; }
    public bool? IsKySoThamMuu { get; set; }
    public bool? IsKySoLanhDao { get; set; }
    public string? UrlPdf { get; set; }
    public string? UrlDocx { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
