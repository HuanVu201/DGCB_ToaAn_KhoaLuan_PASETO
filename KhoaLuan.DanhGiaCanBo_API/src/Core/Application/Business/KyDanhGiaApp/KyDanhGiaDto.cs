

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp;


public class KyDanhGiaDto : IDto
{
    public Guid? Id { get; set; }
    [MaxLength(200)]
    public string? Ten { get; private set; }

    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? Ma { get; private set; }

    public DateTime? TuNgayDanhGia { get; private set; }

    public DateTime? DenNgayDanhGia { get; private set; }

    [MaxLength(100)]
    public string? ThoiGianGiaHan { get; private set; }

    public bool Active { get; private set; } = true;

    [JsonIgnore]
    public int TotalCount { get; set; }
}
