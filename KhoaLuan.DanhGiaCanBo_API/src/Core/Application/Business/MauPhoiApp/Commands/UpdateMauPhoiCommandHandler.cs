using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Commands;
public class UpdateMauPhoiCommandHandler : ICommandHandler<UpdateMauPhoiCommand>
{
    private readonly IRepository<MauPhoi> _repositoryWithEvents;

    public UpdateMauPhoiCommandHandler(IRepository<MauPhoi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateMauPhoiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"MauPhoi với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedMauPhoi = itemExitst.Update(request.LoaiPhoi, request.MaMauPhoi, request.TenMauPhoi, request.MaDonVi, request.UrlMauPhoi, request.LaPhoiMacDinh);
        await _repositoryWithEvents.UpdateAsync(updatedMauPhoi, cancellationToken);
        return (Result)Result.Success();
    }
}