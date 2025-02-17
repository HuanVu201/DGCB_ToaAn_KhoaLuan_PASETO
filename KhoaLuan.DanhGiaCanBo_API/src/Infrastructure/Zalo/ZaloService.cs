using Azure.Core;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using TD.DanhGiaCanBo.Application.Catalog.ConfigApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Common.ServiceLogger;
using TD.DanhGiaCanBo.Application.Common.Zalo;
using TD.DanhGiaCanBo.Infrastructure.Persistence.Repository;
using TD.DanhGiaCanBo.Infrastructure.SMS;

namespace TD.DanhGiaCanBo.Infrastructure.Zalo;
public class ZaloService : IZaloService
{
    private readonly ZaloSetting _settings;
    private readonly IDapperRepository _dapperRepository;
    private readonly IServiceLogger _serviceLogger;
    private readonly bool usingZaloTemplate = false;

    public ZaloService(IOptions<ZaloSetting> settings, IDapperRepository dapperRepository, IServiceLogger serviceLogger, IConfiguration configuration)
    {
        _settings = settings.Value;
        _dapperRepository = dapperRepository;
        _serviceLogger = serviceLogger;
        usingZaloTemplate = configuration.GetValue<bool>("ZaloSetting:usingTemplate");
    }
    public async Task SendTemplateOrTextAsync(ZaloRequest zaloRequest, SendTemplateZalo sendTemplateZalo, CancellationToken cancellationToken)
    {
        if (!_settings.enable)
        {
            return;
        }
        if (usingZaloTemplate)
        {
            sendTemplateZalo.CtaLink = GetZaloCtaLink(sendTemplateZalo.CtaLink);
            await SendTemplateAsync(sendTemplateZalo, cancellationToken);
        } else
        {
            await SendTextAsync(zaloRequest, cancellationToken);
        }
    }

