using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Commands;
public sealed class UpdateKhoTieuChiCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string MaTieuChi { get; set; }
    public string TenTieuChi { get; set; }
    public bool SuDung { get; set; }
    public bool? DiemTru { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(10)]
    public string? ThangDiem { get; set; } = "0";
    public string? GhiChu { get; set; }
    public bool? DiemThuong { get; set; }
    public bool? DiemLiet { get; set; }
    public bool? DuocChamNhieuLan { get; set; }
    public bool? KiemNhiem { get; set; }
    [MaxLength(50)]
    public string? DonViTinh { get; set; }
    public int? SoLan { get; set; }

    public string? LoaiDiem { get; set; }
    public string? FullCode { get; set; }
    public string? ParrentCode { get; set; }
    public string? ParrentName { get; set; }
    public string? JsonLienKet { get; set; }
    public string? JsonDiemLiet { get; set; }
    public bool? TieuChiLienKet { get; set; }
    public string? STT { get; set; }

    public int? ThuTu { get; set; }

}
