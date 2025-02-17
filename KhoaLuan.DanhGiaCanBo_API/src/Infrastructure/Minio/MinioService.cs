using iTextSharp.text.pdf;
using iTextSharp.text.pdf.security;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Minio;
using Minio.DataModel.Args;
using Newtonsoft.Json;
//using Tandan.OpenReport;
using Syncfusion.DocIO;
using Syncfusion.DocIO.DLS;
using Syncfusion.DocIORenderer;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Graphics;
using Syncfusion.Pdf.Parsing;
using Syncfusion.Pdf.Security;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Catalog.ConfigApp;
using TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Params;
using TD.DanhGiaCanBo.Application.Common.Classes;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Minio;
using TD.DanhGiaCanBo.Application.Common.Models;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Infrastructure.Common.Extensions;
using MinioExceptions = Minio.Exceptions;

namespace TD.DanhGiaCanBo.Infrastructure.Minio;
public class MinioService : IMinioService
{
    private readonly MinioSettings _settings;
    private readonly ILogger<MinioService> _logger;
    private readonly IConfigAppService _configAppService;
    private readonly IStringLocalizer _t;
    private readonly MinioClient _minioClient;
    private readonly ICurrentUser _currentUser;
    private readonly IMediator _mediator;
    private readonly bool _checkSignFile;

