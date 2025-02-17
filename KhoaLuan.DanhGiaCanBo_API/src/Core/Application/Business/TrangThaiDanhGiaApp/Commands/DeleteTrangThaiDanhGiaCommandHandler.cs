using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp.Commands;
public class DeleteTrangThaiDanhGiaCommandHandler : ICommandHandler<DeleteTrangThaiDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<TrangThaiDanhGia> _repositoryWithEvents;
    public DeleteTrangThaiDanhGiaCommandHandler(IRepositoryWithEvents<TrangThaiDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteTrangThaiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TrangThaiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.ForceDelete)
        {
            //await _repositoryWithEvents.DeleteAsync(itemExitst);
            //return (Result)Result.Success();
        }

        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
