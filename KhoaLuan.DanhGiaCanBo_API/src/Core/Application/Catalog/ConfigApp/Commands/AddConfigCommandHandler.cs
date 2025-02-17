using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Commands;
public class AddConfigCommandHandler : ICommandHandler<AddConfigCommand, Guid>
{
    private readonly IRepositoryWithEvents<Config> _repositoryWithEvents;
    public AddConfigCommandHandler(IRepositoryWithEvents<Config> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddConfigCommand request, CancellationToken cancellationToken)
    {
        var menu = Config.Create(request.Ten, request.Code, request.ThuTu, request.Active, request.Module, request.Content, request.Note);
        await _repositoryWithEvents.AddAsync(menu, cancellationToken);
        return Result<Guid>.Success(menu.Id);
    }
}
