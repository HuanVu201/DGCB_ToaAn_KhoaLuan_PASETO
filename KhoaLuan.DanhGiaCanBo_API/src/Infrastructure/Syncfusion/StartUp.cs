using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

internal static class Startup
{
    internal static IServiceCollection AddSyncfusionReport(this IServiceCollection services, IConfiguration config)
    {

        Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("Mgo+DSMBMAY9C3t2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5bd0xhW31bcHJXRmBV");
        return services;
    }
}
