using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ScreenApp.Commands;
public class AddScreenCommand : ICommand<DefaultIdType>
{
    public string? Ma { get; set; }
    public string? MoTa { get; set; }
    public bool? ShowActionInModal { get; set; } = false;
    public bool? ShowActionInTable { get; set; } = false;
}
