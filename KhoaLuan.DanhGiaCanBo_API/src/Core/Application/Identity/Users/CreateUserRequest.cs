using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Identity.UserGroups.Params;

namespace TD.DanhGiaCanBo.Application.Identity.Users;

public class CreateUserRequest
{
    public string? FullName { get; set; }
    public string? HoVaTen { get; set; }
    public string? TypeUser { get; set; } 
    public string? Email { get; set; } = default!;
    public string UserName { get; set; } = default!;
    public string Password { get; set; } = default!;
    public string ConfirmPassword { get; set; } = default!;
    public string? PhoneNumber { get; set; }
    public int? UserOrder { get; set; }
    public string? Type { get; set; }
    public bool? IsActive { get; set; }
    public AddUserGroupData? UserGroupData { get; set; }
}
public class CreateUserWithDefaultPasswordRequest
{
    public string? FirstName { get; set; }
    public string FullName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; } = default!;
    public string UserName { get; set; } = default!;
    public string? Password { get; set; } = default!;
    public string? ConfirmPassword { get; set; } = default!;
    public string? PhoneNumber { get; set; }
    public int? UserOrder { get; set; }
    public bool? IsActive { get; set; }
    public AddUserGroupData? UserGroupData { get; set; }
}
