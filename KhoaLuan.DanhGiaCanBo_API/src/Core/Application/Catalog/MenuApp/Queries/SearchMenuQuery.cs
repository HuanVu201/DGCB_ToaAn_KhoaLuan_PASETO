using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Application.Catalog.MenuApp;

namespace TD.DanhGiaCanBo.Application.Catalog.MenuApp.Queries;

public class SearchMenuQuery : PaginationFilter, IRequest<PaginationResponse<MenuDto>>
{
    public string? Name { get; set; }
    public string? Module { get; set; }
    public bool? Removed { get; set; } = false;
    public bool? Active { get; set; } = null;
    public bool? FilterByUserRole { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
