using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Commands;
public class AddChucDanhCommandHandler : ICommandHandler<AddChucDanhCommand, Guid>
{
    private readonly IRepositoryWithEvents<ChucDanh> _repositoryWithEvents;
    public AddChucDanhCommandHandler(IRepositoryWithEvents<ChucDanh> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddChucDanhCommand request, CancellationToken cancellationToken)
    {
        var chucDanh = ChucDanh.Create(request.Ten, request.Ma, request.MoTa, request.Active,request.TenCapDanhGia,request.MaCapDanhGia);
        chucDanh.UpsertMauPhieuDanhGias(request.MauPhieuDanhGiaIds);
        await _repositoryWithEvents.AddAsync(chucDanh, cancellationToken);
        return Result<Guid>.Success(chucDanh.Id);
    }
}
