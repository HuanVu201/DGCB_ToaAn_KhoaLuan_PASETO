using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ActionApp.Commands;

public class UpdateActionCommandHandler : ICommandHandler<UpdateActionCommand>
{
    private readonly IRepositoryWithEvents<Domain.Business.Action> _repositoryWithEvents;

    public UpdateActionCommandHandler(IRepositoryWithEvents<Domain.Business.Action> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateActionCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Action với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedAction = itemExitst.Update(request.Ten, request.Ma, request.ThuTu, request.Quyen, request.MoTa, request.IconName, request.ColorCode, request.ShowInModal, request.ShowInTable, request.ApplyForUsers, request.ApplyForUserGroups);
        await _repositoryWithEvents.UpdateAsync(updatedAction, cancellationToken);
        return (Result)Result.Success();
    }
}
