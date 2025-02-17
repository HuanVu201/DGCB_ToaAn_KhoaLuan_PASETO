using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Commands;
public class AddConfigCommand : ICommand<Guid>
{
    public string Ten { get; set; }
    public string Code { get; set; }
    public int ThuTu { get; set; } = 1;
    public bool Active { get; set; } = true;
    public string Module { get; set; }
    public string? Content { get; set; }
    public string? Note { get; set; }
}
