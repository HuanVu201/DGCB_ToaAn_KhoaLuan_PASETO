using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Commands;
public class RestoreTieuChiDanhGiaCommandHandler : ICommandHandler<RestoreTieuChiDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<TieuChiDanhGia> _repositoryWithEvents;
    public RestoreTieuChiDanhGiaCommandHandler(IRepositoryWithEvents<TieuChiDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreTieuChiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TieuChiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
