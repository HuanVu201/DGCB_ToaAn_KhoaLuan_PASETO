using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp;
public class ConfigDto : IDto
{
    public Guid Id { get; set; }
    public string Ten { get; set; }
    public string Code { get; set; }
    public string Module { get; set; }
    public string? Content { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}

