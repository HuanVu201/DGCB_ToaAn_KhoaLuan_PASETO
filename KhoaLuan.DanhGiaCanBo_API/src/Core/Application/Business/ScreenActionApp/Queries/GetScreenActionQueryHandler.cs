using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Common.Persistence;

namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Queries;

public class GetScreenActionByIdSpec : Specification<Domain.Business.ScreenAction>, ISingleResultSpecification
{
    public GetScreenActionByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetScreenActionQueryHandler : IQueryHandler<GetScreenActionQuery, Domain.Business.ScreenAction>
{
    private readonly IReadRepository<Domain.Business.ScreenAction> _readRepository;
    public GetScreenActionQueryHandler(IReadRepository<Domain.Business.ScreenAction> readRepository) => _readRepository = readRepository;
    public async Task<Result<Domain.Business.ScreenAction>> Handle(GetScreenActionQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetScreenActionByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"ScreenAction với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<Domain.Business.ScreenAction>.Success(item);
    }
}
