using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.FileApp.Commands;
public class RemoveFileCommandHandler : ICommandHandler<RemoveFileCommand>
{
    public async Task<Result> Handle(RemoveFileCommand request, CancellationToken cancellationToken)
    {
        string path = Path.Join(AppDomain.CurrentDomain.BaseDirectory, request.Path);
        string ext = Path.GetExtension(path);
        var allowDelete = new string[] { ".xlsx", ".XLSX", ".docx", ".DOCX", ".doc", ".DOC", ".pdf", ".PDF", ".png", ".PNG", ".jpge", ".JPGE", ".jpg", ".JPG", ".TXT", ".txt" };
        if (allowDelete.Contains(ext))
        {
            string dir = Path.GetDirectoryName(path);
            Directory.Delete(dir, true);
            return (Result)Result.Success();
        }
        throw new Exception("Định dạng tệp muốn xóa không hợp lệ");
    }
}
