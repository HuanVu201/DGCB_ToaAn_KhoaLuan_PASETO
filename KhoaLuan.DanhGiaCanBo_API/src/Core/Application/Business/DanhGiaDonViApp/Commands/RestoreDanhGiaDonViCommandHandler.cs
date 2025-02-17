using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;
public class RestoreDanhGiaDonViCommandHandler : ICommandHandler<RestoreDanhGiaDonViCommand>
{
    private readonly IRepositoryWithEvents<DanhGiaDonVi> _repositoryWithEvents;
    public RestoreDanhGiaDonViCommandHandler(IRepositoryWithEvents<DanhGiaDonVi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreDanhGiaDonViCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhGiaDonVi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
