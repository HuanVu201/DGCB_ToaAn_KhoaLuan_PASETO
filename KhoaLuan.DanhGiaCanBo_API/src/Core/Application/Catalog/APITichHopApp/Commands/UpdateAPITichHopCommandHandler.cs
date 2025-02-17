using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.APITichHopApp.Commands;

public class UpdateAPITichHopCommandHandler : ICommandHandler<UpdateAPITichHopCommand>
{
    private readonly IRepositoryWithEvents<APITichHop> _repositoryWithEvents;

    public UpdateAPITichHopCommandHandler(IRepositoryWithEvents<APITichHop> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateAPITichHopCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"APITichHop với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedAPITichHop = itemExitst.Update(request.Ten, request.Ma, request.Url, request.Input, request.Output, request.PhuongThuc, request.MoTa, request.LoaiDichVu, request.LoaiQuanLy, request.SuDung);
        await _repositoryWithEvents.UpdateAsync(updatedAPITichHop, cancellationToken);
        return (Result)Result.Success();
    }
}
