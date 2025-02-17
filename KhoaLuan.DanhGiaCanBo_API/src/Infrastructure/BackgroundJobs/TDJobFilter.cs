using System.Security.Claims;
using Finbuckle.MultiTenant;
using TD.DanhGiaCanBo.Infrastructure.Common;
using TD.DanhGiaCanBo.Shared.Multitenancy;
using Hangfire.Client;
using Hangfire.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using TD.DanhGiaCanBo.Infrastructure.Multitenancy;

namespace TD.DanhGiaCanBo.Infrastructure.BackgroundJobs;

public class TDJobFilter : IClientFilter
{
    private static readonly ILog Logger = LogProvider.GetCurrentClassLogger();

    private readonly IServiceProvider _services;

    public TDJobFilter(IServiceProvider services) => _services = services;

    public void OnCreating(CreatingContext context)
    {
        try
        {

            ArgumentNullException.ThrowIfNull(context, nameof(context));

            string recurringJobId = context.GetJobParameter<string>("RecurringJobId");
            if (!string.IsNullOrEmpty(recurringJobId))
            {
                string tenantIdName = recurringJobId.Split('-')[0];

                context.SetJobParameter(MultitenancyConstants.TenantIdName, tenantIdName);
            }
            else
            {
                using var scope = _services.CreateScope();

                var httpContext = scope.ServiceProvider.GetRequiredService<IHttpContextAccessor>()?.HttpContext;
                _ = httpContext ?? throw new InvalidOperationException("Can't create a TenantJob without HttpContext.");

                var tenantInfo = scope.ServiceProvider.GetRequiredService<ITenantInfo>();
                context.SetJobParameter(MultitenancyConstants.TenantIdName, tenantInfo);

                string? userId = httpContext.User.GetUserId();
                context.SetJobParameter(QueryStringKeys.UserId, userId);
            }

            Logger.InfoFormat("Set TenantId and UserId parameters to job {0}.{1}...", context.Job.Method.ReflectedType?.FullName, context.Job.Method.Name);

        } catch (Exception ex) { }

        /*using var scope = _services.CreateScope();

        var httpContext = scope.ServiceProvider.GetRequiredService<IHttpContextAccessor>()?.HttpContext;
        _ = httpContext ?? throw new InvalidOperationException("Can't create a TenantJob without HttpContext.");

        var tenantInfo = scope.ServiceProvider.GetRequiredService<ITenantInfo>();
        context.SetJobParameter(MultitenancyConstants.TenantIdName, tenantInfo);

        string? userId = httpContext.User.GetUserId();
        context.SetJobParameter(QueryStringKeys.UserId, userId);*/
    }

    public void OnCreated(CreatedContext context) =>
        Logger.InfoFormat(
            "Job created with parameters {0}",
            context.Parameters.Select(x => x.Key + "=" + x.Value).Aggregate((s1, s2) => s1 + ";" + s2));
}