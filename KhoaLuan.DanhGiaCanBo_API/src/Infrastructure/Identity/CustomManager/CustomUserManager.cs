using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TD.DanhGiaCanBo.Infrastructure.Persistence.Context;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Irony;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using StackExchange.Redis;
using DocumentFormat.OpenXml.VariantTypes;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.CustomManager;
public class CustomUserManager : UserManager<ApplicationUser>
{
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly ApplicationDbContext _context;
    private readonly IUserStore<ApplicationUser> _store;
    public CustomUserManager(
        IUserStore<ApplicationUser> store,
        IOptions<IdentityOptions> optionsAccessor,
        IPasswordHasher<ApplicationUser> passwordHasher,
        IEnumerable<IUserValidator<ApplicationUser>> userValidators,
        IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators,
        ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors,
        IServiceProvider services,
        ILogger<UserManager<ApplicationUser>> logger,
        RoleManager<ApplicationRole> roleManager,
        ApplicationDbContext context
        ) : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
    {
        _roleManager = roleManager;
        _context = context;
        _store = store;
    }
    public async Task<IList<string>> GetRolesAsync(ApplicationUser user, string? userGroupId)
    {
        // Lấy danh sách RoleId của user dựa trên UserGroupId
        var roleIds = await _context.UserRoles
            .Where(ugr => ugr.UserId == user.Id && ugr.UserGroupId.ToString() == userGroupId)
            .Select(ugr => ugr.RoleId)
            .ToListAsync();

        // Lấy tên vai trò (RoleName) từ RoleId
        var roleNames = await _roleManager.Roles
            .Where(role => roleIds.Contains(role.Id))
            .Select(role => role.Name)
            .ToListAsync();

        return roleNames;
    }
    public async Task<bool> IsInRoleAsync(ApplicationUser user, string roleName, string? userGroupId, string roleId = null)
    {
     
        if(string.IsNullOrEmpty(roleId))
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                return false;
            }
            return await _context.UserRoles
            .AnyAsync(ugr => ugr.UserId == user.Id && ugr.RoleId == role.Id && ((userGroupId == null && ugr.UserGroupId == null) || ugr.UserGroupId.ToString() == userGroupId));
        }
        else
        {
            return await _context.UserRoles
            .AnyAsync(ugr => ugr.UserId == user.Id && ugr.RoleId == roleId && ((userGroupId == null && ugr.UserGroupId == null) || ugr.UserGroupId.ToString() == userGroupId));
        }
    }
    public async Task<IdentityResult> AddToRoleAsync(ApplicationUser user, string roleName, string? userGroupId)
    {
        try { 
        var role = await _roleManager.FindByNameAsync(roleName);
        if (await IsInRoleAsync(user, roleName, userGroupId, role.Id).ConfigureAwait(false))
        {
            return IdentityResult.Success;
        }
        var newRole = new ApplicationUserGroupRole(role.Id, user.Id, userGroupId);
        await _context.UserRoles.AddAsync(newRole);
        await _context.SaveChangesAsync();
        return IdentityResult.Success;
        }
        catch (Exception ex)
        {
            //Console.WriteLine(ex.Message);
            return IdentityResult.Failed();
        }
    }
    public async Task<IdentityResult> RemoveFromRoleAsync(ApplicationUser user, string roleName, string? userGroupId)
    {
        var role = await _roleManager.FindByNameAsync(roleName);
        if (!await IsInRoleAsync(user, roleName, userGroupId, role.Id).ConfigureAwait(false))
        {
            return IdentityResult.Failed(ErrorDescriber.UserNotInRole(roleName));
        }
        var userRole = await _context.UserRoles
        .FirstOrDefaultAsync(ugr => ugr.UserId == user.Id && ugr.RoleId == role.Id && ((userGroupId == null && ugr.UserGroupId == null) || ugr.UserGroupId.ToString() == userGroupId));
        if (userRole == null)
        {
            return IdentityResult.Failed(new IdentityError { Description = $"The role association was not found." });
        }

        _context.UserRoles.Remove(userRole);
        await _context.SaveChangesAsync();

        return IdentityResult.Success;
    }
    public Task<IList<ApplicationUser>> GetUsersInRoleAsync(string roleName)
    {
        return base.GetUsersInRoleAsync(roleName);
    }
}