    public async Task RefreshTokenZalo()
    {
        if(_settings.enableRefreshToken == false)
        {
            return;
        }
        var zaloToken = await GetToken();
        var sqlUpdateToken = $"UPDATE Catalog.Configs SET Content=@Content Where Code='{_settings.maCauHinh}'";
        using (var httpClient = new HttpClient())
        {
            try
            {
                string jsonContent = $"refresh_token={zaloToken.refresh_token}";
                jsonContent += $"&app_id={_settings.appId}";
                jsonContent += "&grant_type=refresh_token";
                HttpContent content = new StringContent(jsonContent, Encoding.UTF8, "application/x-www-form-urlencoded");

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, _settings.urlZaloGetToken);
                request.Headers.Add("secret_key", _settings.secretKey);
                request.Content = content;

                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                //var newZaloToken = JsonConvert.DeserializeObject<ZaloToken>(data);

                var updatedRow = await _dapperRepository.ExcuteAsync(sqlUpdateToken, new
                {
                    Content = data
                });
                if (updatedRow == 0)
                {
                    throw new Exception("Cập nhật mã token mới cho zalo thất bại");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }

    private async Task<ZaloToken?> GetToken()
    {
        string sqlGetZaloToken = $"SELECT Content FROM Catalog.Configs WHERE Code = '{_settings.maCauHinh}'";
        var data = await _dapperRepository.QueryFirstOrDefaultAsync<GetZaloConfigSelect>(sqlGetZaloToken);
        if (data == null)
        {
            return null;
        }
        return JsonConvert.DeserializeObject<ZaloToken>(data.Content);

    }
    private async Task HandleErrors(string ErrorMessage, ServiceLoggerRequestParams req)
    {
        req.Response = JsonConvert.SerializeObject(new
        {
            Message = ErrorMessage,
        });
        req.isSucceed = false;
        await _serviceLogger.LogAsync<ZaloService>(req);
    }
    private async Task HandleSuccess(ServiceLoggerRequestParams req)
    {
        req.Response = JsonConvert.SerializeObject(new
        {
            Message = "Success",
        });
        req.isSucceed = true;
        await _serviceLogger.LogAsync<ZaloService>(req);
    }

    private async Task<GetUserIdZaloResponse?> GetUser(string soDienThoaiChuHoSo, string access_token)
    {
        using (var httpClient = new HttpClient())
        {
            try
            {
                // Tạo nội dung yêu cầu với "Content-Type" là "application/json"
                string jsonContent = "{\"user_id\":\"" + soDienThoaiChuHoSo + "\"}";
                HttpContent content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, _settings.urlZaloGetUserAPI);
                request.Headers.Add("access_token", access_token);
                request.Content = content; // Đặt nội dung vào yêu cầu

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                var jsonData = JsonConvert.DeserializeObject<GetUserIdZaloResponse>(data);
                if (jsonData.error == 0)
                {
                    return jsonData;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }

    private async Task<int?> SendMessage(SendZalo sendZalo, string token)
    {
        using (var httpClient = new HttpClient())
        {
            try
            {

                //SendZalo zaloRequestParam = new SendZalo(new SendRecipient(userId), new SendMessage(noiDung));
                //ServicePointManager.SecurityProtocol = (SecurityProtocolType)768 | (SecurityProtocolType)3072;
                HttpContent content = new StringContent(JsonConvert.SerializeObject(sendZalo), Encoding.UTF8, "application/json");

                // Tạo một HttpRequestMessage và thêm "access_token"
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, _settings.urlZaloAPI);
                request.Headers.Add("access_token", token);
                request.Content = content; // Đặt nội dung vào yêu cầu

                // Sử dụng HttpClient để gửi yêu cầu
                HttpResponseMessage response = await httpClient.SendAsync(request);
                string data = await response.Content.ReadAsStringAsync();
                ZaloResponse jsonData = JsonConvert.DeserializeObject<ZaloResponse>(data);
                return jsonData.error;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
    private string getTotalFee(int lePhi, int phi)
    {
        string sotien;
        if (lePhi != 0)
        {
            if (lePhi != 0)
            {
                sotien = "Lệ phí " + lePhi + " đồng, Phí " + phi + " đồng";
            }
            else
            {
                sotien = "Lệ phí " + lePhi + " đồng";
            }
        }
        else
        {
            if (phi != 0)
            {
                sotien = "Phí " + phi + " đồng";
            }
            else
            {
                sotien = "Chưa nhập số tiền thu lệ phí, phí";
            }
        }
        return sotien;
    }

    public async Task SendTextAsync(ZaloRequest request, CancellationToken cancellationToken)
    {

        var zaloToken = await GetToken();
        ServiceLoggerRequestParams req = new ServiceLoggerRequestParams()
        {
            MaHoSo = request.MaHoSo,
            Receiver = request.soDienThoaiChuHoSo,
            Request = JsonConvert.SerializeObject(request),
            Service = ServiceLoggerServiceType.Zalo,
            Sender = null,
        };
        if (zaloToken == null)
        {
            await HandleErrors("Chưa có dữ liệu access_token", req);
            return;
        }
        var userData = await GetUser(request.soDienThoaiChuHoSo, zaloToken.access_token);
        if (userData == null)
        {
            await HandleErrors("Người nộp chưa quan tâm OA!", req);
            return;
        }
        SendZalo zaloRequestParam = new SendZalo(new SendRecipient(userData.data.user_id), new SendMessage(request.NoiDung));
        int? code = await SendMessage(zaloRequestParam, zaloToken.access_token);

        if (code != 0)
        {
            await HandleErrors("Có lỗi xảy ra khi gửi tin nhắn", req);
        }
        else
        {
            await HandleSuccess(req);
        }
    }

    public async Task SendTemplateAsync(SendTemplateZalo request, CancellationToken cancellationToken)
    {
        var zaloToken = await GetToken();
        ServiceLoggerRequestParams req = new ServiceLoggerRequestParams()
        {
            MaHoSo = request.MaHoSo,
            Receiver = request.SoDienThoai,
            Request = JsonConvert.SerializeObject(request),
            Service = ServiceLoggerServiceType.Zalo,
            Sender = null,
        };
        if (zaloToken == null)
        {
            await HandleErrors("Chưa có dữ liệu access_token", req);
            return;
        }
        var userData = await GetUser(request.SoDienThoai, zaloToken.access_token);
        if (userData == null)
        {
            await HandleErrors("Người nộp chưa quan tâm OA!", req);
            return;
        }
        SendZalo sendZalo = new SendZalo();
        sendZalo.recipient.user_id = userData.data.user_id;
        sendZalo.message.text = null;
        sendZalo.message.attachment = new SendAttachment();
        sendZalo.message.attachment.type = "template";
        sendZalo.message.attachment.payload = new SendPayload();
        sendZalo.message.attachment.payload.template_type = "business";
        sendZalo.message.attachment.payload.elements = new List<SendElement>();
        SendElement ele = new SendElement();
        ele.default_action = null;
        ele.template_id = _settings.idTemplateTraCuuHoSo;
        ele.template_data = new SendTemplateData();
        ele.template_data.banner = request.Banner != null ? request.Banner : _settings.urlBackgroundOA;
        ele.template_data.ten_nguoi_dan = request.TenNguoiDan;
        ele.template_data.ten_dich_vu = request.TenHoSo;
        ele.template_data.ma_ho_so = request.MaHoSo;
        //ele.template_data.cta_icon = "https://cdn4.iconfinder.com/data/icons/interactive-gesture-pack/99/Single_Tap-512.png";
        //ele.template_data.cta_link = "https://dichvucong.thanhhoa.gov.vn/portaldvc/KenhTin/thanh-toan.aspx?mahoso=" + "";
        //ele.template_data.cta_text = "Thanh toán phí, lệ phí";
        ele.template_data.cta_icon = request.CtaIcon ?? "https://cdn4.iconfinder.com/data/icons/interactive-gesture-pack/99/Single_Tap-512.png";
        ele.template_data.cta_link = request.CtaLink;
        ele.template_data.cta_text = request.CtaText;
        ele.template_data.trang_thai = request.TrangThai;
        ele.template_data.loi_nhan = request.LoiNhan;

        ele.payload = "callback_data";
        sendZalo.message.attachment.payload.elements.Add(ele);
        int? code = await SendMessage(sendZalo, zaloToken.access_token);
        if (code != 0)
        {
            await HandleErrors("Có lỗi xảy ra khi gửi tin nhắn", req);
        }
        else
        {
            await HandleSuccess(req);
        }
    }
    public string GetZaloCtaLink(string path)
    {
        string hostName = _settings.ctaLinkHostName;
        string newHostName = hostName.EndsWith("/") ? hostName : hostName + "/";
        return newHostName + path;
    }
}
