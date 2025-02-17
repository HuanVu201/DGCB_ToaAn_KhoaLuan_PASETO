using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Identity.XepLoaiDanhGiaApp.Queries;


public class SearchListAUGOfGroupQuery: PaginationFilter, IRequest<PaginationResponse<LstUsersDto>>
{
    public Guid? GroupId { get; set; }
    public string? GroupCode { get; set; }
    public string? OfGroupCode { get; set; }
    public string? OfGroupId { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 5000;
    public new int PageNumber { get; set; } = 1;
}
