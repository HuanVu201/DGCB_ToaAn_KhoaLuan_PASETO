using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc.Dtos;

namespace TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc;
public interface IVetXuLyDanhGiaToChucService : ITransientService
{
    Task<Result> Add(DefaultIdType userId, DefaultIdType? buocXuLyId, DefaultIdType danhGiaId, string tenThaoTac, string tenBuocXuLy, string tenNguoiXuLy, string taiKhoanXuLy, bool laNguoiDaXuLy, DefaultIdType trangThaiDanhGiaId, CancellationToken cancellationToken = default);
    Task<Result> Remove(DefaultIdType Id, CancellationToken cancellationToken = default);
    Task<PaginationResponse<DanhSachVetXuLyDanhGiaToChucDto>> GetDatas(SearchVetXuLyDanhGiaToChucQuery req, CancellationToken cancellationToken = default);
    Task<Result<List<DanhSachVetXuLyToChucIdDto>>> GetByBuocXuLy(DefaultIdType buocXuLy, CancellationToken cancellationToken = default);
    Task<PaginationResponse<DanhSachDanhGiaToChucByNguoiDaXuLyDto>> GetDanhGiaByNguoiDaXuLy(SearchDanhGiaToChucByNguoiDaXuLyQuery req, CancellationToken cancellationToken = default);
}
