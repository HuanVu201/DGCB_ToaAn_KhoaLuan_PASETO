using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp.Commands;
public class RestoreTrangThaiDanhGiaCommandHandler : ICommandHandler<RestoreTrangThaiDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<TrangThaiDanhGia> _repositoryWithEvents;
    public RestoreTrangThaiDanhGiaCommandHandler(IRepositoryWithEvents<TrangThaiDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreTrangThaiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TrangThaiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
