

using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Application.Catalog.NhomNguoiDungApp;


public class NhomNguoiDungDto : IDto
{
    public Guid Id { get; set; }
    public string Ten { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
