using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.MauPhoiApp;
public class MauPhoiDto : IDto
{
    public Guid Id { get; set; }
    public string? LoaiPhoi { get; set; }
    public string? MaMauPhoi { get; set; }
    public string? TenMauPhoi { get; set; }
    public string? MaDonVi { get; set; }
    public string? UrlMauPhoi { get; set; }
    public bool? LaPhoiMacDinh { get; set; }
    public string? CustomerId { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}

