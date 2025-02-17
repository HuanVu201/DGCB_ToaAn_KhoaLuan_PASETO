using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Queries;

public class GetBoTieuChuanByIdSpec : Specification<BoTieuChuan>, ISingleResultSpecification
{
    public GetBoTieuChuanByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetBoTieuChuanQueryHandler : IQueryHandler<GetBoTieuChuanQuery, BoTieuChuan>
{
    private readonly IReadRepository<BoTieuChuan> _readRepository;
    public GetBoTieuChuanQueryHandler(IReadRepository<BoTieuChuan> readRepository) => _readRepository = readRepository;
    public async Task<Result<BoTieuChuan>> Handle(GetBoTieuChuanQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetBoTieuChuanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"BoTieuChuan với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<BoTieuChuan>.Success(item);
    }
}
