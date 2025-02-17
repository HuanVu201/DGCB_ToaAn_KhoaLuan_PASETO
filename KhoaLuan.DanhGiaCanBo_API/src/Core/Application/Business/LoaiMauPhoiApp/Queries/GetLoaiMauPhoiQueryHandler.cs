using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.LoaiMauPhoiApp.Queries;
public class GetLoaiMauPhoiByIdSpec : Specification<LoaiMauPhoi>, ISingleResultSpecification
{
    public GetLoaiMauPhoiByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetLoaiMauPhoiQueryHandler : IQueryHandler<GetLoaiMauPhoiQuery, LoaiMauPhoi>
{
    private readonly IReadRepository<LoaiMauPhoi> _readRepository;
    public GetLoaiMauPhoiQueryHandler(IReadRepository<LoaiMauPhoi> readRepository) => _readRepository = readRepository;
    public async Task<Result<LoaiMauPhoi>> Handle(GetLoaiMauPhoiQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetLoaiMauPhoiByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"LoaiMauPhoi với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<LoaiMauPhoi>.Success(item);
    }
}