using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
public class AddChucVuCommandHandler : ICommandHandler<AddChucVuCommand, Guid>
{
    private readonly IRepositoryWithEvents<ChucVu> _repositoryWithEvents;
    public AddChucVuCommandHandler(IRepositoryWithEvents<ChucVu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddChucVuCommand request, CancellationToken cancellationToken)
    {
        var chucVu = ChucVu.Create(request.Ten, request.Ma, request.MoTa, request.Active,request.TenCapDanhGia,request.MaCapDanhGia);
        await _repositoryWithEvents.AddAsync(chucVu, cancellationToken);
        return Result<Guid>.Success(chucVu.Id);
    }
}
