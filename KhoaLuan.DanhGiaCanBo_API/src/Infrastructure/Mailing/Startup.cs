using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TD.DanhGiaCanBo.Infrastructure.Mailing;

internal static class Startup
{
    internal static IServiceCollection AddMailing(this IServiceCollection services, IConfiguration config)
    {
        return services.Configure<MailSettingsList>(config.GetSection(nameof(MailSettingsList)));
    }
}