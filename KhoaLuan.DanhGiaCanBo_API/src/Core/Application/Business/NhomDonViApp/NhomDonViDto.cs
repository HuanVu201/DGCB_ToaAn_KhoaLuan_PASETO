

using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Application.Business.NhomDonViApp;


public class NhomDonViDto : IDto
{
    public Guid Id { get; set; }
    public string TenNhom { get; set; }
    public string? MoTa { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
