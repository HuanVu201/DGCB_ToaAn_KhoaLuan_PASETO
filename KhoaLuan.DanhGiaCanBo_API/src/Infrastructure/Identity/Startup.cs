using TD.DanhGiaCanBo.Infrastructure.Persistence.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using TD.DanhGiaCanBo.Infrastructure.Identity.CustomManager;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;

internal static class Startup
{
    internal static IServiceCollection AddIdentity(this IServiceCollection services) =>
        services
            .AddIdentity<ApplicationUser, ApplicationRole>(options =>
                {
                    options.Password.RequiredLength = 6;
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.User.RequireUniqueEmail = false;
                    options.Lockout.AllowedForNewUsers = false;
                })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddUserManager<CustomUserManager>()
            .AddDefaultTokenProviders()
            .Services;
}