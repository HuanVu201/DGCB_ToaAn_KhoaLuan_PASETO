using System.Text.Json.Serialization;
namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;
public class DanhSachBuocXuLyDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string TenBuoc { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
