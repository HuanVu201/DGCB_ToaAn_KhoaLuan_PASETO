using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Commands;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
public class UpdateUrlPhieuDanhGiaDonViCommandHandler : ICommandHandler<UpdateUrlPhieuDanhGiaDonViCommand>
{
    private readonly IRepository<DanhGiaDonVi> _repositoryWithEvents;

    public UpdateUrlPhieuDanhGiaDonViCommandHandler(IRepository<DanhGiaDonVi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateUrlPhieuDanhGiaDonViCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhGia với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedMauPhoi = itemExitst.UpdateUrlPhieu(request.UrlPdf, request.UrlDocx, request.IsKySoDonVi, request.IsKySoThamMuu, request.IsKySoLanhDao);
        await _repositoryWithEvents.UpdateAsync(updatedMauPhoi, cancellationToken);
        return (Result)Result.Success();
    }
}