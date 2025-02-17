using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.ChucDanhApp;

namespace TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Queries;


public class SearchChucDanhQuery : PaginationFilter, IRequest<PaginationResponse<ChucDanhDto>>
{
    public string? Ten { get; set; }
    public string? Id { get; set; }
    public string? Ma { get; set; }
    public string? MaCapDanhGia { get; set; }
    public string? TenCapDanhGia { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
