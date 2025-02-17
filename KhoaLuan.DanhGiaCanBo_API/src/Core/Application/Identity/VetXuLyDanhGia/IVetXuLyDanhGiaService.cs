using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia.Dtos;

namespace TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
public interface IVetXuLyDanhGiaService : ITransientService
{
    Task<Result> Add(DefaultIdType userId, DefaultIdType? buocXuLyId, DefaultIdType danhGiaId, string tenThaoTac, string tenBuocXuLy, string tenNguoiXuLy, string taiKhoanXuLy, bool laNguoiDaXuLy, DefaultIdType trangThaiDanhGiaId, CancellationToken cancellationToken = default);
    Task<Result> Remove(DefaultIdType Id, CancellationToken cancellationToken = default);
    Task<PaginationResponse<DanhSachVetXuLyDanhGiaDto>> GetDatas(SearchVetXuLyDanhGiaQuery req, CancellationToken cancellationToken = default);
    Task<Result<List<DanhSachVetXuLyIdDto>>> GetByBuocXuLy(DefaultIdType buocXuLy, CancellationToken cancellationToken = default);
    Task<PaginationResponse<DanhSachDanhGiaByNguoiDaXuLyDto>> GetDanhGiaByNguoiDaXuLy(SearchDanhGiaByNguoiDaXuLyQuery req, CancellationToken cancellationToken = default);
}
