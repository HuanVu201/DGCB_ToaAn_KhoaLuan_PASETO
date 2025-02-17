using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ActionApp.Commands;
public class RestoreActionCommandHandler : ICommandHandler<RestoreActionCommand>
{
    private readonly IRepositoryWithEvents<Domain.Business.Action> _repositoryWithEvents;
    public RestoreActionCommandHandler(IRepositoryWithEvents<Domain.Business.Action> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreActionCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Action với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
