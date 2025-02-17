using TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs.Params;

namespace TD.DanhGiaCanBo.Application.Identity.UserGroups.Params;
public class AddUserGroupRequest
{
    public IReadOnlyList<string> UserIds { get; set; }
    public string GroupCode { get; set; }
}

public class AddUserGroupData
{
    public string? UserId { get; set; }
    public DefaultIdType? Id { get; set; }
    public string GroupCode { get; set; }
    public string OfficeCode { get; set; }
    public DefaultIdType? ChucDanhId { get; set; }
    public DefaultIdType? ChucVuId { get; set; }
    public AddUserToMultipleNhomRequest? NhomNguoiDungs { get; set; }
    public bool IsDefault { get; set; }
    public int UserOrder { get; set; }
    public bool? ThamQuyenXepLoai { get; set; }
    public bool? KiemNhiem { get; set; }
    public bool? TruongDonVi { get; set; }
    public bool? KhongDanhGia { get; set; }
    public string? NoiDungKiemNhiem { get; set; }
    public string? MaPhieuDanhGia { get; set; }

    public bool? IsKySo { get; set; }
}