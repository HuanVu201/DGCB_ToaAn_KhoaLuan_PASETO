using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Catalog.MenuApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.MenuApp.Queries;

public class GetMenuByIdSpec : Specification<Menu>, ISingleResultSpecification
{
    public GetMenuByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetMenuQueryHandler : IQueryHandler<GetMenuQuery, Menu>
{
    private readonly IReadRepository<Menu> _readRepository;
    public GetMenuQueryHandler(IReadRepository<Menu> readRepository) => _readRepository = readRepository;
    public async Task<Result<Menu>> Handle(GetMenuQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetMenuByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Menu với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<Menu>.Success(item);
    }
}
