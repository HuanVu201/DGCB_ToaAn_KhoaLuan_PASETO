using Microsoft.AspNetCore.Identity;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
public class ApplicationUserGroupRole : IdentityUserRole<string>
{
    public DefaultIdType? UserGroupId { get; set; }

    public ApplicationUserGroupRole(string roleId, string userId, DefaultIdType? userGroupId)
    {
        RoleId = roleId;
        UserId = userId;
        UserGroupId = userGroupId;
    }
    public ApplicationUserGroupRole(string roleId, string userId, string? userGroupId)
    {
        RoleId = roleId;
        UserId = userId;
        DefaultIdType userGroupIdGuid;
        if (Guid.TryParse(userGroupId, out userGroupIdGuid))
        {
            if(userGroupIdGuid != Guid.Empty)
            {
                UserGroupId = userGroupIdGuid;
            }
        }
    }
    public ApplicationUserGroupRole() { }
}
