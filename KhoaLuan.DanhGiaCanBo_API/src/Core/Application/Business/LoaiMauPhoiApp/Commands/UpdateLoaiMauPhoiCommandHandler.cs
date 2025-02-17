using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Commands;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.LoaiMauPhoiApp.Commands;
public class UpdateLoaiMauPhoiCommandHandler : ICommandHandler<UpdateLoaiMauPhoiCommand>
{
    private readonly IRepository<LoaiMauPhoi> _repositoryWithEvents;

    public UpdateLoaiMauPhoiCommandHandler(IRepository<LoaiMauPhoi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateLoaiMauPhoiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"MauPhoi với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedMauPhoi = itemExitst.Update(request.MaMauPhoi, request.TenMaMauPhoi);
        await _repositoryWithEvents.UpdateAsync(updatedMauPhoi, cancellationToken);
        return (Result)Result.Success();
    }
}