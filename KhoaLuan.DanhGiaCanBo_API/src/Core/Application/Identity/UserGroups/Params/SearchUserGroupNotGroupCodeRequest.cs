namespace TD.DanhGiaCanBo.Application.Identity.UserGroups.Params;
public class SearchUserGroupNotGroupCodeRequest : PaginationFilter
{
    public string? GroupCode { get; set; }
    public string? ChucVuId { get; set; }

    public string? ChucDanhId { get; set; }

    public string? FullName { get; set; }

    public string? UserName { get; set; } 

    // public bool Refect { get; set; }
}
