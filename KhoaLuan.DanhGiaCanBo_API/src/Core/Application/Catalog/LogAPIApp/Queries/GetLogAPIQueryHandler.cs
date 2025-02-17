using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Catalog.LogAPIApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAPIApp.Queries;

public class GetLogAPIByIdSpec : Specification<LogAPI>, ISingleResultSpecification
{
    public GetLogAPIByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetLogAPIQueryHandler : IQueryHandler<GetLogAPIQuery, LogAPI>
{
    private readonly IReadRepository<LogAPI> _readRepository;
    public GetLogAPIQueryHandler(IReadRepository<LogAPI> readRepository) => _readRepository = readRepository;
    public async Task<Result<LogAPI>> Handle(GetLogAPIQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetLogAPIByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"LogAPI với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<LogAPI>.Success(item);
    }
}
