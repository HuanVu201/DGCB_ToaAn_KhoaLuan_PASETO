using TD.DanhGiaCanBo.Application.Identity.UserGroups.Params;

namespace TD.DanhGiaCanBo.Application.Identity.Users;

public class UpdateUserRequest
{
    public string? Id { get; set; } = default!;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? HoVaTen { get; set; }
    public string? FullName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public FileUploadRequest? Image { get; set; }
    public bool DeleteCurrentImage { get; set; } = false;
    public bool ActivateUser { get; set; } =true;
    public int? UserOrder { get; set; }
    public AddUserGroupData? UserGroupData { get; set; }

}
