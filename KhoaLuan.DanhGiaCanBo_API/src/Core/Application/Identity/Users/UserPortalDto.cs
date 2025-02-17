using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DanhGiaCanBo.Application.Identity.Users.Password;
public class UserPortalDto : IDto
{
    public string? Id { get; set; }
    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public string? OfficeCode { get; set; }
    public string? UserOrder { get; set; }
    public string? ChucDanh { get; set; }
    public string? OfficeName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? PositionName { get; set; }
    public string? Email { get; set; }
   
    [JsonIgnore]
    public int TotalCount { get; set; }

}
