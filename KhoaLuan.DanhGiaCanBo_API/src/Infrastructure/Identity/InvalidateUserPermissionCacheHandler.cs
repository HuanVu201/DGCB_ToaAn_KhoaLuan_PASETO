using TD.DanhGiaCanBo.Application.Common.Events;
using TD.DanhGiaCanBo.Application.Identity.Users;
using TD.DanhGiaCanBo.Domain.Identity;
using Microsoft.AspNetCore.Identity;
using TD.DanhGiaCanBo.Infrastructure.Identity.CustomManager;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;

internal class InvalidateUserPermissionCacheHandler :
    IEventNotificationHandler<ApplicationUserUpdatedEvent>,
    IEventNotificationHandler<ApplicationRoleUpdatedEvent>
{
    private readonly IUserService _userService;
    private readonly CustomUserManager _userManager;

    public InvalidateUserPermissionCacheHandler(IUserService userService, CustomUserManager userManager) =>
        (_userService, _userManager) = (userService, userManager);

    public async Task Handle(EventNotification<ApplicationUserUpdatedEvent> notification, CancellationToken cancellationToken)
    {
        if (notification.Event.RolesUpdated)
        {
            await _userService.InvalidatePermissionCacheAsync(notification.Event.UserId, cancellationToken);
        }
    }

    public async Task Handle(EventNotification<ApplicationRoleUpdatedEvent> notification, CancellationToken cancellationToken)
    {
        if (notification.Event.PermissionsUpdated)
        {
            foreach (var user in await _userManager.GetUsersInRoleAsync(notification.Event.RoleName))
            {
                await _userService.InvalidatePermissionCacheAsync(user.Id, cancellationToken);
            }
        }
    }
}