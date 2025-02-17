using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp;

namespace TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs.Params;
public class SearchUserNhomNguoiDungQuery : PaginationFilter
{
    public DefaultIdType NhomNguoiDungId { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
