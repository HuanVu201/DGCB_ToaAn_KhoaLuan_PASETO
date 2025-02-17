using System.Security.Claims;
using TD.DanhGiaCanBo.Application.Identity.Users;
using Microsoft.AspNetCore.Authorization;

namespace TD.DanhGiaCanBo.Infrastructure.Auth.Permissions;

internal class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
{
    private readonly IUserService _userService;

    public PermissionAuthorizationHandler(IUserService userService) =>
        _userService = userService;

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
    {
        var userGroupId = context.User.GetUserGroupId();
        if (context.User?.GetUserId() is { } userId &&
            await _userService.HasPermissionAsync(userId, userGroupId, requirement.Permission))
        {
            context.Succeed(requirement);
        }
    }
}