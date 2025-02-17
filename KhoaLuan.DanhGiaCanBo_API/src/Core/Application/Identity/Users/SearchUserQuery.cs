namespace TD.DanhGiaCanBo.Application.Identity.Users;
public class SearchNhomLanhDaoQuery: PaginationFilter
{
    public string OfficeCode { get; set; }
    public string GroupCode { get; set; }
}
