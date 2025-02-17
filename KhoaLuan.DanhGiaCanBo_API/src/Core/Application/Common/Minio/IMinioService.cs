using Microsoft.AspNetCore.Http;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Params;

namespace TD.DanhGiaCanBo.Application.Common.Minio;

public interface IMinioService : IScopedService
{
    Task<string> UploadFileAsync(IFormFile file, string bucketName, string? prefix);
    public Task<List<AttachmentResponse>> UploadFilesAsync(List<IFormFile> files, string? bucketName, string? prefix, CancellationToken cancellationToken = default);
    public Task<AttachmentResponse> UploadFileAsync<T>(IFormFile? file, string? bucketName, string? prefix, CancellationToken cancellationToken = default)
    where T : class;
    Task<StreamDataFile> GetFileByKeyAsync(string? bucketName, string key);
    Task<StreamDataFile> AddPagePDF(string? bucketName, string key);
    Task RemoveFileByKeyAsync(string bucketName, string key);
    Task<Base64DataFile> GetFileByKeyAsBase64Async(string? bucketName, string key);
    public Task<string> UploadFileDocxAsPdfAsync(string docxBase64, string fileName, string? bucketName, string? folderName, CancellationToken cancellationToken = default);
    public Task<string> UploadFileAsBase64Async(string base64Str, string fileName, string? bucketName, string? folderName, CancellationToken cancellationToken = default);
    StreamDataFile DocToPdf(string base64, string fileName);
    StreamDataFile StreamToPdf(Stream data, string fileName);
    IFormFile ConvertStreamToIFormFile(Stream stream, string fileName, string contentType = null);
    Task<IFormFile> GetFileAndConvertToIFormFile(string bucketName, string key);
    byte[] ConvertStreamToBytes(Stream data);
    Task RemoveFilesByKeyAsync(string? bucketName, IReadOnlyList<string> keys);
    Task<VerifyDigitalSinatureResponse> VerifyPdfSignature(IReadOnlyList<string> filePath, bool breakIfHasSignedFile = false);
    Task<VerifyDigitalSinatureResponse> VerifyPdfSignatureITextSharp(IReadOnlyList<string> filePath, bool breakIfHasSignedFile = false);
    IFormFile ConvertBase64ToIFormFile(string base64, string fileName);
    Task<string> GetFileInExternalResource(string? url, object? body = null);
    Task<ConfigFileUploadResponse> PostValidate(IFormFile data);
    Task<FileRes> GetFileByKey2Async(string bucketName, string key);
    Task<string> GetFileInExternalResourceByGetMethod(string? url);
    Task<Result<List<GetDataSignatureResponse>>> GetSignatureData(string filePath);
    Task<UrlPhieuDanhGiaDto> UploadFileWithStreamDocxReturnUrlAsync(DefaultIdType danhGiaId, Stream stream, string fileName, string? bucketName, string? folderName, CancellationToken cancellationToken = default);
    Task<string> UploadFileWithStreamExcelReturnUrlAsync(Stream stream, string fileName, string? bucketName, string? folderName, CancellationToken cancellationToken = default);
}