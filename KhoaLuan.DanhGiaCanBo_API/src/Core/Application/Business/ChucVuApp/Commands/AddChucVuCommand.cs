using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
public class AddChucVuCommand : ICommand<Guid>
{
    [MaxLength(200)]
    public string Ten { get; set; }
    [MaxLength(100)]
    public string Ma { get; set; }
    public string? MoTa { get; set; }
    public bool Active { get; set; } = false;
    public string? MaCapDanhGia { get; set; }
    public string? TenCapDanhGia { get; set; }

}
