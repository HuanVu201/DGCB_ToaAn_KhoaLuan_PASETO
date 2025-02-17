using TD.DanhGiaCanBo.Infrastructure.Common;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace TD.DanhGiaCanBo.Infrastructure.BackgroundJobs.RecurringJobs.Initialization;

internal static class Startup
{
    internal static IServiceCollection AddRecurringBackgroundJobs(this IServiceCollection services)
    {
        services.AddServices(typeof(IRecurringJobInitialization), ServiceLifetime.Transient);
        return services;
    }
}