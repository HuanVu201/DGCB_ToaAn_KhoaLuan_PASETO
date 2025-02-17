using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

public class DSDanhGiaDto : IDto
{
    // public DichVuBaseDto? DichVuCha { get; set; }
    public Guid Id { get; set; }
    public int? ThuTu { get; set; }
    //
    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string MaPhieu { get; set; }
    [MaxLength(255)]
    public string HoVaTen { get; set; }
    [MaxLength(255)]
    public string TaiKhoan { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string Phone { get; set; }
    [MaxLength(255)]
    public string Email { get; set; }
    [MaxLength(255)]
    public string ChucVu { get; set; }

    [MaxLength(255)]
    public string TenDonVi { get; set; }
    [MaxLength(255)]
    public string MaDonVi { get; set; }
    [MaxLength(255)]
    public string TenPhongBan { get; set; }
    [MaxLength(255)]
    public string MaPhongBan { get; set; }
    [MaxLength(30)]
    public string TrangThai { get; set; }
    [MaxLength(70)]
    public string PhanLoaiTuDanhGia { get; set; }
    [MaxLength(70)]
    public string PhanLoaiDanhGia { get; set; }
    [MaxLength(70)]
    public double? DiemDanhGia { get; set; }
    public double? DiemTuDanhGia { get; set; }

    public string? FullName { get; set; }



    public int NamDanhGia { get; set; }

    public DateTime? ThoiGianTao { get; set; }
    public DateTime? ThoiGianNhanXet { get; set; }
    public DateTime? ThoiGianDanhGia { get; set; }
    public DateTime? ThoiGianHDDanhGia { get; set; }
    public DateTime? ThoiGianThamMuu { get; set; }
    public int? TruongDonVi { get; set; }

    public int? ThoiGianQuery { get; set; }
    [MaxLength(15)]
    public string LoaiThoiGian { get; set; }
    [MaxLength(15)]
    public string ThoiGian { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
