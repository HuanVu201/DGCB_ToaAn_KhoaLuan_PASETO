

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp;


public class KhoTieuChiDto : IDto
{
    public Guid Id { get; set; }
    public string MaTieuChi { get; private set; }

    public string TenTieuChi { get; private set; }
    public bool SuDung { get; private set; }
    public bool? DiemTru { get; private set; }
    public string ThangDiem { get; private set; }
     public bool? DiemThuong { get; private set; }
    public bool? DiemLiet { get; private set; }
    public bool? DuocChamNhieuLan { get; private set; }
    public bool? KiemNhiem { get; private set; }
    public string DonViTinh { get; private set; }
    public int? SoLan { get; private set; }
    public string ? GhiChu { get; private set; }
    public string? LoaiDiem { get; set; }
    public string? FullCode { get; set; }
    public string? ParrentCode { get; set; }
    public string? ParrentName { get; set; }
    public string? JsonLienKet { get; set; }
    public string? JsonDiemLiet { get; set; }
    public bool? TieuChiLienKet { get; set; }

    public string? TitleView { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
