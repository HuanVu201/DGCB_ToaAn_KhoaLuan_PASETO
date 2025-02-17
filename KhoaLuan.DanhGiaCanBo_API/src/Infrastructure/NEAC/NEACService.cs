using TD.DanhGiaCanBo.Application.Common.NEAC;
using System.Net.Http.Headers;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using Newtonsoft.Json;
using System.Text;
using TD.DanhGiaCanBo.Application.Common.Minio;
using TD.DanhGiaCanBo.Application.Common.Models;

namespace TD.DanhGiaCanBo.Infrastructure.NEAC;
public class NEACService : INEACService
{
    private readonly NEACSetting _setting;
    private readonly IMinioService _minioService;
    public NEACService(IOptions<NEACSetting> options, IMinioService minioService)
    {
        _setting = options.Value;
        _minioService = minioService;
    }
    private async Task<TRes> RequestHandler<TReq, TRes>(TReq req, string suffix)
    {
        if (string.IsNullOrEmpty(_setting.UrlBase))
        {
            return default(TRes);
        }
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if (!string.IsNullOrEmpty(_setting.BearerToken))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _setting.BearerToken);
            }

            HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Post, _setting.UrlBase + "/" + suffix);
            var reqContent = JsonConvert.SerializeObject(req);
            httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

            var res = await httpClient.SendAsync(httpRequest);
            var stringContent = await res.Content.ReadAsStringAsync();
            var jsonData = JsonConvert.DeserializeObject<TRes>(stringContent);
            return jsonData;
        }
    }
    public async Task<NEACGetCertificateResponse?> GetCertificate(NEACGetCertificateRequest req)
    {
        return await RequestHandler<NEACGetCertificateRequest, NEACGetCertificateResponse>(req, "get_certificate");
    }

    public async Task<Result<string>?> SignFile(NEACSignFileRequest req)
    {
        var res = await RequestHandler<NEACSignFileRequest, NEACSignFileResponseWrapper>(req, "sign_file");
        if(res.data.signFiles.Count == 0)
        {
            throw new Exception("Ký số thất bại");
        }
        var signFile = res.data.signFiles[0];
        var file = await _minioService.UploadFileAsBase64Async(signFile.file_base64, signFile.file_name, null, "KySoNeac");
        if (string.IsNullOrEmpty(file))
        {
            return Result<string>.Fail("Tải tệp mới thất bại");
        }
        return Result<string>.Success(data: file);
    }
}
