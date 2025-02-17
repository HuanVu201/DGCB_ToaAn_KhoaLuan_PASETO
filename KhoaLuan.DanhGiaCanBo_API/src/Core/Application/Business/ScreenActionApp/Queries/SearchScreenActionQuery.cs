using Newtonsoft.Json;

namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Queries;


public class SearchScreenActionQuery : PaginationFilter, IRequest<PaginationResponse<ScreenActionDto>>
{
    public string? MaScreen { get; set; }
    public string? ScreenId { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
