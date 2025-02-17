using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp.Queries;


public class SearchKyDanhGiaQuery : PaginationFilter, IRequest<PaginationResponse<KyDanhGiaDto>>
{
    public string? Ten { get; set; }
    public string? Id { get; set; }

    public string? MaBoTieuChi { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
