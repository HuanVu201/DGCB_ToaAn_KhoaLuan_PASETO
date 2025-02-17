

using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Application.Catalog.MenuApp;


public class MenuDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public Guid Id { get; set; }
    public string TenMenu { get; set; }
    public Guid? ParentId { get; set; }
    public int ThuTuMenu { get; set; } 
    public string IconName { get; set; }
    public string Module { get; set; }
    public string FullPath { get; set; }
    public string? Permission { get; set; }
    public bool? IsTopMenu { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
