using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp.Queries;

public class GetKyDanhGiaByIdSpec : Specification<KyDanhGia>, ISingleResultSpecification
{
    public GetKyDanhGiaByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetKyDanhGiaQueryHandler : IQueryHandler<GetKyDanhGiaQuery, KyDanhGia>
{
    private readonly IReadRepository<KyDanhGia> _readRepository;
    public GetKyDanhGiaQueryHandler(IReadRepository<KyDanhGia> readRepository) => _readRepository = readRepository;
    public async Task<Result<KyDanhGia>> Handle(GetKyDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetKyDanhGiaByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"KyDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<KyDanhGia>.Success(item);
    }
}
