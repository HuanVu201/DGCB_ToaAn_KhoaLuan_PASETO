using TD.DanhGiaCanBo.Domain.Business;
using System.Text.Json.Serialization;
namespace TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
public class ListAUGNotPermissionDanhGia : IDto
{
    public Guid Id { get; set; }
    public string? UserId { get; set; }
    public string? GroupCode { get; set; }
    public string? OfficeCode { get; set; }

    public string? RoleName { get; set; }

    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? ChucVuName { get; set; }
    public string? ChucDanhName { get; set; }
    public string? GroupName { get; set; }
    public string? OfficeName { get; set; }

    public string? ChucVuCode { get; set; }

    public string? ChucDanhCode { get; set; }
    public string? Catalog { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
