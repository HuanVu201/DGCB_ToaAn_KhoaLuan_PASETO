using TD.DanhGiaCanBo.Application.Common.Mailing;
using TD.DanhGiaCanBo.Application.Common.ServiceLogger;

namespace TD.DanhGiaCanBo.Application.Common.Sms;
public interface ISMSService: ITransientService, IEnableServiceLogger
{
    Task SendAsync(SMSRequest request, CancellationToken ct);
}
