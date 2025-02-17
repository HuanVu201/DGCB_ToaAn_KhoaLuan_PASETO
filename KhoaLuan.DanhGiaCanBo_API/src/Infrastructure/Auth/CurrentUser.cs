using System.Security.Claims;
using TD.DanhGiaCanBo.Application.Common.Interfaces;

namespace TD.DanhGiaCanBo.Infrastructure.Auth;

public class CurrentUser : ICurrentUser, ICurrentUserInitializer
{
    private ClaimsPrincipal? _user;

    public string? Name => _user?.Identity?.Name;

    private Guid _userId = Guid.Empty;

    public Guid GetUserId() =>
        IsAuthenticated()
            ? Guid.Parse(_user?.GetUserId() ?? Guid.Empty.ToString())
            : _userId;
    public string? GetTypeUser() =>
     IsAuthenticated()
         ? _user!.GetTypeUser()
         : string.Empty;

    public string? GetUserEmail() =>
        IsAuthenticated()
            ? _user!.GetEmail()
            : string.Empty;
    public string? GetUserName() =>
    IsAuthenticated()
        ? _user!.GetUserName()
        : string.Empty;
    public bool IsAuthenticated() =>
        _user?.Identity?.IsAuthenticated is true;

    public string? GetOfficeCode() =>
    IsAuthenticated()
    ? _user!.GetOfficeCode()
    : string.Empty;
    public string? GetUserGroupId() =>
    IsAuthenticated()
    ? _user!.GetUserGroupId()
    : string.Empty;

    public string? GetGroupCode() =>
    IsAuthenticated()
    ? _user!.GetGroupCode()
    : string.Empty;
    
    public bool IsInRole(string role) =>
        _user?.IsInRole(role) is true;

    public IEnumerable<Claim>? GetUserClaims() =>
        _user?.Claims;

    public string? GetTenant() =>
        IsAuthenticated() ? _user?.GetTenant() : string.Empty;

    public void SetCurrentUser(ClaimsPrincipal user)
    {
        if (_user != null)
        {
            throw new Exception("Method reserved for in-scope initialization");
        }

        _user = user;
    }

    public void SetCurrentUserId(string userId)
    {
        if (_userId != Guid.Empty)
        {
            throw new Exception("Method reserved for in-scope initialization");
        }

        if (!string.IsNullOrEmpty(userId))
        {
            _userId = Guid.Parse(userId);
        }
    }

    public string? GetUserFullName() =>
        IsAuthenticated()
            ? _user!.GetFullName()
            : string.Empty;
}