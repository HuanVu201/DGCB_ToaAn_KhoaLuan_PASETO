using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Commands;
public class RestoreMauPhieuDanhGiaCommandHandler : ICommandHandler<RestoreMauPhieuDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<MauPhieuDanhGia> _repositoryWithEvents;
    public RestoreMauPhieuDanhGiaCommandHandler(IRepositoryWithEvents<MauPhieuDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreMauPhieuDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"MauPhieuDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
