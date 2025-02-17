using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ActionApp.Commands;
public class AddActionCommand : ICommand<DefaultIdType>
{
    public string Ten { get; set; }
    public string? Ma { get; set; }
    public int ThuTu { get; set; }
    public string? Quyen { get; set; }
    public string? MoTa { get; set; }
    public string? IconName { get; set; }
    public string? ColorCode { get; set; }
    public bool? ShowInModal { get; set; } = false;
    public bool? ShowInTable { get; set; } = false;
    public string? ApplyForUsers { get; set; }
    public string? ApplyForUserGroups { get; set; }
}
