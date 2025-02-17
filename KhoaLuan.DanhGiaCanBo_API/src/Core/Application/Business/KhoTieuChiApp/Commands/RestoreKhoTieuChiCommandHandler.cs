using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Commands;
public class RestoreKhoTieuChiCommandHandler : ICommandHandler<RestoreKhoTieuChiCommand>
{
    private readonly IRepositoryWithEvents<KhoTieuChi> _repositoryWithEvents;
    public RestoreKhoTieuChiCommandHandler(IRepositoryWithEvents<KhoTieuChi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreKhoTieuChiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KhoTieuChi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
