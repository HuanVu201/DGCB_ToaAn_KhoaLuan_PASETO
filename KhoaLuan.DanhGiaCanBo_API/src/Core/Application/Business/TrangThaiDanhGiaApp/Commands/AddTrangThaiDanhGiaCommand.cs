using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp.Commands;
public class AddTrangThaiDanhGiaCommand : ICommand<Guid>
{
    [MaxLength(200)]
    public string Ten { get; set; }
    [MaxLength(100)]
    public string Ma { get; set; }
    public bool Active { get; set; }
    public bool LaTrangThaiDonVi { get; set; }
}
