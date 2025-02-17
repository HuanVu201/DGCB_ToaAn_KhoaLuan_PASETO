using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Commands;
public class DeleteTieuChiDanhGiaCommandHandler : ICommandHandler<DeleteTieuChiDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<TieuChiDanhGia> _repositoryWithEvents;
    public DeleteTieuChiDanhGiaCommandHandler(IRepositoryWithEvents<TieuChiDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteTieuChiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TieuChiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
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
