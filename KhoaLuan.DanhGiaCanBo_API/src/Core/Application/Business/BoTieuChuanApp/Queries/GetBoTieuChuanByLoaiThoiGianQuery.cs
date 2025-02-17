using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Queries;
public class GetBoTieuChuanByLoaiThoiGianQuery : PaginationFilter, IRequest<Result<PaginationResponse<BoTieuChuanDto>>>
{
    public string? LoaiThoiGian { get; set; }
    public string? CurrentDayOfTime { get; set; }
    public string? ThangThuOfThoiGian { get; set; }
    public string? ThoiGianQuery { get; set; }
    public bool? TruongDonVi { get; set; }
    public string? TypeCheck { get; set; } = "DanhGias";
    public string? MaDonVi { get; set; }
    public string? MaPhongBan { get; set; }
    public string? ExtendStartDay { get; set; }
    public string? ExtendEndDay { get; set; }
    public bool? IsCungDonVi { get; set; }
    public bool? Active { get; set; } = null;
    public bool? FilterByUserRole { get; set; } = false;
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
    public bool? Removed { get; set; } = false;
}