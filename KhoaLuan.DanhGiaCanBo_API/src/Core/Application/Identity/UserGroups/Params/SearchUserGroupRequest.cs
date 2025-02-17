namespace TD.DanhGiaCanBo.Application.Identity.UserGroups.Params;
public class SearchUserGroupRequest : PaginationFilter
{
    public string GroupCode { get; set; }

    public string? FullName { get; set; }
    public string? UserName { get; set; }

    public string? TenChucVu { get; set; }
}
