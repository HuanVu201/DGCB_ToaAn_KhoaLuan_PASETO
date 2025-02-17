using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp.Commands;
public class AddKyDanhGiaCommandHandler : ICommandHandler<AddKyDanhGiaCommand, Guid>
{
    private readonly IRepositoryWithEvents<KyDanhGia> _repositoryWithEvents;
    public AddKyDanhGiaCommandHandler(IRepositoryWithEvents<KyDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddKyDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var kyDanhGia = KyDanhGia.Create(
     request.Ten,
     request.Ma,
     request.TuNgayDanhGia,
     request.DenNgayDanhGia,
     request.ThoiGianGiaHan,
     request.Active
 );
        await _repositoryWithEvents.AddAsync(kyDanhGia, cancellationToken);
        return Result<Guid>.Success(kyDanhGia.Id);
    }
}
