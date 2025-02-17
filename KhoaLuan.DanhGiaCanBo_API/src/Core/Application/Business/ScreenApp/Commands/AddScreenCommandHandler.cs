using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ScreenApp.Commands;
public class AddScreenCommandHandler : ICommandHandler<AddScreenCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<Screen> _repositoryWithEvents;
    public AddScreenCommandHandler(IRepositoryWithEvents<Screen> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddScreenCommand request, CancellationToken cancellationToken)
    {
        var screen = new Screen(request.MoTa, request.Ma, request.ShowActionInModal, request.ShowActionInTable);
        await _repositoryWithEvents.AddAsync(screen, cancellationToken);
        return Result<DefaultIdType>.Success(screen.Id);
    }
}
