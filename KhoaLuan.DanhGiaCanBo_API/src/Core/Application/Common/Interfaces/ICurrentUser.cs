using System.Security.Claims;

namespace TD.DanhGiaCanBo.Application.Common.Interfaces;

public interface ICurrentUser
{
    string? Name { get; }

    Guid GetUserId();
    string? GetOfficeCode();
    string? GetUserGroupId();
    string? GetGroupCode();
    string? GetTypeUser();
    string? GetUserFullName();
    string? GetUserEmail();
    string? GetUserName();
    string? GetTenant();
    bool IsAuthenticated();

    bool IsInRole(string role);

    IEnumerable<Claim>? GetUserClaims();
}