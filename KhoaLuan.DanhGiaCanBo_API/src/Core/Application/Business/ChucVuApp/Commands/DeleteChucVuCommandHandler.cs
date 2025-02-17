using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
public class DeleteChucVuCommandHandler : ICommandHandler<DeleteChucVuCommand>
{
    private readonly IRepositoryWithEvents<ChucVu> _repositoryWithEvents;
    public DeleteChucVuCommandHandler(IRepositoryWithEvents<ChucVu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteChucVuCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ChucVu với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
