using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.ActionApp;

namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Queries;
public class SearchActionNotInScreenQuery : PaginationFilter, IRequest<PaginationResponse<ActionDto>>
{
    public string ScreenId { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
