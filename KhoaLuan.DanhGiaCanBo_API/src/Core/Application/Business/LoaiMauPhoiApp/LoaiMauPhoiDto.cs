using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.LoaiMauPhoiApp;
public class LoaiMauPhoiDto : IDto
{
    public Guid Id { get; set; }
    public string? LoaiPhoi { get; set; }
    public string? MaMauPhoi { get; set; }
    public string? TenMaMauPhoi { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
