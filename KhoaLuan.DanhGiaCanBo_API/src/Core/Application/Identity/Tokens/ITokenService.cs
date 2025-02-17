namespace TD.DanhGiaCanBo.Application.Identity.Tokens;

public interface ITokenService : ITransientService
{
    Task<TokenResponse> GetTokenAsync(TokenRequest request, string ipAddress, CancellationToken cancellationToken, string? device = null);
    Task<TokenResponse> GetTokenLDDAPAsync(LoginLdapRequest request, string ipAddress, CancellationToken cancellationToken);
    Task<TokenResponse> RefreshTokenAsync(RefreshTokenRequest request, string ipAddress);
    Task<TokenResponse> GetTokenADAsync(LoginLdapRequest request, string ipAddress, CancellationToken cancellationToken);
    Task<TokenResponse> RefreshUserGroupTokenAsync(RefreshUserGroupTokenRequest request, string ipAddress);
    string GetMaDonViCha(string? groupCode, string? officeCode);
}