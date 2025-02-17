using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class GetDanhGiaByIdSpec : Specification<DanhGia>, ISingleResultSpecification
{
    public GetDanhGiaByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetDanhGiaQueryHandler : IQueryHandler<GetDanhGiaQuery, DanhGia>
{
    private readonly IReadRepository<DanhGia> _readRepository;
    public GetDanhGiaQueryHandler(IReadRepository<DanhGia> readRepository) => _readRepository = readRepository;
    public async Task<Result<DanhGia>> Handle(GetDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDanhGiaByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"DanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<DanhGia>.Success(item);
    }
}
