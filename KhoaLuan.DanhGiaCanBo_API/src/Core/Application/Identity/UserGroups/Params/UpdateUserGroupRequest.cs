using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
namespace TD.DanhGiaCanBo.Application.Identity.UserGroups.Params;
public class UpdateUserGroupRequest 
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? FullName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? UserId { get; set; }
    public string? DonViId { get; set; }
    public string? PhongBanId { get; set; }
    public DefaultIdType? ChucDanhId { get; set; }
    public DefaultIdType? ChucVuId { get; set; }
    public bool? IsDefault { get; set; }
    public int? UserOrder { get; set; }
    public string? NoiDungKiemNhiem { get; set; }
    public string? MaPhieuDanhGia { get; set; }
    public bool? ThamQuyenXepLoai { get; set; }
    public bool? KiemNhiem { get; set; }
    public bool? TruongDonVi { get; set; }
    public bool? KhongDanhGia { get; set; }

    public bool? IsKySo { get; set; }
}
