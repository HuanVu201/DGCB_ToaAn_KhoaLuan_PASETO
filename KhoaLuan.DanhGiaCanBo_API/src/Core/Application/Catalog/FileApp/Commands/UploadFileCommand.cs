using Microsoft.AspNetCore.Http;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.FileApp.Commands;
public class UploadFileCommand : ICommand<string>
{
    public IFormFile Files { get; set; }
    public string FolderName { get; set; }
    public string? FileUploadLocalPath { get; set; }
}

public class UploadFileAsBase64Command
{
    public string Data { get; set; }
    public string FileName { get; set; }
    public string FolderName { get; set; }
}

public class UploadFileAsStreamCommand
{
    public IFormFile Data { get; set; }
    public string FileName { get; set; }
    public string FolderName { get; set; }
    public string? AddGTHS { get; set; } = "1";
    public string? MaHoSo { get; set; }
    public string? LoaiGiayTo { get; set; }
    public string? NguoiXuatPhieu { get; set; }
    public DateTime? NgayXuatPhieu { get; set; }
    public string? MaGiayTo { get; set; }

}
