using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols.WsTrust;
using Microsoft.IdentityModel.Tokens;
using System.DirectoryServices.Protocols;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Common.ServiceLogger;
using TD.DanhGiaCanBo.Application.Identity.Tokens;
using TD.DanhGiaCanBo.Application.Identity.UserGroups;
using TD.DanhGiaCanBo.Infrastructure.Auth;
using TD.DanhGiaCanBo.Infrastructure.Auth.Jwt;
using TD.DanhGiaCanBo.Infrastructure.Identity.CustomManager;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
using TD.DanhGiaCanBo.Infrastructure.Identity.Specifications;
using TD.DanhGiaCanBo.Infrastructure.Ldap;
using TD.DanhGiaCanBo.Infrastructure.Multitenancy;
using TD.DanhGiaCanBo.Shared.Authorization;
using TD.DanhGiaCanBo.Shared.Multitenancy;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;

internal class TokenService : ITokenService
{
    private readonly CustomUserManager _userManager;
    private readonly IStringLocalizer _t;
    private readonly SecuritySettings _securitySettings;
    private readonly JwtSettings _jwtSettings;
    private readonly TDTenantInfo? _currentTenant;
    private readonly LDAPSettings _ldapSettings;
    private readonly IADService _adServices;
    private readonly IServiceLogger _serviceLogger;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<ApplicationUserGroup> _userGroupRepo;
    private readonly IMemoryCache _memoryCache;
    private readonly ICurrentUser _currentUser;
    public TokenService(
        IRepository<ApplicationUserGroup> userGroupRepo,
        CustomUserManager userManager,
        IOptions<JwtSettings> jwtSettings,
        IStringLocalizer<TokenService> localizer,
        TDTenantInfo? currentTenant,
        IOptions<SecuritySettings> securitySettings,
        IOptions<LDAPSettings> ldapSettings,
        IADService adServices,
        IServiceLogger serviceLogger,
        IDapperRepository dapperRepository,
        IMemoryCache memoryCache,
        ICurrentUser currentUser)
    {
        _userManager = userManager;
        _t = localizer;
        _jwtSettings = jwtSettings.Value;
        _currentTenant = currentTenant;
        _securitySettings = securitySettings.Value;
        _ldapSettings = ldapSettings.Value;
        _adServices = adServices;
        _serviceLogger = serviceLogger;
        _dapperRepository = dapperRepository;
        _memoryCache = memoryCache;
        _currentUser = currentUser;
        _userGroupRepo = userGroupRepo;
    }

    public async Task<TokenResponse> GetTokenAsync(TokenRequest request, string ipAddress, CancellationToken cancellationToken, string? device = null)
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
            string? invalidPasswordAttempts = _memoryCache.Get("InvalidPassword_" + request.UserName)?.ToString();
            int attempts = 0;
            if (!string.IsNullOrEmpty(invalidPasswordAttempts))
            {
                attempts = int.Parse(invalidPasswordAttempts);
            }

            _memoryCache.Set("InvalidPassword_" + request.UserName, attempts + 1);
            throw new BadHttpRequestException("Tài khoản hoặc mật khẩu không chính xác");
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


        var applicationUserGroup = await _userGroupRepo.GetBySpecAsync(new ApplicationUserGroupSpec.GetUserGroup(user.Id, inCludeGroup: true, inCludePhongBan: true), cancellationToken);

        if (user.TypeUser == ApplicationUser.ApplicationUserType.CanBo && applicationUserGroup == null)
        {
            throw new Exception("Tài khoản chưa được cấu hình đơn vị, vui lòng liên hệ quản trị hệ thống");
        }

