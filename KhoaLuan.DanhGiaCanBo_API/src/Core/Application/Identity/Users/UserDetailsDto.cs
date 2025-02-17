namespace TD.DanhGiaCanBo.Application.Identity.Users;

public class UserDetailsDto
{


    public Guid Id { get; set; }
    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public bool IsActive { get; set; } = true;
    public string? PhoneNumber { get; set; }
    public string? ImageUrl { get; set; }
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }
    public string? OfficeCode { get; set; }
    public string? OfficeName { get; set; }
    public int? UserOrder { get; set; }
    public string? TypeUser { get; set; }
    public Guid? CreatedBy { get; set; }
    public DateTime? CreatedOn { get; private set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModifiedOn { get; set; }
}
public class UserDto
{


    public Guid Id { get; set; }
    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public bool EmailConfirmed { get; set; }
    public string? PhoneNumber { get; set; }
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }
    public string? OfficeCode { get; set; }
    public string? OfficeName { get; set; }
    public int? UserOrder { get; set; }
    public string? TypeUser { get; set; }

}