using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc.Dtos;
public class DanhSachDanhGiaToChucByNguoiDaXuLyDto
{
    /// <summary>
    /// DanhGiaId
    /// </summary>
    public DefaultIdType Id { get; set; }
    public int NamDanhGia { get; set; }
    public string DiemDanhGia { get; set; }
    public string NguoiNhanXet { get; set; }
    public DateTime ThoiGianTao { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
