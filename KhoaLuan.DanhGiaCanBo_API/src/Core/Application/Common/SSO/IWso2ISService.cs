using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Common.SSO;
public interface IWso2ISService : ITransientService
{
    public Task<string?> GetTokenAsync(string userName, string? ipAddress, string? device = null);
}

