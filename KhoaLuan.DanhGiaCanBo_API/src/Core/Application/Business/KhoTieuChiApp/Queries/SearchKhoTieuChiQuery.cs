using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp;

namespace TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Queries;


public class SearchKhoTieuChiQuery : PaginationFilter, IRequest<PaginationResponse<KhoTieuChiDto>>
{
    public string? Ten { get; set; }
    public string? Id { get; set; }
    public bool? isParrentCode { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
