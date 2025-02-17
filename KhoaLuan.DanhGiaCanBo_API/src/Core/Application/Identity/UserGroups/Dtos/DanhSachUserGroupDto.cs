using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Identity.UserGroups;
public class DanhSachUserGroupDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string TenChucVu { get; set; }
    public string TenChucDanh { get; set; }
    public string TenPhongBan { get; set; }

    public string TenDonVi { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }

}
