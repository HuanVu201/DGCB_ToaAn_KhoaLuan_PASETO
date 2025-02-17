using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Catalog.APITichHopApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.APITichHopApp.Queries;

public class GetAPITichHopByIdSpec : Specification<APITichHop>, ISingleResultSpecification
{
    public GetAPITichHopByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetAPITichHopQueryHandler : IQueryHandler<GetAPITichHopQuery, APITichHop>
{
    private readonly IReadRepository<APITichHop> _readRepository;
    public GetAPITichHopQueryHandler(IReadRepository<APITichHop> readRepository) => _readRepository = readRepository;
    public async Task<Result<APITichHop>> Handle(GetAPITichHopQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetAPITichHopByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"APITichHop với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<APITichHop>.Success(item);
    }
}
