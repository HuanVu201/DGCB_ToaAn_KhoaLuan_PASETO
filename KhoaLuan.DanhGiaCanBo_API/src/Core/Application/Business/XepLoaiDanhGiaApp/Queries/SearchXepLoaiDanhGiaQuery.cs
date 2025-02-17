using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Queries;


public class SearchXepLoaiDanhGiaQuery : PaginationFilter, IRequest<PaginationResponse<XepLoaiDanhGiaDto>>
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
