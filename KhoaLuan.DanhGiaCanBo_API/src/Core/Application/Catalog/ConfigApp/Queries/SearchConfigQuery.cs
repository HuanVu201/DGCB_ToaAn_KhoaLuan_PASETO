using Newtonsoft.Json;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Queries;


public class SearchConfigQuery : PaginationFilter, IRequest<PaginationResponse<ConfigDto>>
{
    public string? Name { get; set; }
    public string? Code { get; set; }
    public string? Module { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
