using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp.Commands;

public class UpdateTrangThaiDanhGiaCommandHandler : ICommandHandler<UpdateTrangThaiDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<TrangThaiDanhGia> _repositoryWithEvents;

    public UpdateTrangThaiDanhGiaCommandHandler(IRepositoryWithEvents<TrangThaiDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateTrangThaiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TrangThaiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.Ten, request.Ma, request.Active, request.LaTrangThaiDonVi);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
