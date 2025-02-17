using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.VetXuLyDanhGiaDonViApp.Commands;
public class DeleteVetXuLyDanhGiaDonViCommandHandler : ICommandHandler<DeleteVetXuLyDanhGiaDonViCommand>
{
    private readonly IRepository<VetXuLyDanhGiaDonVi> _repositoryWithEvents;
    public DeleteVetXuLyDanhGiaDonViCommandHandler(IRepository<VetXuLyDanhGiaDonVi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteVetXuLyDanhGiaDonViCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"VetXuLyDanhGiaDonVi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}