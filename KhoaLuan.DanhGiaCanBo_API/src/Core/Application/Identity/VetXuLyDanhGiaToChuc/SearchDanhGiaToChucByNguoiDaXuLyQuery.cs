namespace TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc;
public class SearchDanhGiaToChucByNguoiDaXuLyQuery : PaginationFilter
{
    public DefaultIdType? TrangThaiDanhGiaId { get; init; }
    public DefaultIdType? DanhGiaId { get; init; }
}
