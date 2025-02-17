using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAuthen;
public class LogAuthenDto : IDto
{
    public Guid Id { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? TypeLogin { get; set; }
    public string? TypeUser { get; set; }
    public string? Device { get; set; }
    public string? IP { get; set; }
    public DateTime? CreatedAt { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
