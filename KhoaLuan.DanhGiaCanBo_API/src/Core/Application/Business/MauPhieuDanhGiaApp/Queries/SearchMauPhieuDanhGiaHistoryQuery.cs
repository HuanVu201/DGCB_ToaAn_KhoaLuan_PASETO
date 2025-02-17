using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;
public class SearchMauPhieuDanhGiaHistoryQuery : PaginationFilter, IRequest<PaginationResponse<MauPhieuDanhGiaHistoryDto>>
{

    public string MauPhieuDanhGiaId { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 1000;
    public new int PageNumber { get; set; } = 1;
}
