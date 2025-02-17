

using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Business.ActionApp;


public class ActionDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string Ma { get; set; }
    public string Ten { get; set; }
    public string Quyen { get; set; }
    public int ThuTu { get; set; }
    public string MoTa { get; set; }
    public string? IconName { get; set; }
    public string? ColorCode { get; set; }
    public bool? ShowInModal { get; set; } 
    public bool? ShowInTable { get; set; } 
    [JsonIgnore]
    public int TotalCount { get; set; }
}