        return await GenerateTokensAndUpdateUser(user, ipAddress, device, applicationUserGroup: applicationUserGroup);
    }
    public async Task<TokenResponse> RefreshUserGroupTokenAsync(RefreshUserGroupTokenRequest request, string ipAddress)
    {
        if (request.UserGroupId == Guid.Empty)
        {
            throw new BadHttpRequestException("Vui lòng cung cấp nhóm");
        }

        var user = await _userManager.FindByIdAsync(_currentUser.GetUserId().ToString());
        if (user is null)
        {
            throw new BadHttpRequestException("Token không hợp lệ");
        }
        if (user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
        {

            throw new BadHttpRequestException("Refresh token đã hết hạn");
        }
        var applicationUserGroup = await _userGroupRepo.GetBySpecAsync(new ApplicationUserGroupSpec.GetUserGroup(request.UserGroupId.ToString(), inCludeGroup: true, inCludePhongBan: true, getByUserGroupId: true));
        if (user.TypeUser == ApplicationUser.ApplicationUserType.CanBo && applicationUserGroup == null)
        {
            throw new Exception("Tài khoản chưa được cấu hình đơn vị, vui lòng liên hệ quản trị hệ thống");
        }
        return await GenerateTokensAndUpdateUser(user, ipAddress, null, true, applicationUserGroup);
    }
    public async Task<TokenResponse> RefreshTokenAsync(RefreshTokenRequest request, string ipAddress)
    {
        var userPrincipal = GetPrincipalFromExpiredToken(request.Token);
        string? userId = userPrincipal.GetUserId();
        var user = await _userManager.FindByIdAsync(userId!);
        if (user is null)
        {
            throw new BadHttpRequestException(_t["Invalid Refresh Token."]);
        }

        if (user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
        {

            throw new BadHttpRequestException(_t["Refresh Token Has Expired."]);
        }
        var applicationUserGroup = await _userGroupRepo.GetBySpecAsync(new ApplicationUserGroupSpec.GetUserGroup(user.Id, inCludeGroup: true, inCludePhongBan: true));
        if (user.TypeUser == ApplicationUser.ApplicationUserType.CanBo && applicationUserGroup == null)
        {
            throw new Exception("Tài khoản chưa được cấu hình đơn vị, vui lòng liên hệ quản trị hệ thống");
        }
        return await GenerateTokensAndUpdateUser(user, ipAddress, null, true, applicationUserGroup);
    }

    private async Task<TokenResponse> GenerateTokensAndUpdateUser(ApplicationUser user, string ipAddress, string? device = null, bool? isRefreshToken = false, ApplicationUserGroup? applicationUserGroup = null)
    {
        string token = GenerateJwt(user, ipAddress, applicationUserGroup);

        user.RefreshToken = GenerateRefreshToken();
        user.RefreshTokenExpiryTime = DateTime.Now.AddDays(_jwtSettings.RefreshTokenExpirationInDays);

        await _userManager.UpdateAsync(user);

        ServiceLogAuthenRequestParams req = new ServiceLogAuthenRequestParams()
        {
            Fullname = user.FullName,
            Username = user.UserName,
            IP = ipAddress,
            Token = token,
            TypeLogin = isRefreshToken == true ? "RefreshToken" : "FormLogin",
            Device = device
        };
        await _serviceLogger.LogAuthenAsync(req);
        return new TokenResponse(token, user.RefreshToken ?? string.Empty, user.RefreshTokenExpiryTime);
    }

    private string GenerateJwt(ApplicationUser user, string ipAddress, ApplicationUserGroup? applicationUserGroup) =>
        GenerateEncryptedToken(GetSigningCredentials(), GetClaims(user, ipAddress, applicationUserGroup));

    public string GetMaDonViCha(string? groupCode, string? officeCode)
    {
        if (!string.IsNullOrEmpty(groupCode) && groupCode.Length == 6)
        {
            return officeCode + ".00" ?? string.Empty;
        }
        else
        {
            return officeCode ?? string.Empty;
        }
    }
    private IEnumerable<Claim> GetClaims(ApplicationUser user, string ipAddress, ApplicationUserGroup? applicationUserGroup)
    {
        var claims = new List<Claim>()
        {
            new(TDClaims.NameIdentifier, user.Id),
            new(TDClaims.Sub, user.UserName ?? string.Empty),
            new(TDClaims.Email, user.Email ?? string.Empty),
            new(TDClaims.IpAddress, ipAddress),
            new(TDClaims.Tenant, _currentTenant!.Id),
            new(TDClaims.Fullname, user.FullName ?? string.Empty),
            new(TDClaims.TypeUser, user.TypeUser ?? string.Empty),
            new(TDClaims.ForcePasswordChange, user.ForcePasswordChange.ToString())
        };
        if (!string.IsNullOrEmpty(applicationUserGroup?.Group?.GroupName))
        {
            claims.Add(new(TDClaims.TenDonVi, applicationUserGroup?.Group?.GroupName ?? string.Empty));
        }
        if (!string.IsNullOrEmpty(applicationUserGroup?.PhongBan?.GroupCode))
        {
            claims.Add(new(TDClaims.GroupCode, applicationUserGroup?.PhongBan?.GroupCode ?? string.Empty));
        }
        if (!string.IsNullOrEmpty(applicationUserGroup?.Group?.OfGroupCode))
        {
            claims.Add(new(TDClaims.MaDonViCha, GetMaDonViCha(applicationUserGroup?.PhongBan?.GroupCode, applicationUserGroup?.Group?.OfGroupCode) ?? string.Empty));
        }
        if (!string.IsNullOrEmpty(applicationUserGroup?.PhongBan?.GroupName))
        {
            claims.Add(new(TDClaims.TenPhongBan, applicationUserGroup?.PhongBan?.GroupName ?? string.Empty));
        }
        if (!string.IsNullOrEmpty(applicationUserGroup?.Group?.GroupCode))
        {
            claims.Add(new(TDClaims.OfficeCode, applicationUserGroup?.Group?.GroupCode ?? string.Empty));
        }
        if (applicationUserGroup?.Id != null && applicationUserGroup?.Id != Guid.Empty)
        {
            claims.Add(new(TDClaims.UserGroupId, applicationUserGroup.Id.ToString() ?? string.Empty));
        }
        return claims;
    }

    private static string GenerateRefreshToken()
    {
        byte[] randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    private string GenerateEncryptedToken(SigningCredentials signingCredentials, IEnumerable<Claim> claims)
    {
        var token = new JwtSecurityToken(
           claims: claims,
           expires: DateTime.Now.AddMinutes(_jwtSettings.TokenExpirationInMinutes),
           signingCredentials: signingCredentials);
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key)),
            ValidateIssuer = false,
            ValidateAudience = false,
            RoleClaimType = ClaimTypes.Role,
            ClockSkew = TimeSpan.Zero,
            ValidateLifetime = false
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
        if (securityToken is not JwtSecurityToken jwtSecurityToken ||
            !jwtSecurityToken.Header.Alg.Equals(
                SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase))
        {
            throw new UnauthorizedException(_t["Invalid Token."]);
        }

        return principal;
    }

    private SigningCredentials GetSigningCredentials()
    {
        byte[] secret = Encoding.UTF8.GetBytes(_jwtSettings.Key);
        return new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256);
    }

    #region Xử lý đăng nhập LDAP
    public async Task<TokenResponse> GetTokenLDDAPAsync(LoginLdapRequest request, string ipAddress, CancellationToken cancellationToken)
    {

        var adUser = new ADUser();
        var tmp = _ldapSettings;

        var searchResults = SearchInAD(
            _ldapSettings.LDAPserver,
            _ldapSettings.Port,
            _ldapSettings.Domain,
            request.UserName,
            request.Password,
            $"{_ldapSettings.LDAPQueryBase}",
            new StringBuilder("(|")
                .Append($"(sAMAccountName={request.UserName})")
                .Append($"(userPrincipalName={request.UserName})")
                .Append(")")
                .ToString(),
            SearchScope.Subtree,
            new string[]
            {
                    "objectGUID",
                    "sAMAccountName",
                    "displayName",
                    "mail",
                    "whenCreated",
                    "memberOf"
            });

        var results = searchResults.Entries.Cast<SearchResultEntry>();
        if (results.Any())
        {
            var resultsEntry = results.First();
            adUser = new ADUser()
            {
                objectGUID = new Guid((resultsEntry.Attributes["objectGUID"][0] as byte[])!),
                sAMAccountName = resultsEntry.Attributes["sAMAccountName"][0].ToString()!,
                /*mail = resultsEntry.Attributes["mail"][0].ToString()!,
                displayName = resultsEntry.Attributes["displayName"][0].ToString()!,
                whenCreated = DateTime.ParseExact(
                    resultsEntry.Attributes["whenCreated"][0].ToString()!,
                    "yyyyMMddHHmmss.0Z",
                    System.Globalization.CultureInfo.InvariantCulture
                )*/
            };

            var user = await _userManager.FindByNameAsync(adUser.sAMAccountName);

            if (user is null)
            {
                throw new UnauthorizedException(_t["Authentication Failed."]);
            }

            return await GenerateTokensAndUpdateUser(user, ipAddress);
        }
        else
        {
            throw new UnauthorizedException(_t["Authentication Failed."]);
        }

        throw new NotImplementedException();
    }

    public static SearchResponse SearchInAD(string ldapServer, int ldapPort, string domainForAD, string username, string password, string targetOU, string query, SearchScope scope, params string[] attributeList)
    {
        // string ldapServer = $"{subdomain}.{domain}.{zone}";
        // _logger.Debug($"Using LDAP server: {ldapServer}");

        // https://github.com/dotnet/runtime/issues/63759#issuecomment-1019318988
        // on Windows the authentication type is Negotiate, so there is no need to prepend
        // AD user login with domain. On other platforms at the moment only
        // Basic authentication is supported
        var authType = AuthType.Basic;

        // also can fail on non AD servers, so you might prefer
        // to just use AuthType.Basic everywhere
        if (!OperatingSystem.IsWindows())
        {
            authType = AuthType.Basic;
            username = OperatingSystem.IsWindows() ? username : $"{domainForAD}\\{username}";
        }

        // depending on LDAP server, username might require some proper wrapping
        // instead(!) of prepending username with domain
        // username = $"uid={username},CN=Users,DC=subdomain,DC=domain,DC=zone";

        // var connection = new LdapConnection(ldapServer)
        var connection = new LdapConnection(new LdapDirectoryIdentifier(ldapServer, ldapPort))
        {
            AuthType = authType,
            Credential = new(username, password)
        };

        // the default one is v2 (at least in that version), and it is unknown if v3
        // is actually needed, but at least Synology LDAP works only with v3,
        // and since our Exchange doesn't complain, let it be v3
        connection.SessionOptions.ProtocolVersion = 3;

        // this is for connecting via LDAPS (636 port). It should be working,
        // according to https://github.com/dotnet/runtime/issues/43890,
        // but it doesn't (at least with Synology DSM LDAP), although perhaps
        // for a different reason
        // connection.SessionOptions.SecureSocketLayer = true;

        connection.Bind();

        // _logger.Debug($"Searching scope: [{scope}], target: [{targetOU}], query: [{query}]");
        var request = new SearchRequest(targetOU, query, scope, attributeList);

        // var request = new SearchRequest("OU=DEMO,DC=td,DC=com,DC=vn", "(Cn=Demo1)", SearchScope.Subtree, attributeList);

        return (SearchResponse)connection.SendRequest(request);
    }
    #endregion

    #region Xử lý đăng nhập AD
    public async Task<TokenResponse> GetTokenADAsync(LoginLdapRequest request, string ipAddress, CancellationToken cancellationToken)
    {
        string resLoginAD = _adServices.ValidateCredentials(request.UserName, request.Password);
        if (resLoginAD == "1")
        {
            var userLocal = await _userManager.FindByNameAsync(request.UserName);
            if (userLocal is null)
            {
                throw new UnauthorizedException(_t["Tài khoản chưa được tạo trên hệ thống"]);
            }

            return await GenerateTokensAndUpdateUser(userLocal, ipAddress);
        }
        else
        {
            throw new UnauthorizedException(_t["Tài khoản hoặc mật khẩu không đúng."]);
        }
    }
    #endregion
}