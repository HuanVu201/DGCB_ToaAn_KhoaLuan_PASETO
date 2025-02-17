using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using System.Runtime.CompilerServices;
using TD.DanhGiaCanBo.Infrastructure.Auth;
using TD.DanhGiaCanBo.Infrastructure.BackgroundJobs;
using TD.DanhGiaCanBo.Infrastructure.Caching;
using TD.DanhGiaCanBo.Infrastructure.Common;
using TD.DanhGiaCanBo.Infrastructure.Cors;
using TD.DanhGiaCanBo.Infrastructure.FileStorage;
using TD.DanhGiaCanBo.Infrastructure.Ldap;
using TD.DanhGiaCanBo.Infrastructure.Localization;
using TD.DanhGiaCanBo.Infrastructure.Mailing;
using TD.DanhGiaCanBo.Infrastructure.Mapping;
using TD.DanhGiaCanBo.Infrastructure.Middleware;
using TD.DanhGiaCanBo.Infrastructure.Minio;
using TD.DanhGiaCanBo.Infrastructure.Multitenancy;
using TD.DanhGiaCanBo.Infrastructure.Notifications;
using TD.DanhGiaCanBo.Infrastructure.OpenApi;
using TD.DanhGiaCanBo.Infrastructure.Persistence;
using TD.DanhGiaCanBo.Infrastructure.Persistence.Initialization;
using TD.DanhGiaCanBo.Infrastructure.SecurityHeaders;
using TD.DanhGiaCanBo.Infrastructure.SMS;
using TD.DanhGiaCanBo.Infrastructure.Validations;
using TD.DanhGiaCanBo.Infrastructure.Zalo;

[assembly: InternalsVisibleTo("Infrastructure.Test")]

namespace TD.DanhGiaCanBo.Infrastructure;

public static class Startup
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("Mgo+DSMBMAY9C3t2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5bd0xhW31bcHJXRmBV");
        var applicationAssembly = typeof(TD.DanhGiaCanBo.Application.Startup).GetTypeInfo().Assembly;
        MapsterSettings.Configure();
        return services
            .AddApiVersioning()
            .AddAuth(config)
            .AddBackgroundJobs(config)
            .AddCaching(config)
            .AddCorsPolicy(config)
            .AddExceptionMiddleware()
            .AddBehaviours(applicationAssembly)
            .AddHealthCheck()
            .AddPOLocalization(config)
            .AddMailing(config)
            .AddSMS(config)
            .AddZalo(config)
            .AddSyncfusionReport(config)
            .AddMinio(config)
            .AddLdap(config)
            .AddMediatR(Assembly.GetExecutingAssembly())
            .AddMultitenancy()
            .AddNotifications(config)
            .AddOpenApiDocumentation(config)
            .AddPersistence()
            .AddRequestLogging(config)
            .AddCommon(config)
            .AddRouting(options => options.LowercaseUrls = true)
            .AddHttpClient()
            .AddServices();
    }

    private static IServiceCollection AddApiVersioning(this IServiceCollection services) =>
        services.AddApiVersioning(config =>
        {
            config.DefaultApiVersion = new ApiVersion(1, 0);
            config.AssumeDefaultVersionWhenUnspecified = true;
            config.ReportApiVersions = true;
        }).Services;

    private static IServiceCollection AddHealthCheck(this IServiceCollection services) =>
        services.AddHealthChecks().AddCheck<TenantHealthCheck>("Tenant").Services;

    public static async Task InitializeDatabasesAsync(this IServiceProvider services, CancellationToken cancellationToken = default)
    {
        // Create a new scope to retrieve scoped services
        using var scope = services.CreateScope();
        
        await scope.ServiceProvider.GetRequiredService<IDatabaseInitializer>()
            .InitializeDatabasesAsync(cancellationToken);
    }

    public static IApplicationBuilder UseInfrastructure(this IApplicationBuilder builder, IConfiguration config) =>
        builder
            .UseRequestLocalization()
            .UseStaticFiles()
            .UseSecurityHeaders(config)
            .UseFileStorage()
            .UseExceptionMiddleware()
            .UseRouting()
            .UseCorsPolicy()
            .UseAuthentication()
            .UseCurrentUser()
            .UseMultiTenancy()
            .UseAuthorization()
            .UseRequestLogging(config)
            .UseHangfireDashboard(config)
            .UseOpenApiDocumentation(config);

    public static IEndpointRouteBuilder MapEndpoints(this IEndpointRouteBuilder builder)
    {
        builder.MapControllers().RequireAuthorization();
        builder.MapHealthCheck();
        builder.MapNotifications();
        builder.MapServerStatus();
        return builder;
    }

    private static IEndpointConventionBuilder MapHealthCheck(this IEndpointRouteBuilder endpoints) =>
        endpoints.MapHealthChecks("/api/health");
}