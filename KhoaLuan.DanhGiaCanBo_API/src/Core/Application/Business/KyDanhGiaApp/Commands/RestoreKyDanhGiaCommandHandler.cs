﻿using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp.Commands;
public class RestoreKyDanhGiaCommandHandler : ICommandHandler<RestoreKyDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<KyDanhGia> _repositoryWithEvents;
    public RestoreKyDanhGiaCommandHandler(IRepositoryWithEvents<KyDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreKyDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KyDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
