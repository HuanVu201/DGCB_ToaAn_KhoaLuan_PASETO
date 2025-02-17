using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Identity.Users;
public class NhomLanhDaoUserDto : IDto
{
    public string Id { get; set; }
    public string FullName { get; set; }
    public string Name { get; set; }
    public string UserName { get; set; }
    public string OfficeName { get; set; }
    public string MaDinhDanhOfficeCode { get; set; }
    public string GroupName { get; set; }
    public string PositionName { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
