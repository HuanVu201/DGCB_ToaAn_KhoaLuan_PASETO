using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Commands;
public sealed class UpdateBoTieuChuanCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(200)]
    public string? TenBoTieuChi { get; set; }
    public bool SuDung { get; set; }
    [MaxLength(500)]
    public string? DinhKem { get; set; }
    [MaxLength(50)]
    public string? SoKyHieu { get; set; }
    [MaxLength(20)]
    public string? NgayBanHanh { get; set; }
    [MaxLength(200)]
    public string? CoQuanBanHanh { get; set; }
    [MaxLength(15)]
    public string? LoaiThoiGian { get; set; }
    [MaxLength(15)]
    public string? ThoiGian { get; set; }
    [MaxLength(255)]
    public string? DonVi { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public int? CauHinhThoiGianGiaHan { get; set; }
    public string? MaCapDanhGia { get; set; }
    public string? CapDanhGia { get; set; }
    public string? MaDonViDanhGia { get; set; }
    public string? DonViDanhGia { get; set; }
    public bool? LaDonVi { get; set; }
}
