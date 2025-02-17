using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;

namespace TD.DanhGiaCanBo.Application.Identity.XepLoaiDanhGiaApp.Queries;


public class SearchListAUGNotPermissionQuery : PaginationFilter, IRequest<PaginationResponse<ListAUGNotPermissionDanhGia>>
{
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 1000;
    public new int PageNumber { get; set; } = 1;
}
