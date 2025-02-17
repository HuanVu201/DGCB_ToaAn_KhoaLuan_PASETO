using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Identity.RoleClaimDistincts;

namespace TD.DanhGiaCanBo.Application.Business.RoleClaimDistinctApp.Queries;


public class GetRoleClaimDistinctQuery : PaginationFilter, IRequest<List<RoelClaimDistinct>>
{

  
    public bool? Removed { get; set; } = false;
    public bool? Active { get; set; } = null;
    public bool? FilterByUserRoleClaimDistinct { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
