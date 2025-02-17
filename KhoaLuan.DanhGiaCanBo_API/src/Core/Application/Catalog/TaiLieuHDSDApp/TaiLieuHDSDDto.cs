using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp;
public class TaiLieuHDSDDto : IDto
{
    public DefaultIdType Id { get; set; }
    public int ThuTu { get; set; }
    public string TenTaiLieu { get; set; }
    public string TepDinhKem { get; set; }
    public string TaiLieuDanhCho { get; set; }
    public string MoTa { get; set; }
    public string NgayDang { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
