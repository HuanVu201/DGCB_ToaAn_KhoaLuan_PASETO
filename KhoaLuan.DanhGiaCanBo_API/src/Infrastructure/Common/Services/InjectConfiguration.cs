using Microsoft.Extensions.Configuration;
using TD.DanhGiaCanBo.Application.Common.Interfaces;

namespace TD.DanhGiaCanBo.Infrastructure.Common.Services;
public class InjectConfiguration : IInjectConfiguration
{
    private readonly IConfiguration _configuration;
    public InjectConfiguration(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public T? GetValue<T>(string key)
    {
        return _configuration.GetValue<T>(key);
    }
}
