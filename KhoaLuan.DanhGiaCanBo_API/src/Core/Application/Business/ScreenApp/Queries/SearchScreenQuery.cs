using Newtonsoft.Json;

namespace TD.DanhGiaCanBo.Application.Business.ScreenApp.Queries;


public class SearchScreenQuery : PaginationFilter, IRequest<PaginationResponse<ScreenDto>>
{
    public string? Ma { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
