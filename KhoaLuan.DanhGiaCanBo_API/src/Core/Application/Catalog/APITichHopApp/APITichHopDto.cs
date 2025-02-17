

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Application.Catalog.APITichHopApp;


public class APITichHopDto : IDto
{
    public Guid Id { get; set; }
    [MaxLength(500)]
    public string? Ten { get; set; }
    [MaxLength(50)]
    public string? Ma { get; set; }
    [MaxLength(500)]
    public string? Url { get; set; }
   [MaxLength(10)]
    public string? PhuongThuc { get; set; }
    public bool SuDung { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
