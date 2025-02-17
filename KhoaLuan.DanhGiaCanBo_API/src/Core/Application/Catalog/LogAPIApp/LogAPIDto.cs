

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Application.Catalog.LogAPIApp;


public class LogAPIDto : IDto
{
    public Guid Id { get; set; }
    [MaxLength(500)]
    public string? Ten { get; set; }
    [MaxLength(500)]
    public string? TenAPI { get; set; }
    public DateTime? CreatedOn { get; set; }
    [MaxLength(50)]
    public string? Ma { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
