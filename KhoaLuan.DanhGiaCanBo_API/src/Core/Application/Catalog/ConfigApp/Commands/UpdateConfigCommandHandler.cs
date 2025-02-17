using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Commands;

public class UpdateConfigCommandHandler : ICommandHandler<UpdateConfigCommand>
{
    private readonly IRepositoryWithEvents<Config> _repositoryWithEvents;

    public UpdateConfigCommandHandler(IRepositoryWithEvents<Config> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateConfigCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Cấu hình với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.Ten, request.Code, request.ThuTu, request.Active, request.Module, request.Content, request.Note);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
