using Microsoft.AspNetCore.Identity;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;

public class ApplicationRoleClaim : IdentityRoleClaim<string>
{
    public string? CreatedBy { get; init; }
    public DateTime CreatedOn { get; init; }

    public  string? Description { get; set; }
}