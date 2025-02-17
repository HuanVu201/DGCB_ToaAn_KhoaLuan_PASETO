

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp;


public class XepLoaiDanhGiaDto : IDto
{
    public Guid Id { get; set; }
    [MaxLength(200)]
    public string Ten { get; set; }
    [MaxLength(100)]
    public string Ma { get; set; }
    public double DiemToiThieu { get; set; }
    public double DiemToiDa { get; set; }
    public bool Active { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string MaBoTieuChi { get; set; }
    [MaxLength(200)]
    public string TenBoTieuChi { get; set; }
}
