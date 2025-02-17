using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Commands;
public class DeleteNhomDonViCommandHandler : ICommandHandler<DeleteNhomDonViCommand>
{
    private readonly IRepositoryWithEvents<NhomDonVi> _repositoryWithEvents;
    public DeleteNhomDonViCommandHandler(IRepositoryWithEvents<NhomDonVi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteNhomDonViCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"NhomDonVi với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
