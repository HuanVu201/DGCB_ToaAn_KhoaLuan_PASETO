using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;

public class GetDanhGiaDonViByIdSpec : Specification<DanhGiaDonVi>, ISingleResultSpecification
{
    public GetDanhGiaDonViByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetDanhGiaDonViQueryHandler : IQueryHandler<GetDanhGiaDonViQuery, DanhGiaDonVi>
{
    private readonly IReadRepository<DanhGiaDonVi> _readRepository;
    public GetDanhGiaDonViQueryHandler(IReadRepository<DanhGiaDonVi> readRepository) => _readRepository = readRepository;
    public async Task<Result<DanhGiaDonVi>> Handle(GetDanhGiaDonViQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDanhGiaDonViByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"DanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<DanhGiaDonVi>.Success(item);
    }
}
