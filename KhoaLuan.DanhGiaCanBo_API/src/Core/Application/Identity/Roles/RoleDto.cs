namespace TD.DanhGiaCanBo.Application.Identity.Roles;

public class RoleDto
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public int? TotalCount { get; set; }
    public int? ThuTu { get; set; }
    public int? Number { get; set; }
    public List<RolePermission>? Permissions { get; set; }
}

public class RolePermission
{
    public int Id { get; set; } = default!;
    public string ClaimValue { get; set; } = default!;

    public string Description { get; set; } = default!;

}