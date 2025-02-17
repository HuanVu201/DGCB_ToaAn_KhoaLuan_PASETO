namespace TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs.Params;
public class AddUserNhomNguoiDungRequest
{
    public IReadOnlyList<DefaultIdType> UserIds { get; set; }
    public DefaultIdType NhomNguoiDungId { get; set; }
}
