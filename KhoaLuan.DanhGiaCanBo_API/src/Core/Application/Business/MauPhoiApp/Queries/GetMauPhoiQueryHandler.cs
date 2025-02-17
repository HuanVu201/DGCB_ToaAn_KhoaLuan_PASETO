using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
public class GetMauPhoiByIdSpec : Specification<MauPhoi>, ISingleResultSpecification
{
    public GetMauPhoiByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetMauPhoiQueryHandler : IQueryHandler<GetMauPhoiQuery, MauPhoi>
{
    private readonly IReadRepository<MauPhoi> _readRepository;
    public GetMauPhoiQueryHandler(IReadRepository<MauPhoi> readRepository) => _readRepository = readRepository;
    public async Task<Result<MauPhoi>> Handle(GetMauPhoiQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetMauPhoiByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"MauPhoi với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<MauPhoi>.Success(item);
    }
}