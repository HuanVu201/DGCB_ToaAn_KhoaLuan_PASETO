using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp.Commands;

public class UpdateKyDanhGiaCommandHandler : ICommandHandler<UpdateKyDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<KyDanhGia> _repositoryWithEvents;

    public UpdateKyDanhGiaCommandHandler(IRepositoryWithEvents<KyDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateKyDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KyDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKyDanhGia = itemExitst.Update(
      request.Ten,
      request.Ma,
      request.TuNgayDanhGia,
      request.DenNgayDanhGia,
      request.ThoiGianGiaHan,
      request.Active
  );
        await _repositoryWithEvents.UpdateAsync(updatedKyDanhGia, cancellationToken);
        return (Result)Result.Success();
    }
}
