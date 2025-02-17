using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAuthen;
public class LogAuthenDetailDto : IDto
{
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? TypeUser { get; set; }
    public string? NgayThangNamSinh { get; set; }
    public string? GioiTinh { get; set; }
    public string? IP { get; set; }
    public string? Device { get; set; }
    public DateTime? CreatedAt { get; set; }

    public DateTime? DeletedOn { get; set; }
}
