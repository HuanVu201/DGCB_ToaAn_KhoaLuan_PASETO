
namespace TD.DanhGiaCanBo.Application.Common.NEAC;
public interface INEACService : ITransientService
{
    Task<NEACGetCertificateResponse?> GetCertificate(NEACGetCertificateRequest req);
    Task<Result<string>?> SignFile(NEACSignFileRequest req);
}
