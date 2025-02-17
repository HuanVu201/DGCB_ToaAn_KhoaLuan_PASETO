using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Serilog;
using TD.DanhGiaCanBo.Application;
using TD.DanhGiaCanBo.Host.Configurations;
using TD.DanhGiaCanBo.Host.Controllers;
using TD.DanhGiaCanBo.Infrastructure;
using TD.DanhGiaCanBo.Infrastructure.BackgroundJobs;
using TD.DanhGiaCanBo.Infrastructure.Common;
using TD.DanhGiaCanBo.Infrastructure.Logging.Serilog;

[assembly: ApiConventionType(typeof(TDApiConventions))]

StaticLogger.EnsureInitialized();
Log.Information("Server Booting Up...");
try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.AddConfigurations().RegisterSerilog();
    builder.Services.AddControllersWithViews();
    builder.Services.AddInfrastructure(builder.Configuration);
    builder.Services.AddApplication();

    builder.Services.AddSpaStaticFiles(c =>
    {
        c.RootPath = "ClientApp";
    });

    FirebaseApp.Create(new AppOptions()
    {
        Credential = GoogleCredential.FromFile(Path.Combine(Directory.GetCurrentDirectory(), "Configurations", "firebase_admin_sdk.json"))
    });

    var app = builder.Build();

    await app.Services.InitializeDatabasesAsync();

    app.UseInfrastructure(builder.Configuration);
    app.UseStaticFiles();
    app.UseSpaStaticFiles();

    app.UseSpa(spa =>
    {
        spa.Options.SourcePath = "ClientApp";
    });

    app.MapEndpoints();

    var settings = builder.Configuration.GetSection(nameof(HangfireSettings)).Get<HangfireSettings>();
    if (settings.Enable is true)
    {
        var hangfireService = new HangfireService();
        if (settings.EnableJobsDefault is true)
        {

        }
    }

    app.Run();
}
catch (Exception ex) when (!ex.GetType().Name.Equals("HostAbortedException", StringComparison.Ordinal))
{
    StaticLogger.EnsureInitialized();
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    StaticLogger.EnsureInitialized();
    Log.Information("Server Shutting down...");
    Log.CloseAndFlush();
}