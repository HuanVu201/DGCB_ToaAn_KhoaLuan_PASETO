using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp.Queries;
public class SearchTaiLieuHDSDQuery : PaginationFilter, IRequest<PaginationResponse<TaiLieuHDSDDto>>
{
    public string? TenTaiLieu { get; set; }
    public string? TaiLieuDanhcho { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
