using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Queries;


public class SearchBoTieuChuanQuery : PaginationFilter, IRequest<PaginationResponse<BoTieuChuanDto>>
{
    public string? TenBoTieuChi { get; set; }
    public bool? LaDonVi { get; set; } = false;
    public string? Ma { get; set; }
    public string? KieuTieuChi { get; set; }
    public string? DonViTinh { get; set; }
    public string? LoaiDiem { get; set; }
    public string? SoKyHieu { get; set; }
    public bool? SuDung { get; set; }

    public bool? Removed { get; set; } = false;
    public bool? Active { get; set; } = null;
    public bool? FilterByUserRole { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
