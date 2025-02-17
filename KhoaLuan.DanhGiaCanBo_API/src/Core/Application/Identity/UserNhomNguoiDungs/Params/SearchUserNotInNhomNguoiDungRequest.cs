namespace TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs.Params;
public class SearchUserNotInNhomNguoiDungRequest : PaginationFilter
{
    public DefaultIdType NhomNguoiDungId { get; set; }
    public DefaultIdType? ChucVuId { get; set; }
    public DefaultIdType? ChucDanhId { get; set; }
    public string? GroupCode { get; set; }
    public string? OfficeCode { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
}
