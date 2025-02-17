using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp.Queries;


public class SearchTrangThaiDanhGiaQuery : PaginationFilter, IRequest<PaginationResponse<TrangThaiDanhGiaDto>>
{
    [MaxLength(200)]
    public string? Ten { get; set; }
    [MaxLength(100)]
    public string? Ma { get; set; }
    public bool? Removed { get; set; } = false;
    public bool? Active { get; set; } = null;
    public bool? FilterByUserRole { get; set; } = false;
    public bool? LaTrangThaiDonVi { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
