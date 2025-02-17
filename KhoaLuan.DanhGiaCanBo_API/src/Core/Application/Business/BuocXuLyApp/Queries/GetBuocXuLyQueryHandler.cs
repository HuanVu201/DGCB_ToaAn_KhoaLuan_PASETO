using Mapster;
using MapsterMapper;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ActionApp.Dtos;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;
using TD.DanhGiaCanBo.Application.Business.ScreenActionApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Queries;

public class GetBuocXuLyByIdSpec : Specification<BuocXuLy, ReactFlowNodeDto>, ISingleResultSpecification
{
    public GetBuocXuLyByIdSpec(DefaultIdType id, GetBuocXuLyQuery.Include includeTable)
    {
        Query.Select(x => new ReactFlowNodeDto(
            x,
            includeTable.InCludeChucDanh ? x.BuocXuLyChucDanhs : null,
            includeTable.InCludeChucVu ? x.BuocXuLyChucVus : null,
            includeTable.InCludeNhomNguoiDung ? x.BuocXuLyNhomNguoiDungs : null,
            includeTable.InCludeDonVi ? x.DonVis : null,
            includeTable.InCludeSource ? x.Sources : null,
            includeTable.InCludeTarget ? x.Targets : null)).Where(x => x.Id == id).AsNoTracking().AsSplitQuery();
        if (includeTable.InCludeChucVu)
        {
            Query.Include(x => x.BuocXuLyChucVus).ThenInclude(x => x.ChucVu);
        }
        if (includeTable.InCludeChucDanh)
        {
            Query.Include(x => x.BuocXuLyChucDanhs).ThenInclude(x => x.ChucDanh);
        }
        if (includeTable.InCludeDonVi)
        {
            Query.Include(x => x.DonVis).ThenInclude(x => x.NhomDonVi);
        }
        if (includeTable.InCludeNhomNguoiDung)
        {
            Query.Include(x => x.BuocXuLyNhomNguoiDungs).ThenInclude(x => x.NhomNguoiDung);
        }
        if (includeTable.InCludeTrangThaiDanhGia)
        {
            Query.Include(x => x.TrangThaiDanhGia);
        }
        if (includeTable.InCludeSource)
        {
            Query.Include(x => x.Sources);
        }
        if (includeTable.InCludeTarget)
        {
            Query.Include(x => x.Targets);
        }
    }
}

public class GetBuocXuLyQueryHandler : IQueryHandler<GetBuocXuLyQuery, ReactFlowNodeDto>
{
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;
    public GetBuocXuLyQueryHandler(IReadRepository<BuocXuLy> buocXuLyRepo)
    {
        _buocXuLyRepo = buocXuLyRepo;
    }
    public async Task<Result<ReactFlowNodeDto>> Handle(GetBuocXuLyQuery request, CancellationToken cancellationToken)
    {
        var buocXuLy = await _buocXuLyRepo.GetBySpecAsync(new GetBuocXuLyByIdSpec(request.Id, request.IncludeTable), cancellationToken) ??
            throw new NotFoundException($"Bước xử lý với Id: {request.Id} không tồn tại hoặc đã bị xóa");
        return Result<ReactFlowNodeDto>.Success(data: buocXuLy);
    }
}
