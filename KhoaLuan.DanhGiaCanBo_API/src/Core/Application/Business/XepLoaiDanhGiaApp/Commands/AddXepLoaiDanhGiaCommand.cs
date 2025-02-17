using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Commands;
public class AddXepLoaiDanhGiaCommand : ICommand<Guid>
{
    [MaxLength(200)]
    public string Ten { get; set; }
    [MaxLength(100)]
    public string Ma { get; set; }
    public double DiemToiThieu { get; set; }
    public double DiemToiDa { get; set; }
    public bool Active { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string MaBoTieuChi { get; set; }
    [MaxLength(200)]
    public string TenBoTieuChi { get; set; }
}
