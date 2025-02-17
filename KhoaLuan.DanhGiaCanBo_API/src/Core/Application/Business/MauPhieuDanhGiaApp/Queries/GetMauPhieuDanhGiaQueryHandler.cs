using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;

public class GetMauPhieuDanhGiaByIdSpec : Specification<MauPhieuDanhGia>, ISingleResultSpecification
{
    public GetMauPhieuDanhGiaByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetMauPhieuDanhGiaQueryHandler : IQueryHandler<GetMauPhieuDanhGiaQuery, MauPhieuDanhGia>
{
    private readonly IReadRepository<MauPhieuDanhGia> _readRepository;
    public GetMauPhieuDanhGiaQueryHandler(IReadRepository<MauPhieuDanhGia> readRepository) => _readRepository = readRepository;
    public async Task<Result<MauPhieuDanhGia>> Handle(GetMauPhieuDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetMauPhieuDanhGiaByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"MauPhieuDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<MauPhieuDanhGia>.Success(item);
    }
}
