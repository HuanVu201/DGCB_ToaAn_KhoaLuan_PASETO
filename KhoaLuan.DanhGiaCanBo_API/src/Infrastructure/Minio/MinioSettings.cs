using Syncfusion.DocIO;
using TD.DanhGiaCanBo.Application.Common.Minio;

namespace TD.DanhGiaCanBo.Infrastructure.Minio;

public class MinioSettings
{
    public string? Endpoint { get; set; }

    public string? AccessKey { get; set; }
    public string? FontFamilyUrl { get; set; }
    public string? SecretKey { get; set; }
    public string? Region { get; set; }
    public bool CheckSignFile { get; set; }
    public string? SessionToken { get; set; }
    public string? BucketName { get; set; }
    public List<string>? BlockExtensions { get; set; }


}
public class WordToPdfReq
{
    public string data { get; set; }
    public string fileName { get; set; }
}

public class HtmlStringToPdfReq
{
    public string htmlString { get; set; }
    public string fileName { get; set; }
}

public class VerifyDigitalSignatureReq
{
    public IReadOnlyList<string> filePaths { get; set; }
    /// <summary>
    /// kiểm tra nếu có ký số 1 file thì dừng luôn
    /// </summary>
    public bool breakIfHasSignedFile { get; set; } = false;
}