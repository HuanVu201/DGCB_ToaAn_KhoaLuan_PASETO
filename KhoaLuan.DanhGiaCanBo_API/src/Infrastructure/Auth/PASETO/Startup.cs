using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Infrastructure.Identity;

namespace TD.DanhGiaCanBo.Infrastructure.Auth.PASETO;
internal static class Startup
{
    internal static IServiceCollection AddPasetoAuth(this IServiceCollection services)
    {
        services.AddOptions<PasetoSettings>()
            .BindConfiguration($"SecuritySettings:{nameof(PasetoSettings)}")
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.AddSingleton<PasetoTokenService>();

        return services
            .AddAuthentication(authentication =>
            {
                authentication.DefaultAuthenticateScheme = PasetoDefaults.AuthenticationScheme;
                authentication.DefaultChallengeScheme = PasetoDefaults.AuthenticationScheme;
            })
            .AddScheme<AuthenticationSchemeOptions, PasetoAuthenticationHandler>(PasetoDefaults.AuthenticationScheme, null)
            .Services;
    }
}