using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.VetXuLyDanhGiaDonViApp;
public class VetXuLyDanhGiaDonViDto : IDto
{
    public string? TenThaoTac { get; set; }
    public string? TenBuocXuLy { get; set; }
    public string? TenNguoiXuLy { get; set; }
    public string? TaiKhoanXuLy { get; set; }
    public DateTime? CreatedOn { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
