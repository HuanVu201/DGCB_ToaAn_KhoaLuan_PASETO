using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Queries;

public class GetByCodeSpec : Specification<Config>, ISingleResultSpecification
{
    public GetByCodeSpec(string code)
    {
        Query.Where(x => x.Code == code).Where(x => x.DeletedOn == null);
    }
}

public class GetByCodeQueryHandler : IQueryHandler<GetByCodeQuery, ConfigDto>
{
    private readonly IReadRepository<Config> _readRepository;
    public GetByCodeQueryHandler(IReadRepository<Config> readRepository) => _readRepository = readRepository;
    public async Task<Result<ConfigDto>> Handle(GetByCodeQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetByCodeSpec(request.maConfig), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Cấu hình với mã: {request.maConfig} chưa được thêm vào hệ thống");
        var res = item.Adapt<ConfigDto>();
        return Result<ConfigDto>.Success(res);
    }
}
