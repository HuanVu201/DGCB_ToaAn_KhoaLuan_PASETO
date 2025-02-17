using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Application.Catalog.LogAPIApp;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAPIApp.Queries;


public class SearchLogAPIQuery : PaginationFilter, IRequest<PaginationResponse<LogAPIDto>>
{
    public string? LoaiDichVu { get; set; }
    public string? LoaiQuanLy { get; set; }
    public string? TenAPI { get; set; }
     public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
