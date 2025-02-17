using System.Security.Claims;
using System.Text;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Caching.Memory;

namespace TD.DanhGiaCanBo.Infrastructure.Auth.Jwt;

public class ConfigureJwtBearerOptions : IConfigureNamedOptions<JwtBearerOptions>
{
    private readonly JwtSettings _jwtSettings;
    private readonly IMemoryCache _memoryCache;

    public ConfigureJwtBearerOptions(IOptions<JwtSettings> jwtSettings, IMemoryCache memoryCache)
    {
        _jwtSettings = jwtSettings.Value;
        _memoryCache = memoryCache;
    }

    public void Configure(JwtBearerOptions options)
    {
        Configure(string.Empty, options);
    }

    public void Configure(string? name, JwtBearerOptions options)
    {
        if (name != JwtBearerDefaults.AuthenticationScheme)
        {
            return;
        }

        byte[] key = Encoding.ASCII.GetBytes(_jwtSettings.Key);

        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateLifetime = true,
            ValidateAudience = false,
            RoleClaimType = ClaimTypes.Role,
            ClockSkew = TimeSpan.Zero
        };
        options.Events = new JwtBearerEvents
        {
            OnChallenge = context =>
            {
                context.HandleResponse();
                if (!context.Response.HasStarted)
                {
                    throw new UnauthorizedException("Authentication Failed.");
                }

                return Task.CompletedTask;
            },
            OnForbidden = _ => throw new ForbiddenException("You are not authorized to access this resource."),
            OnMessageReceived = context =>
            {
                string jwtToken = context.Request.Headers["Authorization"].ToString();
                if (!string.IsNullOrEmpty(jwtToken))
                    jwtToken = jwtToken.Replace("Bearer ", string.Empty);
                string? jwtLogout = _memoryCache.Get(jwtToken)?.ToString();
                if (jwtLogout == "Logout")
                    throw new UnauthorizedException("Authentication Failed.");
                //var accessToken = context.Request.Query["access_token"];
                //context.Token = accessToken;
                //if (!string.IsNullOrEmpty(accessToken) &&
                //    context.HttpContext.Request.Path.StartsWithSegments("/notifications"))
                //{
                //    // Read the token out of the query string
                //    context.Token = accessToken;
                //}

                return Task.CompletedTask;
            }
        };
    }
}