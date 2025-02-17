using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp.Commands;
public class AddKyDanhGiaCommand : ICommand<Guid>
{
    [MaxLength(200)]
    public string? Ten { get;  set; }

    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? Ma { get;  set; }

    public DateTime? TuNgayDanhGia { get;  set; }

    public DateTime? DenNgayDanhGia { get;  set; }

    [MaxLength(100)]
    public string? ThoiGianGiaHan { get;  set; }

    public bool Active { get;  set; } = true;
}
