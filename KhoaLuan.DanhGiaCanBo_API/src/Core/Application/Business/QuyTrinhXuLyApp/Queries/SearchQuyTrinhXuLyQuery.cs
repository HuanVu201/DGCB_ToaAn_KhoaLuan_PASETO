using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;

public class SearchQuyTrinhXuLyQuery : PaginationFilter, IRequest<PaginationResponse<DanhSachQuyTrinhXuLyDto>>
{
    public string? TenQuyTrinh { get; set; }
    public string? OfficeCode { get; set; }
    public bool? LaQuyTrinhDonVi { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
