using MediatR;
using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp;
using TD.DanhGiaCanBo.Application.Common.Models;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;
public class GetMauPhieuDanhGiaByUserAndBoTieuChuanQuery : PaginationFilter, IRequest<Result<PaginationResponse<MauPhieuDanhGiaDto>>>
{
    public Guid? UserId { get; set; }
    public string? TruongDonViUserGroupId { get; set; } // Id của trưởng đơn vị (đánh giá thủ trưởng đơn vị)
    public Guid? MaBoTieuChuan { get; set; }
    public string? MaDonVi { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
