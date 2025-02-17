using System.Text.Json.Serialization;
namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos;
public class DanhSachQuyTrinhXuLyDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string TenQuyTrinh { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
