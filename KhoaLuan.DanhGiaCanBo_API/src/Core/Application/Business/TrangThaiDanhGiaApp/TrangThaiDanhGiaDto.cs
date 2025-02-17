

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.ActionApp;
namespace TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp;


public class TrangThaiDanhGiaDto : IDto
{
    public DefaultIdType Id { get; set; }
    [MaxLength(200)]
    public string? Ten { get;  set; }
    [MaxLength(100)]
    public string Ma { get;  set; }
    public bool Active { get; set; }

[JsonIgnore] 
    public int TotalCount { get; set; }
}
