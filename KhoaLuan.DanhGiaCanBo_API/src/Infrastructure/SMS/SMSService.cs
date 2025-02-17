using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using TD.DanhGiaCanBo.Application.Common.Extensions;
using TD.DanhGiaCanBo.Application.Common.ServiceLogger;
using TD.DanhGiaCanBo.Application.Common.Sms;
using TD.DanhGiaCanBo.Infrastructure.Zalo;

namespace TD.DanhGiaCanBo.Infrastructure.SMS;
public class SMSService : ISMSService
{
    private readonly SMSSettings _settings;
    private readonly IServiceLogger _serviceLogger;
    public SMSService(IOptions<SMSSettings> settings, IServiceLogger serviceLogger)
    {
        _settings = settings.Value;
        _serviceLogger = serviceLogger;
    }

    public string getPhoneNumberType(string phoneNumber)
    {
        var dauso = string.Empty;
        if (!string.IsNullOrEmpty(phoneNumber) && phoneNumber.Length > 3)
        {
            dauso = phoneNumber.Substring(0, 3);
        }
        string resultIsViettel = _settings.Viettel.FirstOrDefault(x => x == dauso);
        if(resultIsViettel != null)
            return "Viettel";
        string resultIsVina = _settings.VinaPhone.FirstOrDefault(x => x == dauso);
        if (resultIsViettel != null)
            return "Vina";
        return "Mobifone";
    }

    public async Task SendAsync(SMSRequest request, CancellationToken ct)
    {
        if (string.IsNullOrEmpty(_settings.UrlSendMessage))
        {
            return;
        }
        using (var httpClient = new HttpClient())
        {
            try
            {
                request.maPhanMem = "DVC";
                request.idMauTin = _settings.TemplateId;
                request.gioGui = DateTime.Now.ToString();
                request.nhaMang = getPhoneNumberType(request.soDienThoai);
                request.noiDungthamSo = request.noiDungthamSo.RemoveDiacritics();
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _settings.TokenSendMessage);
                var res = await httpClient.PostAsJsonAsync(_settings.UrlSendMessage, request);
                await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams() {
                    MaHoSo = request.MaHoSo,
                    isSucceed = res.IsSuccessStatusCode,
                    Receiver = request.soDienThoai,
                    Sender = null,
                    Request = JsonConvert.SerializeObject(request),
                    Response = res.IsSuccessStatusCode ? "Success" : JsonConvert.SerializeObject(res),
                    Service = ServiceLoggerServiceType.SMS,
                });
            }
            catch (Exception ex)
            {
                await _serviceLogger.LogAsync<SMSService>(new ServiceLoggerRequestParams()
                {
                    MaHoSo = request.MaHoSo,
                    isSucceed = false,
                    Receiver = request.soDienThoai,
                    Sender = null,
                    Request = JsonConvert.SerializeObject(request),
                    Response = JsonConvert.SerializeObject(ex),
                    Service = ServiceLoggerServiceType.SMS,
                });
            }
        }
    }
}
