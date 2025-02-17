using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Identity.XepLoaiDanhGiaApp.Queries;


public class SearchLstUsersQuery : PaginationFilter, IRequest<PaginationResponse<LstUsersDto>>
{
    public string? GroupId { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
