using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;


namespace TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp.Queries;

public class GetDSTaiLieuHDSDByIdSpec : Specification<TaiLieuHDSD>, ISingleResultSpecification
{
    public GetDSTaiLieuHDSDByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}
public class GetTaiLieuHDSDQueryHandler : IQueryHandler<GetTaiLieuHDSDQuery, TaiLieuHDSD>
{
    private readonly IReadRepository<TaiLieuHDSD> _readRepository;
    public GetTaiLieuHDSDQueryHandler(IReadRepository<TaiLieuHDSD> readRepository) => _readRepository = readRepository;
    public async Task<Result<TaiLieuHDSD>> Handle(GetTaiLieuHDSDQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDSTaiLieuHDSDByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"DSTaiLieuHDSD với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<TaiLieuHDSD>.Success(item);
    }
}
