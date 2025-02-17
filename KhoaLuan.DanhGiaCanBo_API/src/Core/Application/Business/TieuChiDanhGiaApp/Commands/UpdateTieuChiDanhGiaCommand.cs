using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Commands;
public sealed class UpdateTieuChiDanhGiaCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaTieuChi { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(1000)]
    public string? MaDayDu { get; set; }
    [MaxLength(400)]
    public string? TenTieuChi { get; set; }
    public bool SuDung { get; set; }
    public bool? DiemTru { get; set; }
    public int? ThuTu { get; set; }
    public int? ThuTuHienThi { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(10)]
    public string? ThangDiem { get; set; }
    public string? GhiChu { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaMauPhieuDanhGia { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaDonVi { get; set; }
    public bool? DiemThuong { get; set; }
    public bool? DiemLiet { get; set; }
    public bool? TieuChiLienKet { get; set; }
    public bool? DuocChamNhieuLan { get; set; }
    public bool? KiemNhiem { get; set; }
    [MaxLength(10)]
    public string STT { get; set; }
    [MaxLength(50)]
    public string? DonViTinh { get; set; }
    public string? JsonLienKet { get; set; }
    public string? JsonDiemLiet { get; set; }
    public int? SoLan { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaKhoTieuChi { get; set; } = "";
}
