using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp.Commands;
public class DeleteTaiLieuHDSDCommandHandler : ICommandHandler<DeleteTaiLieuHDSDCommand>
{
    private readonly IRepositoryWithEvents<TaiLieuHDSD> _repositoryWithEvents;
    public DeleteTaiLieuHDSDCommandHandler(IRepositoryWithEvents<TaiLieuHDSD> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteTaiLieuHDSDCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DSTaiLieuHDSD với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.ForceDelete)
            await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
