using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Infrastructure.Middleware;
public class DomainRestrictMiddleware
{
    private readonly RequestDelegate next;
    private readonly IConfiguration config;
    private readonly string domainRestrict;
    public DomainRestrictMiddleware(RequestDelegate next, IConfiguration config)
    {
        this.next = next;
        this.config = config;
        this.domainRestrict = config.GetSection("domainRestrict").Value != null ? config.GetSection("domainRestrict").Value : "motcua.thanhhoa.gov.vn";
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Host.Host.Contains(domainRestrict))
        {
            string authHeader = context.Request.Headers["Authorization"];
            if (!string.IsNullOrEmpty(authHeader))
            {
                try
                {
                    JwtSecurityToken jwtSecurityToken = new JwtSecurityToken(authHeader);
                    var jwtPayLoad = jwtSecurityToken.Payload;
                    if (jwtPayLoad.TryGetValue("typeUser", out object? typeUser))
                    {
                        if (typeUser.ToString() == "CongDan")
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                            await context.Response.WriteAsync("503 Forbidden");
                        }
                    }
                }
                catch
                {
                }

                await next.Invoke(context);
            }
            else
            {
                await next.Invoke(context);
            }
        }
        else
        {
            await next.Invoke(context);
        }
    }
}
