using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.NhomNguoiDungApp.Commands;

public class UpdateNhomNguoiDungCommandHandler : ICommandHandler<UpdateNhomNguoiDungCommand>
{
    private readonly IRepositoryWithEvents<NhomNguoiDung> _repositoryWithEvents;

    public UpdateNhomNguoiDungCommandHandler(IRepositoryWithEvents<NhomNguoiDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateNhomNguoiDungCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"NhomNguoiDung với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedNhomNguoiDung = itemExitst.Update(request.Ten, request.Ma, request.MoTa);
        await _repositoryWithEvents.UpdateAsync(updatedNhomNguoiDung, cancellationToken);
        return (Result)Result.Success();
    }
}
