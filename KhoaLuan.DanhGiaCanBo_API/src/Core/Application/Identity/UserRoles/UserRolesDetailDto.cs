using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Identity.UserRoles;
public class UserRolesDetailDto
{
    public string? Id { get; set; }
    public string? UserId { get; set; }
    public string? RoleId { get; set; }
    public string? FullName { get; set; }
    public string? UserName { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public bool IsActive { get; set; } = true;

    public bool EmailConfirmed { get; set; }

    public string? PhoneNumber { get; set; }

    public string? ImageUrl { get; set; }
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }

    public string? OfficeCode { get; set; }
    public string? OfficeName { get; set; }
    public int? UserOrder { get; set; }
    public string? Type { get; set; }

    public string? SoCMND { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? NgayThangNamSinh { get; set; }
    public string? NamSinh { get; set; }

    public string? GioiTinh { get; set; }
    public string? NoiDangKyKhaiSinh { get; set; }
    public string? QueQuan { get; set; }
    public string? ThuongTru { get; set; }
    public bool? TaiKhoanHeThongQLVB { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
