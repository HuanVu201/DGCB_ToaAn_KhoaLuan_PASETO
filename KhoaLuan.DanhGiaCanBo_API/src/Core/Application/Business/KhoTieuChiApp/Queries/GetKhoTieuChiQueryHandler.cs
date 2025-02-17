using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Queries;

public class GetKhoTieuChiByIdSpec : Specification<KhoTieuChi>, ISingleResultSpecification
{
    public GetKhoTieuChiByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetKhoTieuChiQueryHandler : IQueryHandler<GetKhoTieuChiQuery, KhoTieuChi>
{
    private readonly IReadRepository<KhoTieuChi> _readRepository;
    public GetKhoTieuChiQueryHandler(IReadRepository<KhoTieuChi> readRepository) => _readRepository = readRepository;
    public async Task<Result<KhoTieuChi>> Handle(GetKhoTieuChiQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetKhoTieuChiByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"KhoTieuChi với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<KhoTieuChi>.Success(item);
    }
}
