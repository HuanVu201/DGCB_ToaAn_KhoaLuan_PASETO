using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp.Commands;
public class AddTrangThaiDanhGiaCommandHandler : ICommandHandler<AddTrangThaiDanhGiaCommand, Guid>
{
    private readonly IRepositoryWithEvents<TrangThaiDanhGia> _repositoryWithEvents;
    public AddTrangThaiDanhGiaCommandHandler(IRepositoryWithEvents<TrangThaiDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddTrangThaiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var trangThaiDanhGia = TrangThaiDanhGia.Create(request.Ten, request.Ma, request.Active, request.LaTrangThaiDonVi);
        await _repositoryWithEvents.AddAsync(trangThaiDanhGia, cancellationToken);
        return Result<Guid>.Success(trangThaiDanhGia.Id);
    }
}
