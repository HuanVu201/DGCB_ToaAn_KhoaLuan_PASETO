using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp.Commands;
public sealed class UpdateKyDanhGiaCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
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
