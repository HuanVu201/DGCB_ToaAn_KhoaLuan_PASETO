using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp.Commands;
public class DeleteDanhGiaDonViCommandHandler : ICommandHandler<DeleteDanhGiaDonViCommand>
{
    private readonly IRepositoryWithEvents<ChiTietDanhGiaDonVi> _repositoryWithEvents;
    public DeleteDanhGiaDonViCommandHandler(IRepositoryWithEvents<ChiTietDanhGiaDonVi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteDanhGiaDonViCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ChiTietDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
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
