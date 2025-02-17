using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Commands;
public class DeleteXepLoaiDanhGiaCommandHandler : ICommandHandler<DeleteXepLoaiDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<XepLoaiDanhGia> _repositoryWithEvents;
    public DeleteXepLoaiDanhGiaCommandHandler(IRepositoryWithEvents<XepLoaiDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteXepLoaiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"XepLoaiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
