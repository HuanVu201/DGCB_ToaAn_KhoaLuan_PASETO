using TD.DanhGiaCanBo.Shared.Authorization;

namespace System.Security.Claims;

public static class ClaimsPrincipalExtensions
{
    public static string? GetEmail(this ClaimsPrincipal principal)
        => principal.FindFirstValue(TDClaims.Email);
    public static string? GetTypeUser(this ClaimsPrincipal principal)
    => principal.FindFirstValue(TDClaims.TypeUser);
    public static string? GetUserName(this ClaimsPrincipal principal)
    => principal.FindFirstValue(ClaimTypes.NameIdentifier);
    public static string? GetTenant(this ClaimsPrincipal principal)
        => principal.FindFirstValue(TDClaims.Tenant);
    public static string? GetUserGroupId(this ClaimsPrincipal principal)
        => principal.FindFirstValue(TDClaims.UserGroupId);
    public static string? GetGroupCode(this ClaimsPrincipal principal)
    => principal.FindFirstValue(TDClaims.GroupCode);
    public static string? GetOfficeCode(this ClaimsPrincipal principal)
        => principal.FindFirstValue(TDClaims.OfficeCode);
    public static string? GetFullName(this ClaimsPrincipal principal)
        => principal?.FindFirst(TDClaims.Fullname)?.Value;
    public static string? GetFirstName(this ClaimsPrincipal principal)
        => principal?.FindFirst(ClaimTypes.Name)?.Value;

    public static string? GetSurname(this ClaimsPrincipal principal)
        => principal?.FindFirst(ClaimTypes.Surname)?.Value;

    public static string? GetPhoneNumber(this ClaimsPrincipal principal)
        => principal.FindFirstValue(ClaimTypes.MobilePhone);

    public static string? GetUserId(this ClaimsPrincipal principal)
       => principal.FindFirstValue(TDClaims.NameIdentifier);

    public static string? GetImageUrl(this ClaimsPrincipal principal)
       => principal.FindFirstValue(TDClaims.ImageUrl);

    public static DateTimeOffset GetExpiration(this ClaimsPrincipal principal) =>
        DateTimeOffset.FromUnixTimeSeconds(Convert.ToInt64(
            principal.FindFirstValue(TDClaims.Expiration)));
    private static string? FindFirstValue(this ClaimsPrincipal principal, string claimType) =>
        principal is null
            ? throw new ArgumentNullException(nameof(principal))
            : principal.FindFirst(claimType)?.Value;
}