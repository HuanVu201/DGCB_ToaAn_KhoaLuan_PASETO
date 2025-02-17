using System.Drawing.Printing;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp;
public class GroupDto : IDto
{
    public Guid Id { get; set; }
    public string GroupCode { get; set; }
    public string GroupName { get; set; }
    public string OfGroupCode { get; set; }
    public string OfGroupName { get; set; }
    public string Type { get; set; }
    public string Catalog { get; set; }
    public string OfGroupId { get; set; }
    public string OtherCatalog { get; set; }
    public string FullCode { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
