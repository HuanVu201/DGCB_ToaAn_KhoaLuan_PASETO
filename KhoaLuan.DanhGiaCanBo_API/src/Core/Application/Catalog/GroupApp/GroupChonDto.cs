using System.Drawing.Printing;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp;
public class GroupChonDto : IDto
{
    public Guid Id { get; set; }
    public string GroupCode { get; set; }
    public string GroupName { get; set; }   
    [JsonIgnore]
    public int TotalCount { get; set; }
}
