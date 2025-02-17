using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Application.Catalog.DanhMucChungApp;

namespace TD.DanhGiaCanBo.Application.Catalog.DanhMucChungApp.Queries;


public class SearchDanhMucChungQuery : PaginationFilter, IRequest<PaginationResponse<DanhMucChungDto>>
{
    public string? Ten { get; set; }
    public string? Type { get; set; }
    public string? Id { get; set; }
    public string? Ma { get; set; }
    public bool? Removed { get; set; } = false;
    public string? TenDanhMuc { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
