using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Queries;

public class SearchBuocXuLyQuery : PaginationFilter, IRequest<PaginationResponse<DanhSachBuocXuLyDto>>
{
    public string? TenBuoc { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
