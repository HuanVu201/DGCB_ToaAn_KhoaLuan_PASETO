using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Commands;
public class DeleteChildrenGroupCommandHandler : ICommandHandler<DeleteChildrenGroup>
{
    private readonly IRepositoryWithEvents<Group> _repositoryWithEvents;
    private readonly IReadRepository<Group> _readRepository;
    public DeleteChildrenGroupCommandHandler(IRepositoryWithEvents<Group> repositoryWithEvents, IReadRepository<Group> readRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _readRepository = readRepository;
    }

    public async Task<Result> Handle(DeleteChildrenGroup request, CancellationToken cancellationToken)
    {

        List<Group> delGroups = new List<Group>();
       
        var itemExitst = _readRepository.ListAsync().Result;
        if (itemExitst == null)
            throw new NotFoundException($"Cơ cấu tổ chức với mã: {request.parentCode} không chứa nhóm con");
        itemExitst.ForEach(item =>
        {
            if (item.OfGroupCode == request.parentCode)
            {
                item.DeletedOn= DateTime.Now;
                delGroups.Add(item);
            }
        });
        if (request.ForceDelete)
        {
            //await _repositoryWithEvents.DeleteRangeAsync(delGroups);
        }
        else
            await _repositoryWithEvents.UpdateRangeAsync(delGroups);
        return (Result)Result.Success();
    }
}

