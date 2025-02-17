using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Queries;

public class GetXepLoaiDanhGiaByIdSpec : Specification<XepLoaiDanhGia>, ISingleResultSpecification
{
    public GetXepLoaiDanhGiaByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetXepLoaiDanhGiaQueryHandler : IQueryHandler<GetXepLoaiDanhGiaQuery, XepLoaiDanhGia>
{
    private readonly IReadRepository<XepLoaiDanhGia> _readRepository;
    public GetXepLoaiDanhGiaQueryHandler(IReadRepository<XepLoaiDanhGia> readRepository) => _readRepository = readRepository;
    public async Task<Result<XepLoaiDanhGia>> Handle(GetXepLoaiDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetXepLoaiDanhGiaByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"XepLoaiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<XepLoaiDanhGia>.Success(item);
    }
}
