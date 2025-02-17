using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Commands;
public class UpdateLienKetBuocXuLyCommand : ICommand
{
    public DefaultIdType Id { get; set; }
    public string? Label { get; set; }
}
