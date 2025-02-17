using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;

public class UpdateChucVuCommandHandler : ICommandHandler<UpdateChucVuCommand>
{
    private readonly IRepositoryWithEvents<ChucVu> _repositoryWithEvents;

    public UpdateChucVuCommandHandler(IRepositoryWithEvents<ChucVu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateChucVuCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ChucVu với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedChucVu = itemExitst.Update(request.Ten, request.Ma, request.MoTa, request.Active,request.TenCapDanhGia,request.MaCapDanhGia);
        await _repositoryWithEvents.UpdateAsync(updatedChucVu, cancellationToken);
        return (Result)Result.Success();
    }
}
