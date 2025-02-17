using Ardalis.Specification;
using Org.BouncyCastle.Ocsp;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Models;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc.Dtos;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;
using TD.DanhGiaCanBo.Infrastructure.Auth;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
using TD.DanhGiaCanBo.Infrastructure.Identity.Specifications;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Service;
public class VetXuLyDanhGiaToChucService : IVetXuLyDanhGiaToChucService
{

    private readonly IRepository<VetXuLyDanhGiaToChuc> _repository;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public VetXuLyDanhGiaToChucService(
        IRepository<VetXuLyDanhGiaToChuc> repository,
        IDapperRepository dapperRepository,
        ICurrentUser currentUser)
    {
        _repository = repository;
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<Result> Add(DefaultIdType userId, DefaultIdType? buocXuLyId, DefaultIdType danhGiaId, string tenThaoTac, string tenBuocXuLy, string tenNguoiXuLy, string taiKhoanXuLy, bool laNguoiDaXuLy, DefaultIdType trangThaiDanhGiaId, CancellationToken cancellationToken = default)
    {
        try
        {
            var data = new VetXuLyDanhGiaToChuc(userId, buocXuLyId, danhGiaId, tenThaoTac, tenBuocXuLy, tenNguoiXuLy, taiKhoanXuLy, laNguoiDaXuLy, trangThaiDanhGiaId);
            var res = await _repository.AddAsync(data, cancellationToken);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }
    }

    public async Task<PaginationResponse<DanhSachVetXuLyDanhGiaToChucDto>> GetDatas(SearchVetXuLyDanhGiaToChucQuery req, CancellationToken cancellationToken = default)
    {
        List<string> where = [];
        if (req.BuocXuLyId != null && req.BuocXuLyId != Guid.Empty)
        {
            where.Add($"vxl.{nameof(VetXuLyDanhGiaToChuc.BuocXuLyId)} = @BuocXuLyId");
        }
        if (req.DanhGiaId != null && req.DanhGiaId != Guid.Empty)
        {
            where.Add($"vxl.{nameof(VetXuLyDanhGiaToChuc.DanhGiaId)} = @DanhGiaId");
        }
        if (req.UserId != null && req.UserId != Guid.Empty)
        {
            where.Add($"vxl.{nameof(VetXuLyDanhGiaToChuc.UserId)} = @UserId");
        }

        string sql = $@"SELECT
                        vxl.{nameof(VetXuLyDanhGiaToChuc.Id)},
                        vxl.{nameof(VetXuLyDanhGiaToChuc.TaiKhoanXuLy)},
                        vxl.{nameof(VetXuLyDanhGiaToChuc.BuocXuLyId)},
                        vxl.{nameof(VetXuLyDanhGiaToChuc.UserId)},
                        vxl.{nameof(VetXuLyDanhGiaToChuc.TenThaoTac)},
                        vxl.{nameof(VetXuLyDanhGiaToChuc.TenNguoiXuLy)},
                        vxl.{nameof(VetXuLyDanhGiaToChuc.TenBuocXuLy)},
                        vxl.{nameof(VetXuLyDanhGiaToChuc.CreatedOn)},
                        vxl.{nameof(VetXuLyDanhGiaToChuc.TenTrangThai)},
                        vxl.{nameof(VetXuLyDanhGiaToChuc.MaTrangThai)}

                        FROM {TableNames.VetXuLyDanhGiaToChucs} vxl
                        WHERE {string.Join(" AND ", where)}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhSachVetXuLyDanhGiaToChucDto>(sql, req.PageSize, nameof(VetXuLyDanhGiaToChuc.CreatedOn), page: req.PageNumber, param: req, cancellationToken: cancellationToken);
        return data;
    }

    public async Task<PaginationResponse<DanhSachDanhGiaToChucByNguoiDaXuLyDto>> GetDanhGiaByNguoiDaXuLy(SearchDanhGiaToChucByNguoiDaXuLyQuery req, CancellationToken cancellationToken = default)
    {
        List<string> where = [];
        if (req.TrangThaiDanhGiaId != null && req.TrangThaiDanhGiaId != Guid.Empty)
        {
            where.Add($"vxl.{nameof(VetXuLyDanhGiaToChuc.TrangThaiDanhGiaId)} == @TrangThaiDanhGiaId");
        }
        if (req.DanhGiaId != null && req.DanhGiaId != Guid.Empty)
        {
            where.Add($"vxl.{nameof(VetXuLyDanhGiaToChuc.DanhGiaId)} == @DanhGiaId");
        }
        where.Add($"vxl.{nameof(VetXuLyDanhGiaToChuc.UserId)} == @CurrentUserId");

        string sql = $@"SELECT
                            dg.{nameof(DanhGia.Id)},
                            dg.{nameof(DanhGia.NamDanhGia)},
                            dg.{nameof(DanhGia.DiemDanhGia)},
                            dg.{nameof(DanhGia.NguoiNhanXet)},
                            dg.{nameof(DanhGia.ThoiGianTao)}

                            FROM {TableNames.VetXuLyDanhGiaToChucs} vxl
                                INNER JOIN {TableNames.DanhGias} dg ON dg.{nameof(DanhGia.Id)} = vxl.{nameof(VetXuLyDanhGiaToChuc.DanhGiaId)}
                            WHERE {string.Join(" AND ", where)}";
        var param = new
        {
            req.TrangThaiDanhGiaId,
            req.DanhGiaId,
            CurrentUserId = _currentUser.GetUserId()
        };
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhSachDanhGiaToChucByNguoiDaXuLyDto>(sql, req.PageSize, nameof(DanhGia.ThoiGianTao), page: req.PageNumber, param: param, cancellationToken: cancellationToken);
        return data;
    }

    private class SearchVetXuLyByBuocXuLySpec : Specification<VetXuLyDanhGiaToChuc, DanhSachVetXuLyToChucIdDto>
    {
        public SearchVetXuLyByBuocXuLySpec(DefaultIdType BuocXuLyId, DefaultIdType UserId)
        {
            Query.Where(x => x.BuocXuLyId == BuocXuLyId && x.UserId == UserId);
        }
    }

    public async Task<Result<List<DanhSachVetXuLyToChucIdDto>>> GetByBuocXuLy(DefaultIdType buocXuLy, CancellationToken cancellationToken = default)
    {
        var data = await _repository.ListAsync(new SearchVetXuLyByBuocXuLySpec(buocXuLy, _currentUser.GetUserId()), cancellationToken);
        if (data == null)
        {
            return Result<List<DanhSachVetXuLyToChucIdDto>>.Fail($"Không tồn tại vết xử lý của tài khoản {_currentUser.GetUserName()} với bước xử lý Id: {buocXuLy}");
        }
        return Result<List<DanhSachVetXuLyToChucIdDto>>.Success(data);
    }

    public async Task<Result> Remove(DefaultIdType Id, CancellationToken cancellationToken = default)
    {
        try
        {
            var data = await _repository.GetByIdAsync(Id, cancellationToken);
            if (data == null)
            {
                return (Result)Result.Fail($"Không tìm thấy vết xử lý với Id: {Id}");
            }
            data.SoftDelete(_currentUser.GetUserId());
            await _repository.SaveChangesAsync(cancellationToken);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }
    }
}
