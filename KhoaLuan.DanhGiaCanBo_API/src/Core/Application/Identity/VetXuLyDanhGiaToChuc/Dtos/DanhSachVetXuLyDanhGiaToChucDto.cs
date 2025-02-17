using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc.Dtos;
public class DanhSachVetXuLyDanhGiaToChucDto : IDto
{
    public string TenThaoTac { get; set; }
    public string TenBuocXuLy { get; set; }
    public string TenNguoiXuLy { get; set; }
    public string TaiKhoanXuLy { get; set; }
    public DefaultIdType Id { get; set; }
    public DefaultIdType BuocXuLyId { get; set; }
    public DefaultIdType UserId { get; set; }
    public DateTime CreatedOn { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
