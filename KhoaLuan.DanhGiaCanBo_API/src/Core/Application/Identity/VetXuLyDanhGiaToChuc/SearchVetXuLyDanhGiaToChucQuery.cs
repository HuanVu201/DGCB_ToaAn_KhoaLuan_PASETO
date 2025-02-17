namespace TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc;
public class SearchVetXuLyDanhGiaToChucQuery : PaginationFilter
{
    public DefaultIdType? UserId { get; init; }
    public DefaultIdType? BuocXuLyId { get; init; }
    public DefaultIdType? DanhGiaId { get; init; }
}

public class SearchNguoiDaXuLyDanhGiaToChucValidator : CustomValidator<SearchVetXuLyDanhGiaToChucQuery>
{
    public SearchNguoiDaXuLyDanhGiaToChucValidator()
    {
        RuleFor(x => x).Must(RequiredAtLeastOneParam).WithMessage("Tham số không hợp lệ, vui lòng truyền tham số");
    }

    private bool RequiredAtLeastOneParam(SearchVetXuLyDanhGiaToChucQuery req)
    {
        return req.UserId != null && req.DanhGiaId != Guid.Empty && req.DanhGiaId != null && req.DanhGiaId != Guid.Empty && req.BuocXuLyId != null && req.BuocXuLyId != Guid.Empty;
    }
}