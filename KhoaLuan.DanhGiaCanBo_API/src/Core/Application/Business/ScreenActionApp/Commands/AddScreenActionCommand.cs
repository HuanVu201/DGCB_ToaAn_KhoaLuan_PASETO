using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Commands;
public class AddScreenActionCommand : ICommand
{
    public List<AddScreenActionParams> ScreenActions { get; set; }
}

public class AddScreenActionParams
{
    public Guid ScreenId { get; set; }
    public Guid ActionId { get; set; }
}