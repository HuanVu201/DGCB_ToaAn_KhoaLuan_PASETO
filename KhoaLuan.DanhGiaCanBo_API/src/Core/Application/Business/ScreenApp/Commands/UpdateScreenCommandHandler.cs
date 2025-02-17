using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ScreenApp.Commands;

public class UpdateScreenCommandHandler : ICommandHandler<UpdateScreenCommand>
{
    private readonly IRepositoryWithEvents<Screen> _repositoryWithEvents;

    public UpdateScreenCommandHandler(IRepositoryWithEvents<Screen> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateScreenCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Screen với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedScreen = itemExitst.Update(request.MoTa, request.Ma, request.ShowActionInModal, request.ShowActionInTable);
        await _repositoryWithEvents.UpdateAsync(updatedScreen, cancellationToken);
        return (Result)Result.Success();
    }
}
