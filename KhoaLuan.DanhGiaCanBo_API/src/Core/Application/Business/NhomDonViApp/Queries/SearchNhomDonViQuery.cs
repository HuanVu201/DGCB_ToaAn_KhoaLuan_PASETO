using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Application.Business.NhomDonViApp;

namespace TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Queries;


public class SearchNhomDonViQuery : PaginationFilter, IRequest<PaginationResponse<NhomDonViDto>>
{
    public string? Ten { get; set; }
    public string? Id { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
