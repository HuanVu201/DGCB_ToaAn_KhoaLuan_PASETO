using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;
public class GetByGroupCodeQuerySpec : Specification<Group>, ISingleResultSpecification
{
    public GetByGroupCodeQuerySpec(string groupCode)
    {
        Query.Where(x => x.GroupCode == groupCode);
    }
}

public class GetByCodeQueryHandler : IQueryHandler<GetByCodeQuery, GroupDto>
{
    private readonly IReadRepository<Group> _readRepository;
    public GetByCodeQueryHandler(IReadRepository<Group> readRepository) => _readRepository = readRepository;
    public async Task<Result<GroupDto>> Handle(GetByCodeQuery request, CancellationToken cancellationToken)
    {
        if(string.IsNullOrEmpty(request.groupCode)) throw new ArgumentNullException(nameof(request.groupCode));
        var item = await _readRepository.FirstOrDefaultAsync(new GetByGroupCodeQuerySpec(request.groupCode), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Group với mã: {request.groupCode} chưa được thêm vào hệ thống");
        var res = item.Adapt<GroupDto>();
        return Result<GroupDto>.Success(res);
    }
}
