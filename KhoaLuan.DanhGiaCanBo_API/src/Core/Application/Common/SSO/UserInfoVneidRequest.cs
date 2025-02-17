using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Common.SSO;
public class UserInfoVneidRequest
{
    public string? sub { get; set; }
    public int? LoaiTaiKhoan { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? HoVaTen { get; set; }
    public string? NgayThangNamSinh { get; set; }
    public string? TechID { get; set; }
    public string? loAs { get; set; }
    public string? userProfileUri { get; set; }
    public string? logoutUri { get; set; }
    public int? IAL { get; set; }
    public string? id_token { get; set; }
    public string? access_token { get; set; }
}
