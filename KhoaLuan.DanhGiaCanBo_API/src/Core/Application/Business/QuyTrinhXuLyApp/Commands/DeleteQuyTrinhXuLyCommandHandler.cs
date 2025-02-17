using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;
public class DeleteActionCommandHandler : ICommandHandler<DeleteQuyTrinhXuLyCommand>
{
    private readonly IRepository<QuyTrinhXuLy> _repositoryWithEvents;
    public DeleteActionCommandHandler(IRepository<QuyTrinhXuLy> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteQuyTrinhXuLyCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuyTrinhXuLy với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
