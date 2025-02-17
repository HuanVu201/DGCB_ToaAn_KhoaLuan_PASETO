using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.MenuApp.Commands;
public class AddMenuCommandHandler : ICommandHandler<AddMenuCommand, Guid>
{
    private readonly IRepositoryWithEvents<Menu> _repositoryWithEvents;
    public AddMenuCommandHandler(IRepositoryWithEvents<Menu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddMenuCommand request, CancellationToken cancellationToken)
    {
        var menu = Menu.Create(request.TenMenu, request.ParentId, request.ThuTuMenu, request.Active, request.Module, request.FullPath, request.IconName, request.Permission, request.IsTopMenu);
        var result = await _repositoryWithEvents.AddAsync(menu, cancellationToken);
        return Result<Guid>.Success(menu.Id);
    }
}
