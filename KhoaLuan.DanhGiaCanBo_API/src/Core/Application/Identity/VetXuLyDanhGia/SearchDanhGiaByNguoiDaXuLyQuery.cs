namespace TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
public class SearchDanhGiaByNguoiDaXuLyQuery : PaginationFilter
{
    public DefaultIdType? TrangThaiDanhGiaId { get; init; }
    public DefaultIdType? DanhGiaId { get; init; }
}
