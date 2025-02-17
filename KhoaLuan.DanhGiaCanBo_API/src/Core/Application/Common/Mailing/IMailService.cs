using TD.DanhGiaCanBo.Application.Common.ServiceLogger;

namespace TD.DanhGiaCanBo.Application.Common.Mailing;

public interface IMailService : ITransientService, IEnableServiceLogger
{
    Task SendAsync(MailRequest request, CancellationToken ct);
    string FormatContentWithEntity(object entity, string content);
}