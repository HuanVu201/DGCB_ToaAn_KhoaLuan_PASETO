using Newtonsoft.Json;

namespace TD.DanhGiaCanBo.Application.Business.ActionApp.Queries;


public class SearchActionQuery : PaginationFilter, IRequest<PaginationResponse<ActionDto>>
{
    public string? Ten { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
