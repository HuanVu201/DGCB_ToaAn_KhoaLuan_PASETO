using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TD.DanhGiaCanBo.Infrastructure.SMS;

internal static class StartUp
{
    internal static IServiceCollection AddSMS(this IServiceCollection services, IConfiguration config)
    {
        return services.Configure<SMSSettings>(config.GetSection(nameof(SMSSettings)));
    }
}
