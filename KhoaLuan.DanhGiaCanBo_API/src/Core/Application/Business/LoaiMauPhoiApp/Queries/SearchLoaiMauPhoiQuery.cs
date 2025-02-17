using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp;

namespace TD.DanhGiaCanBo.Application.Business.LoaiMauPhoiApp.Queries;
public class SearchLoaiMauPhoiQuery : PaginationFilter, IRequest<PaginationResponse<LoaiMauPhoiDto>>
{
    public string? LoaiPhoi { get; set; }
    public string? MaMauPhoi { get; set; }
    public string? TenMaMauPhoi { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
