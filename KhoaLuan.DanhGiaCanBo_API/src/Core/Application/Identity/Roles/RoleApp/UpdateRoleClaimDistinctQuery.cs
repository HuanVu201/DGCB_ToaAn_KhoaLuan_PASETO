using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Identity.RoleClaimDistincts;

namespace TD.DanhGiaCanBo.Application.Business.RoleClaimDistinctApp.Queries;


public class UpdateRoleClaimDistinctQuery :  IRequest<Result>
{


    public string? RoleId { get; set; }
    public List<RoelClaimDistinct>? ListPermission { get; set; }
}
