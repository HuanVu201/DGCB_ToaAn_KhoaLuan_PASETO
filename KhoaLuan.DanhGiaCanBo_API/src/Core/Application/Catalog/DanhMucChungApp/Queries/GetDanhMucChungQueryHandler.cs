using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Catalog.DanhMucChungApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.DanhMucChungApp.Queries;

public class GetDanhMucChungByIdSpec : Specification<DanhMucChung>, ISingleResultSpecification
{
    public GetDanhMucChungByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetDanhMucChungQueryHandler : IQueryHandler<GetDanhMucChungQuery, DanhMucChung>
{
    private readonly IReadRepository<DanhMucChung> _readRepository;
    public GetDanhMucChungQueryHandler(IReadRepository<DanhMucChung> readRepository) => _readRepository = readRepository;
    public async Task<Result<DanhMucChung>> Handle(GetDanhMucChungQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDanhMucChungByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"DanhMucChung với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<DanhMucChung>.Success(item);
    }
}
