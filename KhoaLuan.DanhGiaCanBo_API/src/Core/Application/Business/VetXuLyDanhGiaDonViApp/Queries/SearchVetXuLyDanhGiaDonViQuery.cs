using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.VetXuLyDanhGiaDonViApp.Queries;
public class SearchVetXuLyDanhGiaDonViQuery : PaginationFilter, IRequest<PaginationResponse<VetXuLyDanhGiaDonViDto>>
{
    public string? MaPhieu { get; set; }
    public string? TenThaoTac { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
