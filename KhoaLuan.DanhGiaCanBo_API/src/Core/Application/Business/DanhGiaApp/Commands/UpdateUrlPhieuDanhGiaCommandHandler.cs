using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Commands;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
public class UpdateUrlPhieuDanhGiaCommandHandler : ICommandHandler<UpdateUrlPhieuDanhGiaCommand>
{
    private readonly IRepository<DanhGia> _repositoryWithEvents;

    public UpdateUrlPhieuDanhGiaCommandHandler(IRepository<DanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateUrlPhieuDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhGia với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedMauPhoi = itemExitst.UpdateUrlPhieu(request.UrlPdf, request.UrlDocx, request.IsKySoCaNhan, request.IsKySoNhanXet, request.IsKySoThamMuu, request.IsKySoLanhDao);
        await _repositoryWithEvents.UpdateAsync(updatedMauPhoi, cancellationToken);
        return (Result)Result.Success();
    }
}