using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp.Queries;

public class GetTrangThaiDanhGiaByIdSpec : Specification<TrangThaiDanhGia>, ISingleResultSpecification
{
    public GetTrangThaiDanhGiaByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetTrangThaiDanhGiaQueryHandler : IQueryHandler<GetTrangThaiDanhGiaQuery, TrangThaiDanhGia>
{
    private readonly IReadRepository<TrangThaiDanhGia> _readRepository;
    public GetTrangThaiDanhGiaQueryHandler(IReadRepository<TrangThaiDanhGia> readRepository) => _readRepository = readRepository;
    public async Task<Result<TrangThaiDanhGia>> Handle(GetTrangThaiDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetTrangThaiDanhGiaByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"TrangThaiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<TrangThaiDanhGia>.Success(item);
    }
}
