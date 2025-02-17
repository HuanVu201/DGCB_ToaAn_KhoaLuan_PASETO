using Microsoft.Extensions.Options;
using SelectPdf;
using SelectPdf;
using DocumentFormat.OpenXml.VariantTypes;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.IO;
using System.Net.NetworkInformation;
using TD.DanhGiaCanBo.Host.Controllers;
using TD.DanhGiaCanBo.Infrastructure.Minio;
using TD.DanhGiaCanBo.Application.Common.Minio;
using TD.DanhGiaCanBo.Application.Catalog.FileApp.Commands;
using TD.DanhGiaCanBo.Application.Catalog.FileApp;
namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class FileController : VersionedApiController
{
    private readonly MinioSettings _minioSettings;
    private readonly IMinioService _minioService;
    private readonly string? _access_file_key;
    private readonly string? _public_api;
    private readonly string? _domain_name;
    private readonly string? FileUploadLocalPath;

    public FileController(IOptions<MinioSettings> settings, IMinioService minioService, IConfiguration configuration)
    {
        _minioSettings = settings.Value;
        _minioService = minioService;
        _access_file_key = configuration.GetValue<string>("FileConfig:ACCESS_FILE_KEY");
        _public_api = configuration.GetValue<string>("FileConfig:PUBLIC_API_GET_FILE");
        _domain_name = configuration.GetValue<string>("FileConfig:DOMAIN_NAME");
        FileUploadLocalPath = configuration.GetValue<string>("FileConfig:FileUploadLocalPath");
    }

    [Authorize]
    [HttpPost("UploadFile")]
    [OpenApiOperation("Tải lên tệp, ảnh ", "")]
    public async Task<ActionResult> UploadFile([FromForm] UploadFileCommand req)
    {
        try
        {
            req.FileUploadLocalPath = FileUploadLocalPath;
            var res = await Mediator.Send(req);
            if (res.Succeeded)
                return Ok(res);
            return BadRequest(res.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("RemoveFile")]
    [OpenApiOperation("Xóa tệp, ảnh", "")]
    public async Task<ActionResult> RemoveFile([FromBody] RemoveFileCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            if (res.Succeeded)
                return Ok(res);
            return BadRequest(res.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("UploadFileBucket")]
    [OpenApiOperation("Tải lên tệp, ảnh", "")]
    public async Task<ActionResult<Result<string>>> UploadFileMinio([FromForm] UploadFileCommand req)
    {
        try
        {
            string res = await _minioService.UploadFileAsync(req.Files, _minioSettings.BucketName, req.FolderName);
            return Ok(Result<string>.Success(data: res));
        }
        catch (FileFormatException ex)
        {
            return StatusCode(400, Result<string>.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("UploadFileAsBase64")]
    [OpenApiOperation("Tải lên tệp, ảnh", "")]
    public async Task<ActionResult<Result<string>>> UploadFileAsBase64([FromBody] UploadFileAsBase64Command req)
    {
        try
        {
            string res = await _minioService.UploadFileAsBase64Async(req.Data, req.FileName, _minioSettings.BucketName, req.FolderName);
            return Ok(Result<string>.Success(data: res));
        }
        catch (FileFormatException ex)
        {
            return StatusCode(400, Result<string>.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("UploadPdfBucket")]
    [OpenApiOperation("Tải lên file pdf với đầu vào là base64 (docx)", "")]
    public async Task<ActionResult<Result<string>>> UploadPdfBucket([FromBody] UploadFileAsBase64Command req)
    {
        try
        {
            string res = await _minioService.UploadFileDocxAsPdfAsync(req.Data, req.FileName, _minioSettings.BucketName, req.FolderName);
            return Ok(Result<string>.Success(data: res));
        }
        catch (FileFormatException ex)
        {
            return StatusCode(400, Result<string>.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("GetSignatureData")]
    [OpenApiOperation("Tải lên file pdf với đầu vào là base64 (docx)", "")]
    public async Task<ActionResult> GetSignatureData([FromBody] GetSignatureData req)
    {
        try
        {
            var data = await _minioService.GetSignatureData(req.FilePath);
            return Ok(data);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    //[Authorize]
    //[HttpPost("UploadPdfBucketAsStream")]
    //[OpenApiOperation("Tải lên file pdf với đầu vào là BlobDocx trả về blobPdf", "")]
    //public async Task<ActionResult<Stream>> UploadFileWithBlobDocxReturnBlobPdfAsync([FromForm] UploadFileAsStreamCommand req)
    //{
    //    try
    //    {
    //        using var stream = req.Data.OpenReadStream();
    //        var res = await _minioService.UploadFileWithBlobDocxReturnBlobPdfAsync(stream, req.FileName, _minioSettings.BucketName, req.FolderName,
    //           req.AddGTHS, req.MaHoSo, req.LoaiGiayTo, req.NguoiXuatPhieu, req.NgayXuatPhieu, req.MaGiayTo);
    //        Response.Headers.Append("Content-Type", res.ContentType);
    //        return Ok(res.StreamData);
    //    }
    //    catch (FileFormatException ex)
    //    {
    //        return StatusCode(400, Result<string>.Fail(ex.Message));
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(500, ex.Message);
    //    }
    //}


    [Authorize]
    [HttpPost("RemoveFileBucket")]
    [OpenApiOperation("xóa tệp, ảnh", "")]
    public async Task<ActionResult<string>> RemoveFileMinio([FromBody] RemoveFileCommand req)
    {
        try
        {
            await _minioService.RemoveFileByKeyAsync(_minioSettings.BucketName, req.Path);
            return Ok(Result<string>.Success(data: "Xóa file thành công"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("GetPublicFile")]
    [OpenApiOperation("lấy tệp, ảnh", "")]
    public async Task<ActionResult<Stream>> GetPublicFileMinio([FromQuery] GetPublicFileRequest req)
    {
        try
        {
            if (_access_file_key != req.AccessKey)
            {
                return StatusCode(403);
            }

            var data = await _minioService.GetFileByKeyAsync(_minioSettings.BucketName, req.Path);
            Response.Headers.Append("Content-Type", data.ContentType);
            return data.StreamData;
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [AllowAnonymous]
    [HttpGet("GetPublicFileSLD")]
    [OpenApiOperation("lấy tệp, ảnh", "")]
    public async Task<ActionResult<Stream>> GetPublicFileSLD([FromQuery] GetPublicFileSLDRequest req)
    {
        try
        {
            var data = await _minioService.GetFileByKeyAsync(_minioSettings.BucketName, req.Path);
            Response.Headers.Append("Content-Type", data.ContentType);
            return data.StreamData;
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("GetFileBucket")]
    [OpenApiOperation("lấy tệp, ảnh", "")]
    public async Task<ActionResult<Stream>> GetFileMinio([FromQuery] string Path)
    {
        try
        {
            var data = await _minioService.GetFileByKeyAsync(_minioSettings.BucketName, Path);
            Response.Headers.Append("Content-Type", data.ContentType);
            return data.StreamData;
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpGet("GetFileStream")]
    [OpenApiOperation("GetFileStream", "")]
    public async Task<IActionResult> GetFileStream([FromQuery] string Path)
    {
        try
        {
            var fileRes = await _minioService.GetFileByKey2Async(_minioSettings.BucketName, Path);
            //Response.ContentType = fileRes.ContentType;
            //Response.Headers.Add("content-disposition", "attachment; filename=" + fileRes.FileName);
            //Response.Body.WriteByte(fileRes.BytesRes[0]);
            //Response.StatusCode = 200;
            return File(fileRes.ByteRes, fileRes.ContentType, fileRes.FileName);
        }
        catch (Exception ex)
        {
            return NotFound(ex.ToString());
        }

    }

    [AllowAnonymous]
    [HttpGet("GetFilePublicStream")]
    [OpenApiOperation("GetFilePublicStream", "")]
    public async Task<IActionResult> GetFilePublicStream([FromQuery] string Path)
    {
        try
        {
            var fileRes = await _minioService.GetFileByKey2Async(_minioSettings.BucketName, Path);
            //Response.ContentType = fileRes.ContentType;
            //Response.Headers.Add("content-disposition", "attachment; filename=" + fileRes.FileName);
            //Response.Body.WriteByte(fileRes.BytesRes[0]);
            //Response.StatusCode = 200;
            return File(fileRes.ByteRes, fileRes.ContentType, fileRes.FileName);
        }
        catch (Exception ex)
        {
            return NotFound(ex.ToString());
        }

    }

    [Authorize]
    [HttpGet("AddPagePDF")]
    [OpenApiOperation("lấy tệp, ảnh", "")]
    public async Task<ActionResult<Stream>> AddPagePDF([FromQuery] string Path)
    {
        try
        {
            var data = await _minioService.AddPagePDF(_minioSettings.BucketName, Path);
            Response.Headers.Append("Content-Type", data.ContentType);
            return data.StreamData;
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("ConvertDocxToPdf")]
    [OpenApiOperation("nhận tệp docx và chuyển thành stream pdf", "")]
    public ActionResult<Stream> ConvertDocxFileToPdf([FromBody] WordToPdfReq req)
    {
        try
        {
            var data = _minioService.DocToPdf(req.data, req.fileName);
            Response.Headers.Append("Content-Type", data.ContentType);
            return data.StreamData;
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("ConvertHtmlStringToPdf")]
    [OpenApiOperation("nhận htmlString và chuyển thành stream pdf", "")]
    public ActionResult<Stream> ConvertHtmlToPdf([FromBody] HtmlStringToPdfReq req)
    {
        try
        {
            HtmlToPdf oHtmlToPdf = new HtmlToPdf();
            PdfDocument oPdfDocument = oHtmlToPdf.ConvertHtmlString(req.htmlString);
            byte[] pdf = oPdfDocument.Save();
            oPdfDocument.Close();
            return File(pdf, "application/pdf", req.fileName);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("VerifyDigitalSignature")]
    [OpenApiOperation("Kiểm tra xem 1 file pdf có được ký số hay chưa", "")]
    public async Task<ActionResult> VerifyDigitalSignature([FromBody] VerifyDigitalSignatureReq req)
    {
        try
        {
            var data = await _minioService.VerifyPdfSignatureITextSharp(req.filePaths, req.breakIfHasSignedFile);
            return Ok(Result<VerifyDigitalSinatureResponse>.Success(data: data));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


}
