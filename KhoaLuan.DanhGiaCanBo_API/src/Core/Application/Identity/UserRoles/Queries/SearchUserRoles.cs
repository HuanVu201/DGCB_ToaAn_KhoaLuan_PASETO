using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Common.Models;

namespace TD.DanhGiaCanBo.Application.Identity.UserRoles.Queries;
public class SearchUserRoles : PaginationFilter, IRequest<PaginationResponse<UserRolesDetailDto>>
{
    public string? GroupCode { get; set; }
    public string? OfficeCode { get; set; }
    public bool? IsActive { get; set; }
    public string? PositionName { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? RoleId { get; set; }
    public bool? Removed { get; set; }
    public string? RoleIds { get; set; }
}
