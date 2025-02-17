using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Catalog.LogAuthen;

namespace TD.DanhGiaCanBo.Catalog.Catalog.LogAuthen.Queries;

public class SearchLogAuthenQuery : PaginationFilter, IRequest<PaginationResponse<LogAuthenDto>>
{
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? IP { get; set; }
    public string? TypeUser { get; set; }
    public string? TypeLogin { get; set; }
    public string? Device { get; set; }
    public bool? Removed { get; set; } = false;
    public bool? ReFetch { get; set; } = false;
    [JsonIgnore]
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
