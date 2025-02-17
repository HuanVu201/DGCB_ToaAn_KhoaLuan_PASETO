using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Commands;
public class DeleteScreenActionCommandHandler : ICommandHandler<DeleteScreenActionCommand>
{
    private readonly IRepositoryWithEvents<Domain.Business.ScreenAction> _repositoryWithEvents;
    public DeleteScreenActionCommandHandler(IRepositoryWithEvents<Domain.Business.ScreenAction> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteScreenActionCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ScreenAction với mã: {request.Id} chưa được thêm vào hệ thống");
        await _repositoryWithEvents.DeleteAsync(itemExitst);
        return (Result)Result.Success();
    }
}
