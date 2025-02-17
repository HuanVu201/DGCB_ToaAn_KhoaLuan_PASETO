namespace TD.DanhGiaCanBo.Application.Identity.UserGroups.Dtos;
public class DanhSachUserGroupVaiTroDto : IDto
{
    public DefaultIdType UserGroupId { get; set; }
    public string? TenPhongBan { get; set; }
    public string? TenDonVi { get; set; }
    public DanhSachUserGroupVaiTroDto(DefaultIdType userGroupId, string? tenPhongBan, string tenDonVi)
    {
        UserGroupId = userGroupId;
        TenPhongBan = tenPhongBan;
        TenDonVi = tenDonVi;
    }
}
