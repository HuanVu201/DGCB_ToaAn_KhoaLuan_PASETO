using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.APITichHopApp.Commands;
public class RestoreAPITichHopCommandHandler : ICommandHandler<RestoreAPITichHopCommand>
{
    private readonly IRepositoryWithEvents<APITichHop> _repositoryWithEvents;
    public RestoreAPITichHopCommandHandler(IRepositoryWithEvents<APITichHop> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreAPITichHopCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"APITichHop với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
