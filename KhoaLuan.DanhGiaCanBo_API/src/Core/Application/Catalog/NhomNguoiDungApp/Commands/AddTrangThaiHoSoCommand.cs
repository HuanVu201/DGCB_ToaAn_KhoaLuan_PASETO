using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.NhomNguoiDungApp.Commands;
public class AddNhomNguoiDungCommand : ICommand<Guid>
{
    public string Ten { get; set; }
    public string? Ma { get; set; }
    public string? MoTa { get; set; }
}
