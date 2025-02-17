using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Common.SSO;
public class UserInfoSmartKiosRequest
{
    public string? idCode { get; set; }
    public string? oldIdCode { get; set; }
    public string? personName { get; set; }
    public string? dateOfBirth { get; set; }
    public string? gender { get; set; }
    public string? nationality { get; set; }
    public string? race { get; set; }
    public string? religion { get; set; }
    public string? originPlace { get; set; }
    public string? residencePlace { get; set; }
    public string? personalIdentification { get; set; }
    public string? issueDate { get; set; }
    public string? expiryDate { get; set; }
    public string? wifeName { get; set; }
    public string? fatherName { get; set; }
    public string? motherName { get; set; }
}
