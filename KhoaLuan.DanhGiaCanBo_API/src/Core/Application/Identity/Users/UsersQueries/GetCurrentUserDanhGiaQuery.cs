using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
public class GetCurrentUserDanhGiaQuery : IQuery<CurrentUserDanhGiaDto>
{
}

public class CurrentUserDanhGiaDto
{
    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public DefaultIdType? MaNguoiDung { get; set; }
    public string? ChucVu { get; set; }
    public DefaultIdType? ChucVuId { get; set; }
    public string? ChucDanh { get; set; }
    public DefaultIdType? ChucDanhId { get; set; }
    public string? TenPhongBan { get; set; }
    public string? MaPhongBan { get; set; }
    public string? TenDonVi { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaDonViCha { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }

    // public DefaultIdType? NguoiTaoUser { get; set; }
    // public DateTime? NgayTaoUser { get; set; }
    // public DefaultIdType? NguoiSuaUser { get; set; }
    // public DateTime? NgaySuaUser { get; set; }
    public int? ThuTu { get; set; }
    public bool? KiemNhiem { get; set; }
    public string? NoiDungKiemNhiem { get; set; }
    public bool? KhongDanhGia { get; set; }
    public string? MaDonViFull { get; set; }
}
