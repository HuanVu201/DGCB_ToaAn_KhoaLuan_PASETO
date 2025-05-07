using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Paseto;
using Paseto.Builder;
using Paseto.Cryptography.Key;
using System.Security.Claims;
using System.Text.Encodings.Web;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Infrastructure.Identity;
using TD.DanhGiaCanBo.Shared.Authorization;

namespace TD.DanhGiaCanBo.Infrastructure.Auth.PASETO;
public class PasetoAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly PasetoTokenService _pasetoTokenService;
    private readonly ICacheService _cacheService;
    private readonly IDapperRepository _dapperRepository;

    public PasetoAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock,
        PasetoTokenService pasetoTokenService,
        ICacheService cacheService,
        IDapperRepository dapperRepository)
        : base(options, logger, encoder, clock)
    {
        _pasetoTokenService = pasetoTokenService;
        _cacheService = cacheService;
        _dapperRepository = dapperRepository;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey("Authorization"))
        {
            return AuthenticateResult.Fail("Missing Authorization Header");
        }

        string token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        string[] tokenComponents = token.Split('.');

        #region Xử lý kiểm tra public token
        if (tokenComponents.Length > 2 && tokenComponents[1].ToLower() == "public")
        {
            ProtocolVersion versionRequest = new ProtocolVersion();
            string tokenVersion = tokenComponents[0].ToLower();
            if (tokenVersion == "v1")
                versionRequest = ProtocolVersion.V1;
            else if (tokenVersion == "v2")
                versionRequest = ProtocolVersion.V2;
            else if (tokenVersion == "v3")
                versionRequest = ProtocolVersion.V3;
            else if (tokenVersion == "v4")
                versionRequest = ProtocolVersion.V4;

            byte[] publicKey = _pasetoTokenService.GetAsymmetricPublicDVCKey();

            var valParams = new PasetoTokenValidationParameters
            {
                ValidateLifetime = true,
                ValidateAudience = false,
                ValidateIssuer = false,
            };

            PasetoTokenValidationResult resultPublic = new PasetoBuilder().Use(versionRequest, Purpose.Public)
                            .WithKey(publicKey, Encryption.AsymmetricPublicKey)
                            .Decode(token, valParams);

            if (resultPublic.IsValid)
            {
                ApplicationUser user = new ApplicationUser();

                PasetoPayload payload = resultPublic.Paseto.Payload;
                object claimsPayload = payload["Claim"];
                if (string.IsNullOrEmpty(claimsPayload.ToString()))
                    throw new UnauthorizedException("Invalid Token.");

                JArray claimsArr = JArray.Parse(claimsPayload.ToString() ?? string.Empty);
                var userIdClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "uid");
                var typeUserClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == "typeUser");

                if (userIdClaim != null)
                {
                    string userIdFromToken = userIdClaim["Value"].ToString();

                    string sqlCheckUser = @"
                        SELECT FullName, UserName
                        FROM [Identity].[Users]
                        Where DeletedOn is null AND IsActive = 1 AND Id = @Id ";

                    var dataCheck = await _dapperRepository.QueryFirstOrDefaultAsync<dynamic>(sqlCheckUser, new { Id = userIdFromToken });

                    if (dataCheck == null)
                        throw new UnauthorizedException("Authentication Failed.");

                    user.Id = userIdFromToken;
                }

                if (typeUserClaim != null)
                    user.TypeUser = typeUserClaim["Value"].ToString();

                var claims = _pasetoTokenService.GetClaimsFromToken(user, string.Empty, string.Empty);
                var identity = new ClaimsIdentity(claims, Scheme.Name);
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, Scheme.Name);

                return AuthenticateResult.Success(ticket);
            }

            throw new UnauthorizedException("Authentication Failed.");
        }
        #endregion

        string tokenLogout = _cacheService.Get<string>(token)?.ToString() ?? string.Empty;
        if (!string.IsNullOrEmpty(tokenLogout) && tokenLogout.Contains("Logout"))
            throw new UnauthorizedException("Authentication Failed.");

        PasetoTokenValidationResult result = _pasetoTokenService.DecodePasetoToken(token);

        if (result.IsValid)
        {
            string? userId = string.Empty;

            PasetoPayload payload = result.Paseto.Payload;
            object claimsPayload = payload["Claim"];
            if (string.IsNullOrEmpty(claimsPayload.ToString()))
                throw new UnauthorizedException("Invalid Token.");

            JArray claimsArr = JArray.Parse(claimsPayload.ToString() ?? string.Empty);
            var userIdClaim = claimsArr.FirstOrDefault(claim => claim["Type"].ToString() == TDClaims.NameIdentifier);

            if (userIdClaim != null)
                userId = userIdClaim["Value"].ToString();

            var serializableClaims = _cacheService.Get<List<SerializableClaim>>("UserID_" + userId);

            if (serializableClaims == null)
                throw new UnauthorizedException("Authentication Failed.");

            var claims = serializableClaims.Select(sc => sc.ToClaim());
            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return AuthenticateResult.Success(ticket);
        }
        else
        {
            var endpoint = Context.GetEndpoint();
            if (endpoint?.Metadata.GetMetadata<Microsoft.AspNetCore.Authorization.AllowAnonymousAttribute>() != null)
            {
                return AuthenticateResult.Success(new AuthenticationTicket(new ClaimsPrincipal(), Scheme.Name));
            }

            throw new UnauthorizedException("Authentication Failed.");
        }
    }
}

// var a = _currentUser.GetUserId();
// var b = _currentUser.GetUserOfficeCode();
// var c = _currentUser.GetUserGroupCode();
// var d = _currentUser.GetUserFullName();
// var e = _currentUser.GetUserGroupName();
// var f = _currentUser.GetUserOfficeName();
// var g = _currentUser.GetUserEmail();
// var h = _currentUser.GetUserName();
// var i = _currentUser.GetUserMaDinhDanh();
// var j = _currentUser.GetUserPositionName();
// var k = _currentUser.GetTypeUser();
// var l = _currentUser.GetTenant();
// var m = _currentUser.IsAuthenticated();