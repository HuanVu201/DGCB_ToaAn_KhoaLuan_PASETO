using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Identity.Users;
using TD.DanhGiaCanBo.Domain.Identity;
using TD.DanhGiaCanBo.Shared.Authorization;
using TD.DanhGiaCanBo.Shared.Multitenancy;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;

internal partial class UserService
{

    public async Task<string?> IsSystemManager()
    {
        //var user = await GetCurrentUserAsync(default);
        //var role = await _roleManager.Roles.AsNoTracking().Where(x => x.Name == TDRoles.QuanTriHeThong).FirstOrDefaultAsync();
        //if (role == null) return user.OfficeCode;
        return null;
    }
    public async Task<List<UserRoleDto>> GetRolesAsync(string userId, string? userGroupId, CancellationToken cancellationToken)
    {
        var userRoles = new List<UserRoleDto>();

        var user = await _userManager.FindByIdAsync(userId);
        if (user is null) throw new NotFoundException("User Not Found.");
        var roles = await _roleManager.Roles.AsNoTracking().ToListAsync(cancellationToken);
        if (roles is null) throw new NotFoundException("Roles Not Found.");
        foreach (var role in roles)
        {
            userRoles.Add(new UserRoleDto
            {
                RoleId = role.Id,
                RoleName = role.Name,
                Description = role.Description,
                Number = role.ThuTu,
                Enabled = await _userManager.IsInRoleAsync(user, role.Name!, userGroupId)
            });
        }

        return userRoles;
    }

    public async Task<string> AssignRolesAsync(string userId, string? userGroupId, UserRolesRequest request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request, nameof(request));

        var user = await _userManager.Users.Where(u => u.Id == userId).FirstOrDefaultAsync(cancellationToken);

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);

        // Check if the user is an admin for which the admin role is getting disabled
        if (await _userManager.IsInRoleAsync(user, TDRoles.QuanTriHeThong, null)
            && request.UserRoles.Any(a => !a.Enabled && a.RoleName == TDRoles.QuanTriHeThong))
        {
            // Get count of users in Admin Role
            int adminCount = (await _userManager.GetUsersInRoleAsync(TDRoles.QuanTriHeThong)).Count;

            // Check if user is not Root Tenant Admin
            // Edge Case : there are chances for other tenants to have users with the same email as that of Root Tenant Admin. Probably can add a check while User Registration
            if (user.Email == MultitenancyConstants.Root.EmailAddress)
            {
                if (_currentTenant.Id == MultitenancyConstants.Root.Id)
                {
                    throw new ConflictException(_t["Cannot Remove Admin Role From Root Tenant Admin."]);
                }
            }
            else if (adminCount <= 2)
            {
                throw new ConflictException(_t["Tenant should have at least 2 Admins."]);
            }
        }

        foreach (var userRole in request.UserRoles)
        {
            // Check if Role Exists
            if (await _roleManager.FindByNameAsync(userRole.RoleName!) is not null)
            {
                if (userRole.Enabled)
                {
                    if (!await _userManager.IsInRoleAsync(user, userRole.RoleName!, userGroupId))
                    {
                        await _userManager.AddToRoleAsync(user, userRole.RoleName!, userGroupId);
                    }
                }
                else
                {
                    await _userManager.RemoveFromRoleAsync(user, userRole.RoleName!, userGroupId);
                }
            }
        }

        await _events.PublishAsync(new ApplicationUserUpdatedEvent(user.Id, true));

        return _t["User Roles Updated Successfully."];
    }
}