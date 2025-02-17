using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Commands;

public class AddMauPhoiCommandHandler : ICommandHandler<AddMauPhoiCommand, Guid>
{
    private readonly IRepository<MauPhoi> _repositoryWithEvents;
    public AddMauPhoiCommandHandler(IRepository<MauPhoi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddMauPhoiCommand request, CancellationToken cancellationToken)
    {
        var mauPhoi = MauPhoi.Create(request.LoaiPhoi, request.MaMauPhoi, request.TenMauPhoi, request.MaDonVi, request.UrlMauPhoi, request.LaPhoiMacDinh, request.CustomerId);
        await _repositoryWithEvents.AddAsync(mauPhoi, cancellationToken);
        return Result<Guid>.Success(mauPhoi.Id);

    }
}