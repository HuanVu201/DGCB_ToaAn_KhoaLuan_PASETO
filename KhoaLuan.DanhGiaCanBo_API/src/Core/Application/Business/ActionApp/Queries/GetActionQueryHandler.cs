using Mapster;
using MapsterMapper;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ActionApp.Dtos;
using TD.DanhGiaCanBo.Application.Business.ScreenActionApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Business.ActionApp.Queries;

public class GetActionByIdSpec : Specification<Domain.Business.Action>, ISingleResultSpecification
{
    public GetActionByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetActionQueryHandler : IQueryHandler<GetActionQuery, DetailActionDto>
{
    private readonly IReadRepository<Domain.Business.Action> _readRepository;
    private readonly IDapperRepository _dapperRepository;
    public GetActionQueryHandler(IDapperRepository dapperRepository, IReadRepository<Domain.Business.Action> readRepository)
    {
         _readRepository = readRepository;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<DetailActionDto>> Handle(GetActionQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetActionByIdSpec(request.Id), cancellationToken);
        string sqlGetNguoiTiepNhan = "SELECT Id, UserName FROM [Identity].[Users] WHERE @NguoiTiepNhan LIKE '%' + Id + '%'";
        if (item == null)
            throw new NotFoundException($"Action với mã: {request.Id} chưa được thêm vào hệ thống");
        Mapper mapper = new Mapper();
        mapper.Config.Default.MapToConstructor(true);
        var dto =  mapper.Map<DetailActionDto>(item);
        return Result<DetailActionDto>.Success(dto);
    }
}
