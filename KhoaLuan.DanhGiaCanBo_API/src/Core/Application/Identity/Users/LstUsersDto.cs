

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp;


public class LstUsersDto : IDto
{
    public Guid? Id { get; set; }
    [MaxLength(200)]
    public string? GroupCode { get; set; }
    [MaxLength(100)]
    public string? GroupName { get; set; }
    public string? MaDonVi { get; set; }
    public string? TenDonVi { get; set; }
    public string? FullName { get; set; }
    public Guid? GroupId { get; set; }
    public string? UserId { get; set; }
    public string? UserName { get; set; }
    public string? ChucVu   { get; set;}
    public string? FullNameWithGroup { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
