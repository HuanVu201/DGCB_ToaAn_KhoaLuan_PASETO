using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TD.DanhGiaCanBo.Infrastructure.Zalo;

internal static class StartUp
{
    internal static IServiceCollection AddZalo(this IServiceCollection services, IConfiguration configuration)
    {
        return services.Configure<ZaloSetting>(configuration.GetSection(nameof(ZaloSetting)));
    }
}
