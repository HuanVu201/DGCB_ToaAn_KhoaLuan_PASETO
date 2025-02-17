

using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Application.Catalog.DanhMucChungApp;


public class DanhMucChungDto : IDto
{
    public Guid Id { get; set; }
    public string Ten { get; set; }
    public string TenDanhMuc { get; set; }
    public string Code { get; set; }
    public int ThuTu { get; set; } 
    public bool Active { get; set; }
    public string Type { get; set; }
    public bool? DuocChamNhieuLan { get; set; }
    public string? DinhKem { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
