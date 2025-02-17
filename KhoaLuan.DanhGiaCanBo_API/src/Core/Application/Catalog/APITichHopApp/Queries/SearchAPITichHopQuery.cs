using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Application.Catalog.APITichHopApp;

namespace TD.DanhGiaCanBo.Application.Catalog.APITichHopApp.Queries;


public class SearchAPITichHopQuery : PaginationFilter, IRequest<PaginationResponse<APITichHopDto>>
{
    public string? LoaiDichVu { get; set; }
    public string? LoaiQuanLy { get; set; }
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
