using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Application.Catalog.NhomNguoiDungApp;

namespace TD.DanhGiaCanBo.Application.Catalog.NhomNguoiDungApp.Queries;


public class SearchNhomNguoiDungQuery : PaginationFilter, IRequest<PaginationResponse<NhomNguoiDungDto>>
{
    public string? Ten { get; set; }
    public string? Id { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
