using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;

public class GetTieuChiDanhGiaByIdSpec : Specification<TieuChiDanhGia>, ISingleResultSpecification
{
    public GetTieuChiDanhGiaByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
        
    }
}

public class GetTieuChiDanhGiaQueryHandler : IQueryHandler<GetTieuChiDanhGiaQuery, TieuChiDanhGia>
{
    private readonly IReadRepository<TieuChiDanhGia> _readRepository;
    public GetTieuChiDanhGiaQueryHandler(IReadRepository<TieuChiDanhGia> readRepository) => _readRepository = readRepository;
    public async Task<Result<TieuChiDanhGia>> Handle(GetTieuChiDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetTieuChiDanhGiaByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"TieuChiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<TieuChiDanhGia>.Success(item);
    }
}
