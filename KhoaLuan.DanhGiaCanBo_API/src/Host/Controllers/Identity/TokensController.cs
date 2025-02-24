using Microsoft.Extensions.Caching.Memory;
using System.Net;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Identity.Tokens;

namespace TD.DanhGiaCanBo.Host.Controllers.Identity;

public sealed class TokensController : VersionNeutralApiController
{
    private readonly ITokenService _tokenService;
    private readonly IPasetoTokenService _pasetoTokenService;
    private readonly IConfiguration _configuration;
    private readonly IMemoryCache _memoryCache;
    public TokensController(ITokenService tokenService, IConfiguration configuration, IMemoryCache memoryCache, IPasetoTokenService pasetoTokenService)
    {
        _tokenService = tokenService;
        _configuration = configuration;
        _memoryCache = memoryCache;
        _pasetoTokenService = pasetoTokenService;
    }

    [HttpPost]
    [AllowAnonymous]
    [TenantIdHeader]
    [OpenApiOperation("Request an access token using credentials.", "")]
    public Task<TokenResponse> GetTokenAsync(PasetoTokenRequest request, CancellationToken cancellationToken)
    {
        //string? securityCode = _configuration.GetValue<string>("SecurityCode");
        //if (!string.IsNullOrEmpty(securityCode) && securityCode != request.SecurityCode)
        //{
        //    throw new UnauthorizedException("Authentication Failed.");
        //}

        //int? maxInvalidPasswordAttempts = _configuration.GetValue<int?>("MaxInvalidPasswordAttempts");
        //string? invalidPasswordAttempts = _memoryCache.Get("InvalidPassword_" + request.UserName)?.ToString();
        //if (maxInvalidPasswordAttempts == null || maxInvalidPasswordAttempts == 0)
        //    maxInvalidPasswordAttempts = 100;
        //if (!string.IsNullOrEmpty(invalidPasswordAttempts) && int.Parse(invalidPasswordAttempts) > maxInvalidPasswordAttempts)
        //{
        //    throw new UnauthorizedException("Authentication Failed. Max Invalid Password Attempts .");
        //}

        return _pasetoTokenService.GetTokenAsync(request, GetIpAddress()!, cancellationToken, GetDevice());
    }

    [HttpPost("ldaplogin")]
    [AllowAnonymous]
    [TenantIdHeader]
    [OpenApiOperation("Request an access token using credentials Ldap", "")]
    public Task<TokenResponse> GetTokenLDAPAsync(LoginLdapRequest request, CancellationToken cancellationToken)
    {
        return _tokenService.GetTokenLDDAPAsync(request, GetIpAddress() ?? "N/A", cancellationToken);
    }

    [HttpPost("adlogin")]
    [AllowAnonymous]
    [TenantIdHeader]
    [OpenApiOperation("Request an access token using credentials AD", "")]
    public Task<TokenResponse> GetTokenADAsync(LoginLdapRequest request, CancellationToken cancellationToken)
    {
        return _tokenService.GetTokenADAsync(request, GetIpAddress() ?? "N/A", cancellationToken);
    }

    [HttpPost("refresh")]
    [AllowAnonymous]
    [TenantIdHeader]
    [OpenApiOperation("Request an access token using a refresh token.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Search))]
    public Task<TokenResponse> RefreshAsync(RefreshTokenRequest request)
    {
        return _pasetoTokenService.RefreshTokenAsync(request, GetIpAddress()!);
    }

    [HttpPost("ChangeUserGroup")]
    [Authorize]
    [TenantIdHeader]
    [OpenApiOperation("Request an access token using a refresh token.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Search))]
    public Task<TokenResponse> ChangeUserGroup(RefreshUserGroupTokenRequest request)
    {
        return _tokenService.RefreshUserGroupTokenAsync(request, GetIpAddress()!);
    }

    private string? GetIpAddress() =>
    Request.Headers.ContainsKey("X-Forwarded-For")
        ? Request.Headers["X-Forwarded-For"]
        : HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString() ?? "N/A";
    private string? GetDevice() =>
    Request.Headers.TryGetValue("User-Agent", out var value) ? value : "Unknown";
}