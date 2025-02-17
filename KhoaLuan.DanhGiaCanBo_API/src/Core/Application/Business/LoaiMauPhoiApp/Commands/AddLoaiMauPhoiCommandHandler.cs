using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Commands;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.LoaiMauPhoiApp.Commands;
public class AddLoaiMauPhoiCommandHandler : ICommandHandler<AddLoaiMauPhoiCommand, Guid>
{
    private readonly IRepository<LoaiMauPhoi> _repositoryWithEvents;
    public AddLoaiMauPhoiCommandHandler(IRepository<LoaiMauPhoi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddLoaiMauPhoiCommand request, CancellationToken cancellationToken)
    {
        var loaiMauPhoi = LoaiMauPhoi.Create(request.LoaiPhoi, request.MaMauPhoi, request.TenMaMauPhoi);
        await _repositoryWithEvents.AddAsync(loaiMauPhoi, cancellationToken);
        return Result<Guid>.Success(loaiMauPhoi.Id);

    }
}