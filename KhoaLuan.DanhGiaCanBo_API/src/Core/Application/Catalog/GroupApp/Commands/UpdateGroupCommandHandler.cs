using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Commands;

public class UpdateGroupCommandHandler : ICommandHandler<UpdateGroupCommand>
{
    private readonly IRepositoryWithEvents<Group> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    public UpdateGroupCommandHandler(IRepositoryWithEvents<Group> repositoryWithEvents, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(UpdateGroupCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Cơ cấu tổ chức với mã: {request.Id} chưa được thêm vào hệ thống");
      if (itemExitst.GroupCode != request.GroupCode)
        {
            var fullCode = string.Empty;
            request.FullCode = await CreateFullCode(request.GroupCode, request.OfGroupCode);
            await UpdateSonFullCode(request.GroupCode, itemExitst.GroupCode);
        }    
        var updatedGroup = itemExitst.Update(request.GroupCode, request.GroupName, request.OfGroupCode, request.OfGroupName,request.OfGroupId, request.FullCode, request.GroupOrder, request.Active,
            request.Description, request.Type, request.Catalog, request.OtherCatalog,request.InChargeID,request.IsKhongDanhGia,request.IsKhongThongKe);
        await _repositoryWithEvents.UpdateAsync(updatedGroup, cancellationToken);

        return (Result)Result.Success();
    }
    public async Task<string> CreateFullCode(string sonCode, string fatherCode)
    {
        var fullCode = string.Empty;
        var query = $@"Select GroupCode,OfGroupCode,FullCode FROM {TableNames.Groups}  Where GroupCode  = @FatherCode";
        var itemFatherGruops = await _dapperRepository.QuerySingleAsync<GroupDto>(query, new { FatherCode = fatherCode });
        fullCode = itemFatherGruops.FullCode + "#" + sonCode;
        return fullCode;
    }

    public async Task<string> UpdateSonFullCode(string newCode, string oldCode)
    {
        var fullCode = string.Empty;
        newCode = newCode + "#";
        oldCode = oldCode + "#";
        var updateQuery = $@"UPDATE {TableNames.DanhGias} 
                         SET FullCode = REPLACE(FullCode, @OldCode, @NewCode) 
                         WHERE FullCode LIKE '%' + @OldCode + '%'";
       await _dapperRepository.ExcuteAsync(updateQuery, new { NewCode = newCode,OldCode = oldCode });
       return fullCode;
    }

}
