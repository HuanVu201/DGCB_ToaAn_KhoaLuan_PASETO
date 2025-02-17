namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Queries;
using Newtonsoft.Json;
public class SearchScreenActionCacheQuery : PaginationFilter, IRequest<PaginationResponse<ScreenActionDto>>
{
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageNumber { get; set; } = 1;
}
