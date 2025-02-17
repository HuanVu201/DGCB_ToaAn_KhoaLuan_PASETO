

using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Business.ChucDanhApp;


public class ChucDanhDto : IDto
{
    public Guid Id { get; set; }
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public string? MoTa { get; set; }
    public bool? Active { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
