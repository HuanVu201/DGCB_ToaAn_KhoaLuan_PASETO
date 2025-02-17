using TD.DanhGiaCanBo.Application.Catalog.ConfigApp;
using TD.DanhGiaCanBo.Application.Common.ServiceLogger;

namespace TD.DanhGiaCanBo.Application.Common.Zalo;
public interface IZaloService : ITransientService, IEnableServiceLogger
{
    public Task SendTextAsync(ZaloRequest zaloRequest, CancellationToken cancellationToken);
    public Task SendTemplateAsync(SendTemplateZalo zaloRequest, CancellationToken cancellationToken);
    public Task RefreshTokenZalo();
    string GetZaloCtaLink(string path);
    public Task SendTemplateOrTextAsync(ZaloRequest zaloRequest, SendTemplateZalo sendTemplateZalo, CancellationToken cancellationToken);

}
