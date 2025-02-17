using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.GiaHanDanhGiaApp.Queries;
public class SearchGiaHanDanhGiaQuery : PaginationFilter, IRequest<PaginationResponse<GiaHanDanhGiaDto>>
{
    public string? LyDo { get; set; }
    public string? HoTenDanhGia { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaDonViCha { get; set; }
    public string? TrangThai { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public bool? GetDataCurrentUser { get; set; }
    public bool? FilterByUserRole { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
