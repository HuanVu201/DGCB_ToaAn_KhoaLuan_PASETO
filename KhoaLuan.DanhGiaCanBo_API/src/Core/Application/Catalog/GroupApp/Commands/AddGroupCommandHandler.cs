using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Commands;
public class AddGroupCommandHandler : ICommandHandler<AddGroupCommand, Guid>
{
    private readonly IRepositoryWithEvents<Group> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    public AddGroupCommandHandler(IRepositoryWithEvents<Group> repositoryWithEvents,IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<DefaultIdType>> Handle(AddGroupCommand request, CancellationToken cancellationToken)
    {
        var fullCode = string.Empty;
        request.FullCode =await CreateFullCode(request.GroupCode, request.OfGroupCode);
        var group = new Group(request.GroupCode, request.GroupName, request.OfGroupCode, request.OfGroupName, request.OfGroupId, request.FullCode, request.GroupOrder, request.Active,
            request.Description, request.Type, request.Catalog, request.OtherCatalog,request.InChangeId,request.isKhongDanhGia,request.IsKhongThongKe);
        await _repositoryWithEvents.AddAsync(group, cancellationToken);
        return Result<Guid>.Success(group.Id);
    }

    public async Task<string> CreateFullCode(string sonCode, string fatherCode)
    {
        var fullCode = string.Empty;
        if(fatherCode != null)
        {
            var query = $@"Select GroupCode,OfGroupCode,FullCode FROM {TableNames.Groups}  Where GroupCode  = @FatherCode";
            var itemFatherGruops = await _dapperRepository.QuerySingleAsync<GroupDto>(query, new { FatherCode = fatherCode });
            fullCode = itemFatherGruops.FullCode + "#" + sonCode;
        }    
        else
        {
            fullCode = sonCode;
        }    
        return fullCode;
    }
}
