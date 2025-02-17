using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace TD.DanhGiaCanBo.Infrastructure.Middleware;
public class SwaggerApiKeyAuthMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _config;
    private string _apiKey;
    public SwaggerApiKeyAuthMiddleware(RequestDelegate next, IConfiguration config)
    {
        this._next = next;
        this._config = config;
        _apiKey = config.GetSection("Swagger:api_key").Value ?? "TDDVC@123";
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path.Value.Contains("/swagger"))
        {
            string authHeader = context.Request.Headers["api_key"].ToString();
            if (authHeader != _apiKey)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                await context.Response.WriteAsync("401 Unauthorized");
            }
            else
            {
                await _next.Invoke(context);
            }
        }
        else
        {
            await _next.Invoke(context);
        }
    }
}
