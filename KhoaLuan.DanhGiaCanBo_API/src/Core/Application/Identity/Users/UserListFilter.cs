namespace TD.DanhGiaCanBo.Application.Identity.Users;

public class UserListFilter : PaginationFilter
{
    public string? GroupCode { get; set; }
    public string? OfficeCode { get; set; }
    public string? OfficeName { get; set; }
    public string? MaDinhDanhOfficeCode { get; set; }
    public bool? IsActive { get; set; }
    public string? PositionName { get; set; }
    public string? UserName { get; set;}
    public string? FullName { get; set; }
    public string? TypeUser { get; set; }
    public bool? LaCanBoTiepNhan { get; set; }
}