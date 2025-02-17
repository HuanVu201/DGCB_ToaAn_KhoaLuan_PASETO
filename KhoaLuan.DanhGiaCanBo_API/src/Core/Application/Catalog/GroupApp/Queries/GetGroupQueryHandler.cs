using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Catalog.GroupApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;

public class GetGroupByIdSpec : Specification<Group>, ISingleResultSpecification
{
    public GetGroupByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetGroupQueryHandler : IQueryHandler<GetGroupQuery, Group>
{
    private readonly IReadRepository<Group> _readRepository;
    public GetGroupQueryHandler(IReadRepository<Group> readRepository) => _readRepository = readRepository;
    public async Task<Result<Group>> Handle(GetGroupQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetGroupByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Cấu hình với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<Group>.Success(item);
    }
}
