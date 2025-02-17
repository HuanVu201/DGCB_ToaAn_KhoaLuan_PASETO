namespace TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs.Params;
public class AddUserToMultipleNhomRequest
{
    public DefaultIdType? UserGroupId { get; set; }
    public IReadOnlyList<DefaultIdType> NhomNguoiDungIds { get; set; }
}
