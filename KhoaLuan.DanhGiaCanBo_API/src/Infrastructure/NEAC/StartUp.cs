using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TD.DanhGiaCanBo.Infrastructure.NEAC;
internal static class StartUp
{
    internal static IServiceCollection AddNEAC(this IServiceCollection services, IConfiguration config)
    {
        return services.Configure<NEACSetting>(config.GetSection(nameof(NEACSetting)));
    }
}
