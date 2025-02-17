using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.APITichHopApp.Commands;
public class DeleteAPITichHopCommandHandler : ICommandHandler<DeleteAPITichHopCommand>
{
    private readonly IRepositoryWithEvents<APITichHop> _repositoryWithEvents;
    public DeleteAPITichHopCommandHandler(IRepositoryWithEvents<APITichHop> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteAPITichHopCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"APITichHop với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
