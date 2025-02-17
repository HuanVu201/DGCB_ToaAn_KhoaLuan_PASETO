namespace TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
public class SearchVetXuLyDanhGiaQuery : PaginationFilter
{
    public DefaultIdType? UserId { get; init; }
    public DefaultIdType? BuocXuLyId { get; init; }
    public DefaultIdType? DanhGiaId { get; init; }
}

public class SearchNguoiDaXuLyDanhGiaValidator : CustomValidator<SearchVetXuLyDanhGiaQuery>
{
    public SearchNguoiDaXuLyDanhGiaValidator()
    {
        RuleFor(x => x).Must(RequiredAtLeastOneParam).WithMessage("Tham số không hợp lệ, vui lòng truyền tham số");
    }
    private bool RequiredAtLeastOneParam(SearchVetXuLyDanhGiaQuery req)
    {
        return req.UserId != null && req.DanhGiaId != Guid.Empty && req.DanhGiaId != null && req.DanhGiaId != Guid.Empty && req.BuocXuLyId != null && req.BuocXuLyId != Guid.Empty;
    }
}