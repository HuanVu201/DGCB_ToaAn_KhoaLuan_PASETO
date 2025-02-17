using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Commands;
public class DeleteMauPhieuDanhGiaCommandHandler : ICommandHandler<DeleteMauPhieuDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<MauPhieuDanhGia> _repositoryWithEvents;
    public DeleteMauPhieuDanhGiaCommandHandler(IRepositoryWithEvents<MauPhieuDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteMauPhieuDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"MauPhieuDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
