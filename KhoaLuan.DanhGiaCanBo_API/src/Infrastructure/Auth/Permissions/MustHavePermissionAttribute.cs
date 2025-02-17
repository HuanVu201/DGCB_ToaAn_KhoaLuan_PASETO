using TD.DanhGiaCanBo.Shared.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace TD.DanhGiaCanBo.Infrastructure.Auth.Permissions;

public class MustHavePermissionAttribute : AuthorizeAttribute
{
    public MustHavePermissionAttribute(string action, string resource) =>
        Policy = TDPermission.NameFor(action, resource);
}