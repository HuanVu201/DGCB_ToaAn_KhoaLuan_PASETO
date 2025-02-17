using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp;
public class PortalGroupDto : IDto
{
    public DefaultIdType? ID { get; set; }
    public string Catalog { get; set; }
    public string GroupCode { get; set; }
    public string GroupName { get; set; }
    public string? DiaChi { get; set; }
    public string? SoDienThoai { get; set; }
    public string? ThoiGianLamViec { get; set; }
    public string? Email { get; set; }
    public string? Website { get; set; }
    public string? Type { get; set; }
    public string? OfGroupCode { get; set; }
    public string? OfGroupName { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
