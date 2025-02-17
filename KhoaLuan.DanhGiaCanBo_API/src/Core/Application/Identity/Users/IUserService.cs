using System.Security.Claims;
using TD.CitizenAPI.Application.Identity.Users.Password;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
using TD.DanhGiaCanBo.Application.Identity.Users.Password;
using TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
using TD.DanhGiaCanBo.Domain.Identity;

namespace TD.DanhGiaCanBo.Application.Identity.Users;

public interface IUserService : ITransientService
{
    Task<PaginationResponse<UserDetailsDto>> SearchAsync(UserListFilter filter, CancellationToken cancellationToken);
    Task<bool> ExistsWithNameAsync(string name);
    Task<bool> ExistsWithEmailAsync(string email, string? exceptId = null);
    Task<bool> ExistsWithPhoneNumberAsync(string phoneNumber, string? exceptId = null);
    Task<string?> IsSystemManager();

    Task<List<UserDto>> GetListAsync(CancellationToken cancellationToken);

    Task<int> GetCountAsync(CancellationToken cancellationToken);
    Task<object> GetCurrentUserAsync(CancellationToken cancellationToken);

    Task<DetailCurrentUserDto> GetAsync(string id, CancellationToken cancellationToken);
    Task<DetailCurrentUserDto> GetUserAsync(string id, CancellationToken cancellationToken);

    Task<List<UserRoleDto>> GetRolesAsync(string userId, string? userGroupId, CancellationToken cancellationToken);
    Task<string> AssignRolesAsync(string userId, string? userGroupId, UserRolesRequest request, CancellationToken cancellationToken);

    Task<List<string>> GetPermissionsAsync(string userId, string? userGroupId, CancellationToken cancellationToken);
    Task<bool> HasPermissionAsync(string userId, string? userGroupId, string permission, CancellationToken cancellationToken = default);
    Task InvalidatePermissionCacheAsync(string userId, CancellationToken cancellationToken);

    Task ToggleStatusAsync(ToggleUserStatusRequest request, CancellationToken cancellationToken);

    Task<string> GetOrCreateFromPrincipalAsync(ClaimsPrincipal principal);
    Task<string> CreateAsync(CreateUserRequest request, string origin);
    Task<string> CreateWithDefaultPasswordAsync(CreateUserWithDefaultPasswordRequest request, string origin);
    Task UpdateAsync(UpdateUserRequest request, string userId);

    Task<string> ConfirmEmailAsync(string userId, string code, string tenant, CancellationToken cancellationToken);
    Task<string> ConfirmPhoneNumberAsync(string userId, string code);

    Task<string> ForgotPasswordAsync(ForgotPasswordRequest request, string origin);
    Task<string> ResetPasswordAsync(ResetPasswordRequest request);
    Task ChangePasswordAsync(ChangePasswordRequest request, string userId);
    Task UpdateUserAsyncById(UpdateUserRequest request, CancellationToken cancellationToken);
    Task<bool> AdminChangePasswordAsync(AdminResetPasswordRequest request);
    Task<Result> AdminResetPasswordWithValidationAsync(PasswordResetOptions options);
    Task<Result> AdminResetPasswordAsync(string request);
    Task<string> DeleteAsync(string id);
}