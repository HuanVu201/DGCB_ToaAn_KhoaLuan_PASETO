using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
public class SearchUsersWithDonViQuanLyQuery : PaginationFilter, IRequest<PaginationResponse<UsersWithDonViQuanLyDto>>
{
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? DonViQuanLy { get; set; }
    public string? GroupCode { get; set; }
    public string? TypeUser { get; set; }
    public bool? LaCanBoTiepNhan { get; set; } 
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}

public class UsersWithDonViQuanLyDto
{
    public string? Id { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }
    public string? OfficeCode { get; set; }
    public string? OfficeName { get; set; }
    public string? PositionName { get; set; }
    public bool? LaCanBoTiepNhan { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}

