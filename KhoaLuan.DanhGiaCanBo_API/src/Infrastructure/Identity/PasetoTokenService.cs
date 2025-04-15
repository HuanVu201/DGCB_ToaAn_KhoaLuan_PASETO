using Microsoft.Extensions.Options;
using Paseto.Builder;
using Paseto;
using System.Security.Claims;
using System.Text;
using TD.DanhGiaCanBo.Application.Identity.Tokens;
using TD.DanhGiaCanBo.Infrastructure.Auth.PASETO;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;
using TD.DanhGiaCanBo.Infrastructure.Auth;
using TD.DanhGiaCanBo.Application.Common.ServiceLogger;
using TD.DanhGiaCanBo.Infrastructure.Ldap;
using TD.DanhGiaCanBo.Infrastructure.Multitenancy;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Shared.Multitenancy;
using TD.DanhGiaCanBo.Shared.Authorization;
using System.Security.Cryptography;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Http;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Catalog;
using System.ServiceModel;
using System.Threading;
using TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Models;
using Paseto.Cryptography.Key;
using Newtonsoft.Json;
using Paseto.Protocol;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Interfaces;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;
public class PasetoTokenService : IPasetoTokenService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IStringLocalizer _t;
    private readonly SecuritySettings _securitySettings;
    private readonly PasetoSettings _pasetoSettings;
    private readonly TDTenantInfo? _currentTenant;
    private readonly LDAPSettings _ldapSettings;
    private readonly IServiceLogger _serviceLogger;
    private readonly ICurrentUser _currentUser;
    private readonly ICacheService _cacheService;
    public PasetoTokenService(
        UserManager<ApplicationUser> userManager,
        IOptions<PasetoSettings> pasetoSettings,
        IStringLocalizer<PasetoTokenService> localizer,
        TDTenantInfo? currentTenant,
        IOptions<SecuritySettings> securitySettings,
        IOptions<LDAPSettings> ldapSettings,
        IServiceLogger serviceLogger,
        ICurrentUser currentUser,
        ICacheService cacheService)
    {
        _userManager = userManager;
        _t = localizer;
        _pasetoSettings = pasetoSettings.Value;
        _currentTenant = currentTenant;
        _securitySettings = securitySettings.Value;
        _ldapSettings = ldapSettings.Value;
        _serviceLogger = serviceLogger;
        _currentUser = currentUser;
        _cacheService = cacheService;
    }

    public async Task<TokenResponse> GetTokenAsync(PasetoTokenRequest request, string ipAddress, CancellationToken cancellationToken, string? device = null)
    {

        ApplicationUser? user = null;
        if (!string.IsNullOrEmpty(request.Email))
        {
            user = await _userManager.FindByEmailAsync(request.Email.Trim().Normalize());
        }
        else if (!string.IsNullOrEmpty(request.UserName))
        {
            user = await _userManager.FindByNameAsync(request.UserName.Trim().Normalize());
        }

        if (string.IsNullOrWhiteSpace(_currentTenant?.Id) || user is null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            int? invalidPasswordAttempts = _cacheService.Get<int>("InvalidPassword_" + request.UserName);
            int attempts = 0;
            if (invalidPasswordAttempts.HasValue)
            {
                attempts = invalidPasswordAttempts ?? 0;
            }

            _cacheService.Set("InvalidPassword_" + request.UserName, attempts + 1, TimeSpan.FromMinutes(10));
            throw new BadHttpRequestException(_t["Authentication Failed."]);
        }

        if (!user.IsActive)
        {
            throw new UnauthorizedException(_t["User Not Active. Please contact the administrator."]);
        }

        if (_securitySettings.RequireConfirmedAccount && !user.EmailConfirmed)
        {
            throw new UnauthorizedException(_t["E-Mail not confirmed."]);
        }

        if (_currentTenant.Id != MultitenancyConstants.Root.Id)
        {
            if (!_currentTenant.IsActive)
            {
                throw new UnauthorizedException(_t["Tenant is not Active. Please contact the Application Administrator."]);
            }

            if (DateTime.Now > _currentTenant.ValidUpto)
            {
                throw new UnauthorizedException(_t["Tenant Validity Has Expired. Please contact the Application Administrator."]);
            }
        }

        return await GenerateTokensAndUpdateUser(user, ipAddress, device);
    }

    public async Task<TokenResponse> RefreshTokenAsync(RefreshTokenRequest request, string ipAddress)
    {
        string userId = GetUserIdPrincipalFromExpiredToken(request.Token);

        var user = await _userManager.FindByIdAsync(userId!);
        if (user is null)
        {
            throw new BadHttpRequestException(_t["Invalid Refresh Token."]);
        }

        if (user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
        {
            throw new BadHttpRequestException(_t["Refresh Token Has Expired."]);
        }

        return await GenerateTokensAndUpdateUser(user, ipAddress, null, true);
    }

    private async Task<TokenResponse> GenerateTokensAndUpdateUser(ApplicationUser user, string ipAddress, string? device = null, bool? isRefreshToken = false)
    {
        string token = GeneratePasetoToken(user, ipAddress);

        user.RefreshToken = GenerateRefreshToken();

        if (isRefreshToken == false)
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(_pasetoSettings.RefreshTokenExpirationInDays);

        await _userManager.UpdateAsync(user);

        ServiceLogAuthenRequestParams req = new ServiceLogAuthenRequestParams()
        {
            Fullname = user.FullName,
            Username = user.UserName,
            IP = ipAddress,
            Token = token,
            TypeUser = user.TypeUser,
            TypeLogin = isRefreshToken == true ? "RefreshToken" : "FormLogin",
            Device = device
        };
        await _serviceLogger.LogAuthenAsync(req);
        return new TokenResponse(token, user.RefreshToken ?? string.Empty, user.RefreshTokenExpiryTime);
    }

    private string GeneratePasetoToken(ApplicationUser user, string ipAddress)
    {
        var claims = GetClaims(user, ipAddress);
        var serializableClaims = claims.Select(c => SerializableClaim.FromClaim(c)).ToList();
        _cacheService.Set("UserID_" + user.Id, serializableClaims, TimeSpan.FromMinutes(_pasetoSettings.TokenExpirationInMinutes));

        return new PasetoBuilder().Use(ProtocolVersion.V2, Purpose.Local)
                               .WithKey(GetSymmetricKeyAsBytes(), Encryption.SymmetricKey)
                               .AddClaim("Claim", GetUserIdClaim(user.Id))
                               .Expiration(DateTime.Now.AddMinutes(_pasetoSettings.TokenExpirationInMinutes))
                               .TokenIdentifier(user.Id + "_" + user.Email + "_" + DateTime.Now)
                               .Encode();
    }

    public string GetUserIdPrincipalFromExpiredToken(string token)
    {
        try
        {
            PasetoTokenValidationResult result = DecodePasetoTokenWithoutExpiryTime(token);

            if (result.IsValid)
            {
                PasetoPayload payload = result.Paseto.Payload;
                object claimsPayload = payload["Claim"];
                if (string.IsNullOrEmpty(claimsPayload.ToString()))
                    throw new UnauthorizedException(_t["Invalid Email In Token."]);

                JArray claims = JArray.Parse(claimsPayload.ToString() ?? string.Empty);
                var uidClaim = claims.FirstOrDefault(claim => claim["Type"].ToString() == "uid");

                if (uidClaim != null)
                {
                    return uidClaim["Value"].ToString();
                }

                throw new UnauthorizedException(_t["Invalid Email In Token"]);
            }
            else
            {
                throw new InternalServerException(_t[$"Invalid Token: {result.Exception}"]);
            }

        }
        catch (Exception ex)
        {
            throw new InternalServerException(_t["Invalid Token: "] + ex.Message);
        }
    }

    public PasetoTokenValidationResult DecodePasetoToken(string token)
    {
        var valParams = new PasetoTokenValidationParameters
        {
            ValidateLifetime = true,
            ValidateAudience = false,
            ValidateIssuer = false,
        };

        return new PasetoBuilder().Use(ProtocolVersion.V2, Purpose.Local)
                                          .WithKey(GetSymmetricKeyAsBytes(), Encryption.SymmetricKey)
                                          .Decode(token, valParams);
    }

    public PasetoTokenValidationResult DecodePasetoTokenWithoutExpiryTime(string token)
    {
        return new PasetoBuilder().Use(ProtocolVersion.V2, Purpose.Local)
                                          .WithKey(GetSymmetricKeyAsBytes(), Encryption.SymmetricKey)
                                          .Decode(token);
    }

    private static string GenerateRefreshToken()
    {
        byte[] randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    public byte[] GetSymmetricKeyAsBytes()
    {
        if (string.IsNullOrEmpty(_pasetoSettings.Key))
        {
            throw new NotFoundException("Invalid config PasetoKey");
        }

        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] bytes = Encoding.UTF8.GetBytes(_pasetoSettings.Key);
            return sha256.ComputeHash(bytes); // Luôn trả về 32 bytes
        }
    }
    private IEnumerable<Claim> GetUserIdClaim(string userId) =>
       new List<Claim>
       {
            new(TDClaims.NameIdentifier, userId),
       };

    private IEnumerable<Claim> GetClaims(ApplicationUser user, string ipAddress) =>
        new List<Claim>
        {
             new(TDClaims.NameIdentifier, user.Id),
             new(TDClaims.Sub, user.UserName ?? string.Empty),
             new(TDClaims.Email, user.Email ?? string.Empty),
             new(TDClaims.IpAddress, ipAddress),
             new(TDClaims.Tenant, _currentTenant!.Id),
             new(TDClaims.Fullname, user.FullName ?? string.Empty),
             new(TDClaims.TypeUser, user.TypeUser ?? string.Empty)
        };

    public IEnumerable<Claim> GetClaimsFromToken(ApplicationUser? user, string? tenantId, string? ipAddress) =>
        new List<Claim>
        {
             new(TDClaims.NameIdentifier, user.Id),
             new(TDClaims.Sub, user.UserName ?? string.Empty),
             new(TDClaims.Email, user.Email ?? string.Empty),
             new(TDClaims.IpAddress, ipAddress),
             new(TDClaims.Tenant, tenantId),
             new(TDClaims.Fullname, user.FullName ?? string.Empty),
             new(TDClaims.TypeUser, user.TypeUser ?? string.Empty)
        };

    public byte[] GetAsymmetricPublicDVCKey()
    {
        PasetoAsymmetricPublicKey config;
        if (string.IsNullOrEmpty(_pasetoSettings.PublicKeyDVC))
            throw new NotFoundException("Invalid config PublicKeyDVC");

        return Convert.FromBase64String(_pasetoSettings.PublicKeyDVC);
    }
}
