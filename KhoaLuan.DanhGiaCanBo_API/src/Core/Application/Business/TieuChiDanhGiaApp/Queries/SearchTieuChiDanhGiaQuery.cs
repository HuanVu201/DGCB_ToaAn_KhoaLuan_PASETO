using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;


public class SearchTieuChiDanhGiaQuery : PaginationFilter, IRequest<PaginationResponse<TieuChiDanhGiaDto>>
{
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public string? KieuTieuChi { get; set; }
    public string? DonViTinh { get; set; }
    public string? LoaiDiem { get; set; }
  
    public bool? Removed { get; set; } = false;
    public bool? Active { get; set; } = null;
    public bool? FilterByUserRole { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
