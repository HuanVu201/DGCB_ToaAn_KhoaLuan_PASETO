using System.Drawing.Printing;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp;
public class GroupChildDto : IDto
{
    public Guid Id { get; set; }
    public string GroupCode { get; set; }
    public string GroupName { get; set; }
    public string Type { get; set; }
    public int? GroupOrder { get; set; }
    public string Category { get; set; }
    public string OfGroupName { get; set; }
    public string OfGroupCode { get; set; }

    
}
