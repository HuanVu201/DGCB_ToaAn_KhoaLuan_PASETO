using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Identity.Tokens;
public interface IPasetoTokenService : ITransientService
{
    Task<TokenResponse> GetTokenAsync(PasetoTokenRequest request, string ipAddress, CancellationToken cancellationToken, string? device = null);
    Task<TokenResponse> RefreshTokenAsync(RefreshTokenRequest request, string ipAddress);
}

