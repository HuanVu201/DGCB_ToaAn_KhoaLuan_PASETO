using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Identity.Roles;

namespace TD.DanhGiaCanBo.Application.Business.RoleApp.Queries;


public class SearchRoleQuery : PaginationFilter, IRequest<PaginationResponse<RoleDto>>
{

  
    public bool? Removed { get; set; } = false;
    public bool? Active { get; set; } = null;
    public bool? FilterByUserRole { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
