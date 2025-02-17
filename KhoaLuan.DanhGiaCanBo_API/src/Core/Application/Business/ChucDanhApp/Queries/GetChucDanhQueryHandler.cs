using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChucDanhApp;
using TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Dtos;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Queries;

public class GetChucDanhByIdSpec : SingleResultSpecification<ChucDanh, ChucDanhDetailDto>
{
    public GetChucDanhByIdSpec(Guid Id)
    {
        Query
            .Select(x => new ChucDanhDetailDto(x.Ten, x.Ma, x.MoTa, x.TenCapDanhGia, x.MaCapDanhGia,
            x.MauPhieuDanhGias.Select(mp => new ChucDanhDetailDto.MauPhieuDanhGiaDto(mp.MauPhieuDanhGia.Ten, mp.MauPhieuDanhGia.Id)).ToList()))
            .Where(x => x.Id == Id).AsNoTracking();
    }
}

public class GetChucDanhQueryHandler : IQueryHandler<GetChucDanhQuery, ChucDanhDetailDto>
{
    private readonly IReadRepository<ChucDanh> _readRepository;
    public GetChucDanhQueryHandler(IReadRepository<ChucDanh> readRepository) => _readRepository = readRepository;
    public async Task<Result<ChucDanhDetailDto>> Handle(GetChucDanhQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.SingleOrDefaultAsync(new GetChucDanhByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"ChucDanh với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ChucDanhDetailDto>.Success(item);
    }
}
