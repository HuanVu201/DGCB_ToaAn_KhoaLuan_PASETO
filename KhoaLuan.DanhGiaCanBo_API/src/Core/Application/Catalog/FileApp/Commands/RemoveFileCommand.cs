using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.FileApp.Commands;
public class RemoveFileCommand : ICommand
{
    public string Path { get; set; }
}