    public MinioService(ICurrentUser currentUser, IConfigAppService configAppService, IOptions<MinioSettings> settings, ILogger<MinioService> logger, IStringLocalizer<MinioService> localizer, IMediator mediator)
    {
        _t = localizer;
        _settings = settings.Value;
        _logger = logger;
        _minioClient = (MinioClient?)new MinioClient()
                              .WithEndpoint(_settings.Endpoint)
                              .WithCredentials(_settings.AccessKey, _settings.SecretKey)
                              //.WithSSL()
                              .Build();
        _configAppService = configAppService;
        _currentUser = currentUser;
        _mediator = mediator;
        _checkSignFile = settings.Value.CheckSignFile;
    }
    private class FileUploadConfig
    {
        public int size { get; set; }
        public List<string> accept { get; set; }
    }
    public async Task<ConfigFileUploadResponse> PostValidate(IFormFile data)
    {
        var fileExt = Path.GetExtension(data.FileName).Replace(".", "");
        var fileMimeType = MIMEAssistant.GetMIMEType(data.FileName);
        if (_settings.BlockExtensions.Contains(fileExt))
        {
            return new ConfigFileUploadResponse()
            {
                Description = $"Không được phép đính kèm định dạng tệp {fileExt}",
                Succeed = false,
            };
        }

        ConfigDto? configDto = await _configAppService.GetOrSetKey(ConfigConstant.FileConfig);
        if (configDto == null)
        {
            return new ConfigFileUploadResponse()
            {
                Description = "",
                Succeed = true,
            };
        }
        try
        {
            var content = JsonConvert.DeserializeObject<FileUploadConfig>(configDto.Content);
            long fileSizeInBytes = data.Length;
            // Chuyển đổi từ byte sang MB
            double fileSizeInMB = fileSizeInBytes / (1024.0 * 1024.0);

            if (content.size < fileSizeInMB)
            {
                return new ConfigFileUploadResponse()
                {
                    Description = $"Vui lòng đính kèm tệp nhỏ hơn {content.size}",
                    Succeed = false,
                };
            }
            if (content.accept.Count > 0 && !content.accept.Any(x => x.Contains(fileMimeType)))
            {
                return new ConfigFileUploadResponse()
                {
                    Description = $"Vui lòng đính kèm các tệp có định dạng {string.Join(", ", content.accept)}",
                    Succeed = false,
                };
            }
            return new ConfigFileUploadResponse()
            {
                Description = "",
                Succeed = true,
            };
        }
        catch (Exception ex)
        {
            return new ConfigFileUploadResponse()
            {
                Description = $"Xảy ra lỗi khi đọc cấu hình, vui lòng liên hệ quản trị hệ thống",
                Succeed = false,
            };
        }
    }
    public async Task<string> GetFileInExternalResource(string? url, object? body = null)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var res = await httpClient.PostAsJsonAsync(url, body);
            var data = await res.Content.ReadAsStringAsync();
            return data.Trim('"');
        }
    }
    public async Task<string> GetFileInExternalResourceByGetMethod(string? url)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            //httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var res = await httpClient.GetAsync(url);
            var data = await res.Content.ReadAsByteArrayAsync();
            string base64Data = Convert.ToBase64String(data);
            return base64Data;
        }
    }
    public async Task RemoveFilesByKeyAsync(string? bucketName, IReadOnlyList<string> keys)
    {
        if (string.IsNullOrEmpty(bucketName))
        {
            bucketName = _settings.BucketName;
        }
        var removeKeyList = keys.AsEnumerable().ToList();
        try
        {
            Task.WhenAll(removeKeyList.Select(key => RemoveFileByKeyAsync(bucketName, key)));
        }
        catch (Exception ex)
        {
            throw new Exception(ex.ToString());
        }
    }
    public IFormFile ConvertStreamToIFormFile(Stream stream, string fileName, string contentType = null)
    {
        //// Tạo một bộ đọc từ Stream
        //FormFile formFile;
        //using (var memoryStream = new MemoryStream())
        //{
        //    stream.CopyTo(memoryStream);
        //    memoryStream.Position = 0;

        //    // Tạo đối tượng IFormFile từ MemoryStream
        //    formFile = new FormFile(memoryStream, 0, memoryStream.Length, null, fileName)
        //    {
        //        Headers = new HeaderDictionary(),
        //        ContentType = contentType ?? "application/octet-stream", // Thay đổi kiểu nếu cần thiết
        //    };
        //}
        //return formFile;
        return new FormFile(stream, 0, stream.Length, null, fileName)
        {
            Headers = new HeaderDictionary(),
            ContentType = contentType ?? "application/octet-stream", // Thay đổi kiểu nếu cần thiết
        };
    }

    public IFormFile ConvertBase64ToIFormFile(string base64, string fileName)
    {
        byte[] bytes = Convert.FromBase64String(base64);
        var memoryStream = new MemoryStream(bytes);
        memoryStream.Position = 0;

        // Tạo đối tượng IFormFile từ MemoryStream
        var formFile = new FormFile(memoryStream, 0, memoryStream.Length, null, fileName)
        {
            Headers = new HeaderDictionary(),
            ContentType = MIMEAssistant.GetMIMEType(fileName) ?? "application/octet-stream", // Thay đổi kiểu nếu cần thiết
        };
        return formFile;
    }

    static bool IsWordDocument(string mimeType)
    {
        return mimeType.StartsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
               mimeType.StartsWith("application/msword");
    }
    static bool IsPdfDocument(string mimeType)
    {
        return mimeType.Contains("application/pdf");
    }

    public async Task<StreamDataFile> AddPagePDF(string? bucketName, string key)
    {
        var originFile = await GetFileByKeyAsync(bucketName, key);
        PdfLoadedDocument document = new PdfLoadedDocument(originFile.StreamData);
        PdfPageBase newPage = document.Pages.Add();
        FileStream fontStream = new FileStream(_settings.FontFamilyUrl, FileMode.Open, FileAccess.Read);
        PdfTrueTypeFont font = new PdfTrueTypeFont(fontStream, 14, PdfFontStyle.Bold);

        float margin = 25f;
        PdfStringFormat format = new PdfStringFormat();
        format.Alignment = PdfTextAlignment.Center;
        var positionName = "";
        var isPhoChuTich = positionName.StartsWith("phó chủ tịch");
        var isChuTich = positionName.StartsWith("chủ tịch");
        var isTruongPhong = positionName.StartsWith("trưởng phòng");
        var isPhoTruongPhong = positionName.StartsWith("phó trưởng phòng");
        string hoTen = _currentUser.GetUserFullName();
        string chucDanh = string.Empty;
        if (isPhoChuTich)
        {
            chucDanh = $" KT. CHỦ TỊCH\nPHÓ CHỦ TỊCH\n\n\n\n\n\n\n {hoTen}";
        }
        else if (isChuTich)
        {
            chucDanh = $"CHỦ TỊCH\n\n\n\n\n\n\n{hoTen}";
        }
        else if (isPhoTruongPhong)
        {
            chucDanh = $" KT. TRƯỞNG PHÒNG\nPHÓ TRƯỞNG PHÒNG\n\n\n\n\n\n\n {hoTen}";
        }
        else if (isTruongPhong)
        {
            chucDanh = $"TRƯỞNG PHÒNG\n\n\n\n\n\n\n{hoTen}";
        }
        Syncfusion.Drawing.SizeF chucDanhSize = font.MeasureString(chucDanh);
        float xChucDanhPosition = newPage.Size.Width - chucDanhSize.Width - margin * 2;
        float yChucDanhPosition = margin;

        PdfGraphics graphics = newPage.Graphics;
        graphics.DrawString(chucDanh, font, PdfBrushes.Black, new Syncfusion.Drawing.PointF(xChucDanhPosition, yChucDanhPosition), format);

        MemoryStream memoryStream = new MemoryStream();
        document.Save(memoryStream);
        memoryStream.Position = 0;
        return new StreamDataFile()
        {
            ContentType = originFile.ContentType,
            StreamData = memoryStream
        };
    }

    public async Task<Result<List<GetDataSignatureResponse>>> GetSignatureData(string filePath)
    {
        if (filePath == null)
        {
            return Result<List<GetDataSignatureResponse>>.Fail("Vui lòng truyền đường dẫn tệp");
        }
        if (!filePath.ToLower().EndsWith(".pdf"))
        {
            return Result<List<GetDataSignatureResponse>>.Fail("Vui lòng chọn tệp PDF muốn kiểm tra");
        }
        List<GetDataSignatureResponse> response = new List<GetDataSignatureResponse>();
        var data = await GetFileByKeyAsync(null, filePath);

        using (PdfReader reader = new PdfReader(data.StreamData))
        {
            AcroFields af = reader.AcroFields;
            List<string> names = af.GetSignatureNames();
            if (names != null && names.Count > 0)
            {
                string name = names[0];
                PdfPKCS7 pdf = af.VerifySignature(name);
                response.Add(new GetDataSignatureResponse()
                {
                    Name = name,
                    Date = pdf.SignDate,
                    IssuerDN = $"{pdf.SigningCertificate.IssuerDN}",
                    SubjectDN = $"{pdf.SigningCertificate?.SubjectDN}",
                });
            }
            else
            {
                return Result<List<GetDataSignatureResponse>>.Fail("Tệp chưa được ký số");
            }
        }
        return Result<List<GetDataSignatureResponse>>.Success(response);
    }
    public async Task<VerifyDigitalSinatureResponse> VerifyPdfSignatureITextSharp(IReadOnlyList<string> filePaths, bool breakIfHasSignedFile = false)
    {
        VerifyDigitalSinatureResponse verifyDigitalSinatureResponse = new VerifyDigitalSinatureResponse();
        List<string> digitalSignatureFiles = new List<string>();
        List<string> normalFiles = new List<string>();
        if (_checkSignFile == true)
        {
            verifyDigitalSinatureResponse.DigitalSignatureFiles = string.Join("##", filePaths).Split("##");
            verifyDigitalSinatureResponse.NormalFiles = [];
            verifyDigitalSinatureResponse.HasDigitalSinature = true;
            return verifyDigitalSinatureResponse;
        }

        for (int i = 0; i < filePaths.Count; i++)
        {
            string filePath = filePaths[i];
            var splitFilePath = filePath.Split("##");
            for (int j = 0; j < splitFilePath.Length; j++)
            {
                var splitFilePathItem = splitFilePath[j];
                var data = await GetFileByKeyAsync(null, splitFilePathItem);
                if (!IsPdfDocument(data.ContentType))
                {
                    normalFiles.Add(splitFilePathItem);
                    continue;
                }
                using (PdfReader reader = new PdfReader(data.StreamData))
                {
                    AcroFields af = reader.AcroFields;
                    List<string> names = af.GetSignatureNames();
                    if (names != null && names.Count > 0)
                    {
                        digitalSignatureFiles.Add(splitFilePathItem);
                        if (breakIfHasSignedFile)
                        {
                            verifyDigitalSinatureResponse.DigitalSignatureFiles = digitalSignatureFiles.AsReadOnly();
                            verifyDigitalSinatureResponse.NormalFiles = normalFiles.AsReadOnly();
                            verifyDigitalSinatureResponse.HasDigitalSinature = digitalSignatureFiles.Count > 0;
                            return verifyDigitalSinatureResponse;
                        }
                    }
                    else // nếu file hiện tại k có ký số
                    {
                        normalFiles.Add(splitFilePathItem);
                        if (!breakIfHasSignedFile) // nếu đang kiểm tra tất cả các file chứa ký số
                        {
                            verifyDigitalSinatureResponse.DigitalSignatureFiles = digitalSignatureFiles.AsReadOnly();
                            verifyDigitalSinatureResponse.NormalFiles = normalFiles.AsReadOnly();
                            verifyDigitalSinatureResponse.HasDigitalSinature = digitalSignatureFiles.Count > 0;
                            return verifyDigitalSinatureResponse;
                        }
                    }
                }
            }
        }
        verifyDigitalSinatureResponse.DigitalSignatureFiles = digitalSignatureFiles.AsReadOnly();
        verifyDigitalSinatureResponse.NormalFiles = normalFiles.AsReadOnly();
        verifyDigitalSinatureResponse.HasDigitalSinature = digitalSignatureFiles.Count > 0;
        return verifyDigitalSinatureResponse;
    }
    public async Task<VerifyDigitalSinatureResponse> VerifyPdfSignature(IReadOnlyList<string> filePaths, bool breakIfHasSignedFile = false)
    {

        VerifyDigitalSinatureResponse verifyDigitalSinatureResponse = new VerifyDigitalSinatureResponse();
        List<string> digitalSignatureFiles = new List<string>();
        List<string> normalFiles = new List<string>();
        if (_checkSignFile == true)
        {
            verifyDigitalSinatureResponse.DigitalSignatureFiles = string.Join("##", filePaths).Split("##");
            verifyDigitalSinatureResponse.NormalFiles = [];
            verifyDigitalSinatureResponse.HasDigitalSinature = true;
            return verifyDigitalSinatureResponse;
        }

        for (int i = 0; i < filePaths.Count; i++)
        {
            string filePath = filePaths[i];
            var splitFilePath = filePath.Split("##");
            for (int j = 0; j < splitFilePath.Length; j++)
            {
                var splitFilePathItem = splitFilePath[j];
                var data = await GetFileByKeyAsync(null, splitFilePathItem);
                if (!IsPdfDocument(data.ContentType))
                {
                    normalFiles.Add(splitFilePathItem);
                    continue;
                }
                //var pdfBytes = ConvertStreamToBytes(data.StreamData);
                PdfLoadedDocument document = new PdfLoadedDocument(data.StreamData);
                //Load PDF form
                PdfLoadedForm form = document.Form;

                List<PdfSignatureValidationResult> results;

                if (form != null)
                {

                    //Validate all the digital signatures present in the PDF document
                    bool isvalid = form.Fields.ValidateSignatures(out results);

                    //Show the result based on the result
                    if (results != null && results.Count > 0)
                    {
                        digitalSignatureFiles.Add(splitFilePathItem);
                        if (breakIfHasSignedFile) // chỉ cần 1 file ký số
                        {
                            verifyDigitalSinatureResponse.DigitalSignatureFiles = digitalSignatureFiles.AsReadOnly();
                            verifyDigitalSinatureResponse.NormalFiles = normalFiles.AsReadOnly();
                            verifyDigitalSinatureResponse.HasDigitalSinature = digitalSignatureFiles.Count > 0;
                            return verifyDigitalSinatureResponse;
                        }
                    }
                    else // nếu file hiện tại k có ký số
                    {
                        normalFiles.Add(splitFilePathItem);
                        if (!breakIfHasSignedFile) // nếu đang kiểm tra tất cả các file chứa ký số
                        {
                            verifyDigitalSinatureResponse.DigitalSignatureFiles = digitalSignatureFiles.AsReadOnly();
                            verifyDigitalSinatureResponse.NormalFiles = normalFiles.AsReadOnly();
                            verifyDigitalSinatureResponse.HasDigitalSinature = digitalSignatureFiles.Count > 0;
                            return verifyDigitalSinatureResponse;
                        }
                    }
                }
                else
                {
                    normalFiles.Add(splitFilePathItem);
                }
                //Close the document
                document.Close(true);
            }
        }
        verifyDigitalSinatureResponse.DigitalSignatureFiles = digitalSignatureFiles.AsReadOnly();
        verifyDigitalSinatureResponse.NormalFiles = normalFiles.AsReadOnly();
        verifyDigitalSinatureResponse.HasDigitalSinature = digitalSignatureFiles.Count > 0;
        return verifyDigitalSinatureResponse;
    }

    public async Task<IFormFile> GetFileAndConvertToIFormFile(string? bucketName, string key)
    {
        if (string.IsNullOrEmpty(bucketName))
        {
            bucketName = _settings.BucketName;
        }
        var fileName = key.Substring(key.LastIndexOf('/') + 1);
        var streamData = await GetFileByKeyAsync(bucketName, key);
        var formFile = ConvertStreamToIFormFile(streamData.StreamData, fileName, streamData.ContentType);
        return formFile;
    }
    public async Task<string> UploadFileAsBase64Async(string base64Str, string fileName, string? bucketName, string? prefix, CancellationToken cancellationToken = default)
    {
        var formFile = ConvertBase64ToIFormFile(base64Str, fileName);
        return await UploadFileAsync(formFile, bucketName, prefix);
    }


    public async Task<string> UploadFileDocxAsPdfAsync(string docxBase64, string fileName, string? bucketName, string? prefix, CancellationToken cancellationToken = default)
    {
        var pdfStream = DocToPdf(docxBase64, fileName);
        var formFile = ConvertStreamToIFormFile(pdfStream.StreamData, "to-khai.pdf", pdfStream.ContentType);
        return await UploadFileAsync(formFile, bucketName, prefix);
    }

    public async Task<StreamDataFile> UploadFileDocxAsPdfReturnBlobAsync(string docxBase64, string fileName, string? bucketName, string? prefix, CancellationToken cancellationToken = default)
    {
        var pdfStream = DocToPdf(docxBase64, fileName);
        var formFile = ConvertStreamToIFormFile(pdfStream.StreamData, fileName, pdfStream.ContentType);
        var resUpload = await UploadFileAsync(formFile, bucketName, prefix);
        pdfStream.StreamData.Position = 0;
        return pdfStream;
    }


    private string prefixFilePath(string folderName)
    {
        var date = DateTime.UtcNow;
        var year = date.Year;
        var month = date.Month;
        var day = date.Day;
        var id = Guid.NewGuid().ToString();

        string prefix = $"{year}/{month}/{day}/{folderName}/{id}";

        return prefix;
    }

    public async Task<string> UploadFileAsync(IFormFile file, string? bucketName, string? folderName)
    {
        //_logger.LogWarning($"FileUpload_{file.FileName}_{file.Length}_Start_{DateTime.Now.ToString("yyyyMMddHHHmmss")}");
        var validateRes = await PostValidate(file);
        if (!validateRes.Succeed)
        {
            throw new FileFormatException(validateRes.Description);
        }
        string prefix = prefixFilePath(folderName);
        if (string.IsNullOrEmpty(bucketName))
        {
            bucketName = _settings.BucketName;
        }

        var beArgs = new BucketExistsArgs()
                   .WithBucket(bucketName);

        bool bucketExists = await _minioClient.BucketExistsAsync(beArgs);
        if (!bucketExists)
        {
            var mbArgs = new MakeBucketArgs()
                       .WithBucket(bucketName);
            await _minioClient.MakeBucketAsync(mbArgs);
        }
        var fileStream = file.OpenReadStream();

        string? fileName = file.FileName.Trim('"');
        fileName = fileName.RemoveDiacritics();
        fileName = fileName.ReplaceWhitespace("_");
        //_logger.LogWarning($"FileUpload_{file.FileName}_{file.Length}_Upload_{DateTime.Now.ToString("yyyyMMddHHHmmss")}");
        var request = new PutObjectArgs()
            .WithBucket(bucketName)
            .WithObject(string.IsNullOrEmpty(prefix) ? fileName : $"{prefix?.TrimEnd('/')}/{fileName}")
            .WithStreamData(fileStream)
            .WithContentType(file.ContentType)
            .WithObjectSize(fileStream.Length)
            ;
        await _minioClient.PutObjectAsync(request);
        //_logger.LogWarning($"FileUpload_{file.FileName}_{file.Length}_End_{DateTime.Now.ToString("yyyyMMddHHHmmss")}");
        string result = bucketName + "/";
        result += string.IsNullOrEmpty(prefix) ? fileName : $"{prefix?.TrimEnd('/')}/{fileName}";

        return "/" + result;
    }
    public static FormatType GetFormatType(string fileName)
    {
        string fileExtension = System.IO.Path.GetExtension(fileName).ToLower();

        switch (fileExtension)
        {
            case ".doc":
                return FormatType.Doc;
            case ".dot":
                return FormatType.Dot;
            case ".docx":
                return FormatType.Docx;
            case ".strictdocx":
                return FormatType.StrictDocx;
            case ".word2007":
                return FormatType.Word2007;
            case ".word2010":
                return FormatType.Word2010;
            case ".word2013":
                return FormatType.Word2013;
            case ".word2007dotx":
                return FormatType.Word2007Dotx;
            case ".word2010dotx":
                return FormatType.Word2010Dotx;
            case ".word2013dotx":
                return FormatType.Word2013Dotx;
            case ".dotx":
                return FormatType.Dotx;
            case ".word2007docm":
                return FormatType.Word2007Docm;
            case ".word2010docm":
                return FormatType.Word2010Docm;
            case ".word2013docm":
                return FormatType.Word2013Docm;
            case ".docm":
                return FormatType.Docm;
            case ".word2007dotm":
                return FormatType.Word2007Dotm;
            case ".word2010dotm":
                return FormatType.Word2010Dotm;
            case ".word2013dotm":
                return FormatType.Word2013Dotm;
            case ".dotm":
                return FormatType.Dotm;
            case ".wordml":
                return FormatType.WordML;
            case ".rtf":
                return FormatType.Rtf;
            case ".txt":
                return FormatType.Txt;
            case ".markdown":
                return FormatType.Markdown;
            case ".automatic":
                return FormatType.Automatic;
            case ".html":
                return FormatType.Html;
            case ".odt":
                return FormatType.Odt;
            default:
                return FormatType.Automatic;
        }
    }

    public StreamDataFile StreamToPdf(Stream stream, string fileName)
    {
        var response = new StreamDataFile();
        using (WordDocument wordDocument = new WordDocument(stream, GetFormatType(fileName)))
        {
            using (DocIORenderer render = new DocIORenderer())
            {
                Syncfusion.Pdf.PdfDocument pdfDocument = render.ConvertToPDF(wordDocument);
                MemoryStream streamRes = new MemoryStream();
                pdfDocument.Save(streamRes);
                stream.Position = 0;
                response.ContentType = "application/pdf";
                response.StreamData = streamRes;
                return response;
            }
        }
    }
    public StreamDataFile DocToPdf(string base64, string fileName)
    {
        var response = new StreamDataFile();
        byte[] base64Data = Convert.FromBase64String(base64);
        using (MemoryStream streamFromBase64 = new MemoryStream(base64Data))
        {
            using (WordDocument wordDocument = new WordDocument(streamFromBase64, GetFormatType(fileName)))
            {
                using (DocIORenderer render = new DocIORenderer())
                {
                    Syncfusion.Pdf.PdfDocument pdfDocument = render.ConvertToPDF(wordDocument);

                    MemoryStream stream = new MemoryStream();
                    pdfDocument.Save(stream);
                    stream.Position = 0;
                    response.ContentType = "application/pdf";
                    response.StreamData = stream;
                    return response;
                }
            }
        }
    }
    public async Task<StreamDataFile> GetFileByKeyAsync(string? bucketName, string key)
    {
        if (string.IsNullOrEmpty(bucketName))
        {
            bucketName = _settings.BucketName;
        }
        var beArgs = new BucketExistsArgs()
                  .WithBucket(bucketName);

        bool bucketExists = await _minioClient.BucketExistsAsync(beArgs);
        if (!bucketExists)
        {
            throw new InternalServerException(string.Format(_t["Khong ton tai {0}."], bucketName));
        }
        var response = new StreamDataFile();
        var memory = new MemoryStream();
        string keyWithoutBuckpath = RemoveBucketPathFromKey(bucketName, key);
        try
        {
            StatObjectArgs statObjectArgs = new StatObjectArgs()
                                       .WithBucket(bucketName)
                                       .WithObject(keyWithoutBuckpath);
            await _minioClient.StatObjectAsync(statObjectArgs);

            GetObjectArgs getObjectArgs = new GetObjectArgs()
                                     .WithBucket(bucketName)
                                     .WithObject(keyWithoutBuckpath)
                                     .WithCallbackStream(stream =>
                                     {

                                         stream.CopyTo(memory);
                                         memory.Position = 0;
                                         response.StreamData = memory;
                                         stream.Dispose();
                                     })
                                    ;
            var file = await _minioClient.GetObjectAsync(getObjectArgs);
            string fileContentType = file.MetaData.GetValueOrDefault("Content-Type");
            if (fileContentType == null)
            {
                response.ContentType = "application/octet-stream";
            }
            else
            {
                response.ContentType = fileContentType;
            }
            return response;
        }
        catch (Exception e)
        {
            throw new InternalServerException(string.Format(_t["Loi {0}."], bucketName));
        }
    }

    public async Task<Base64DataFile> GetFileByKeyAsBase64Async(string? bucketName, string key)
    {
        if (string.IsNullOrEmpty(bucketName))
        {
            bucketName = _settings.BucketName;
        }
        var beArgs = new BucketExistsArgs()
                  .WithBucket(bucketName);

        bool bucketExists = await _minioClient.BucketExistsAsync(beArgs);
        if (!bucketExists)
        {
            throw new InternalServerException(string.Format(_t["Khong ton tai {0}."], bucketName));
        }
        var response = new Base64DataFile();
        using (var memory = new MemoryStream())
        {
            byte[] bytes = null;
            string keyWithoutBuckpath = RemoveBucketPathFromKey(bucketName, key);
            try
            {
                StatObjectArgs statObjectArgs = new StatObjectArgs()
                                           .WithBucket(bucketName)
                                           .WithObject(keyWithoutBuckpath);
                await _minioClient.StatObjectAsync(statObjectArgs);

                GetObjectArgs getObjectArgs = new GetObjectArgs()
                                         .WithBucket(bucketName)
                                         .WithObject(keyWithoutBuckpath)
                                         .WithCallbackStream(stream =>
                                         {
                                             stream.CopyTo(memory);
                                             memory.Position = 0;
                                             bytes = memory.ToArray();
                                             //response.StreamData = memory;
                                             stream.Dispose();
                                         })
                                        ;
                var file = await _minioClient.GetObjectAsync(getObjectArgs);
                string fileContentType = file.MetaData.GetValueOrDefault("Content-Type");
                if (fileContentType == null)
                {
                    response.ContentType = "application/pdf";
                }
                else
                {
                    response.ContentType = fileContentType;
                }

                string base64 = Convert.ToBase64String(bytes);
                response.Base64 = base64;
                response.Name = file.ObjectName;
            }
            catch (Exception e)
            {
                throw new InternalServerException(string.Format(_t["Loi {0}."], bucketName));
            }
            return response;
        }
    }

    private string RemoveBucketPathFromKey(string bucketName, string key)
    {
        int index = key.IndexOf("/" + bucketName + "/");
        if (index != -1)
        {
            // Loại bỏ substring từ chuỗi đầu vào và trả về kết quả
            string result = key.Remove(index, bucketName.Length + 2);
            return result;
        }
        else
        {
            // Trả về chuỗi đầu vào nếu không tìm thấy substring
            return key;
        }
    }

    public async Task RemoveFileByKeyAsync(string bucketName, string key)
    {
        try
        {
            string keyWithoutBucketName = RemoveBucketPathFromKey(bucketName, key);
            RemoveObjectArgs removeBucketArgs = new RemoveObjectArgs().WithBucket(bucketName).WithObject(keyWithoutBucketName);
            await _minioClient.RemoveObjectAsync(removeBucketArgs);
        }
        catch (MinioExceptions.ObjectNotFoundException)
        {
            throw new NotFoundException(string.Format(_t["Khong ton tai {0}."], key));
        }
        catch (MinioExceptions.BucketNotFoundException)
        {
            throw new NotFoundException(string.Format(_t["Khong ton tai bucket {0}."], bucketName));
        }
        catch (Exception e)
        {
            throw new InternalServerException(string.Format(_t["Loi {0}."], e.Message));
        }
    }

    [Obsolete]
    public async Task<List<AttachmentResponse>> UploadFilesAsync(List<IFormFile> files, string? bucketName, string? prefix, CancellationToken cancellationToken = default)
    {
        List<AttachmentResponse> listFile = new List<AttachmentResponse>();
        if (files.Any(f => f.Length == 0))
        {
            throw new InvalidOperationException("File Not Found.");
        }

        if (string.IsNullOrEmpty(bucketName))
        {
            bucketName = _settings.BucketName;
        }

        foreach (var formFile in files)
        {
            if (formFile.Length > 0)
            {
                string? fileName = formFile.FileName.Trim('"');
                fileName = fileName.RemoveSpecialCharacters(string.Empty);
                fileName = fileName.ReplaceWhitespace("_");

                var attachment = new AttachmentResponse();
                attachment.Name = fileName;
                attachment.Type = Path.GetExtension(formFile.FileName);
                attachment.Url = await UploadFileAsync(formFile, bucketName!, prefix ?? Guid.NewGuid().ToString());
                attachment.Size = formFile.Length;

                listFile.Add(attachment);
            }
        }

        return await Task.FromResult(listFile);

    }

    public Task<AttachmentResponse> UploadFileAsync<T>(IFormFile? file, string? bucketName, string? prefix, CancellationToken cancellationToken = default)
        where T : class
    {
        throw new NotImplementedException();
    }

    public byte[] ConvertStreamToBytes(Stream data)
    {
        using (var memoryStream = new MemoryStream())
        {
            data.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }
    }

    public async Task<FileRes> GetFileByKey2Async(string bucketName, string key)
    {
        if (string.IsNullOrEmpty(bucketName))
        {
            bucketName = _settings.BucketName;
        }
        Console.WriteLine($"Bucket Name: {bucketName}");
        Console.WriteLine($"Key: {key}");
        FileRes res = new FileRes();
        var beArgs = new BucketExistsArgs()
                  .WithBucket(bucketName);

        bool bucketExists = await _minioClient.BucketExistsAsync(beArgs);
        if (!bucketExists)
        {
            throw new InternalServerException(string.Format(_t["Khong ton tai {0}."], bucketName));
        }
        string keyWithoutBuckpath = RemoveBucketPathFromKey(bucketName, key);
        try
        {
            StatObjectArgs statObjectArgs = new StatObjectArgs()
                                       .WithBucket(bucketName)
                                       .WithObject(keyWithoutBuckpath);
            await _minioClient.StatObjectAsync(statObjectArgs);

            GetObjectArgs getObjectArgs = new GetObjectArgs()
                                     .WithBucket(bucketName)
                                     .WithObject(keyWithoutBuckpath)
                                     .WithCallbackStream(async stream =>
                                     {
                                         //using (var memoryStream = new MemoryStream())
                                         //{
                                         //    await stream.CopyToAsync(memoryStream);
                                         //    res.ByteRes = memoryStream.ToArray();
                                         //}    
                                         res.ByteRes = ConvertStreamToBytes(stream);
                                         stream.Dispose();
                                     });

            var file = await _minioClient.GetObjectAsync(getObjectArgs);
            res.FileName = Path.GetFileName(file.ObjectName.ToString());
            res.ContentType = file.ContentType;

        }
        catch (Exception e)
        {
            throw new InternalServerException(string.Format(_t["Loi {0}."], bucketName));
        }

        return res;
    }

    public async Task<UrlPhieuDanhGiaDto> UploadFileWithStreamDocxReturnUrlAsync(DefaultIdType danhGiaId, Stream stream, string fileName, string? bucketName, string? prefix, CancellationToken cancellationToken = default)
    {

        var pdfStream = StreamToPdf(stream, fileName);
        var formFilePdf = ConvertStreamToIFormFile(pdfStream.StreamData, fileName.Replace("docx", "pdf"), pdfStream.ContentType);
        string urlResPdf = await UploadFileAsync(formFilePdf, bucketName, prefix);

        var formFileDocx = ConvertStreamToIFormFile(stream, fileName, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        string urlResDocx = await UploadFileAsync(formFileDocx, bucketName, prefix);

        pdfStream.StreamData.Position = 0;
        return new UrlPhieuDanhGiaDto
        {
            UrlPdf = urlResPdf,
            UrlDocx = urlResDocx,
        };

    }

    public async Task<string> UploadFileWithStreamExcelReturnUrlAsync(Stream stream, string fileName, string? bucketName, string? prefix, CancellationToken cancellationToken = default)
    {

        var formFileDocx = ConvertStreamToIFormFile(stream, fileName, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return await UploadFileAsync(formFileDocx, bucketName, prefix) ?? string.Empty;
    }

}