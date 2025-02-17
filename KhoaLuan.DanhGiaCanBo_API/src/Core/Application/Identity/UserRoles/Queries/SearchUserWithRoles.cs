using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Identity.UserRoles.Queries;
public class SearchUserWithRoles : PaginationFilter, IRequest<PaginationResponse<UserWithRoleNamesDetailDto>>
{
    public List<string>? RoleNames { get; set; }
    public string? OfficeCode { get; set; }
    public string? GroupCode { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 1000;
}

public class UserWithRoleNamesDetailDto
{
    public string? Id { get; set; }
    public string? Name { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? GroupName { get; set; }
    public string? OfficeName { get; set; }
    public string? PositionName { get; set; }
    public string? ChucDanh { get; set; }
    public string? RoleId { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}

