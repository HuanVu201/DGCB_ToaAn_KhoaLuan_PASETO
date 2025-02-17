using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Commands;
public class AddNhomDonViCommandHandler : ICommandHandler<AddNhomDonViCommand, Guid>
{
    private readonly IRepositoryWithEvents<NhomDonVi> _repositoryWithEvents;
    public AddNhomDonViCommandHandler(IRepositoryWithEvents<NhomDonVi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddNhomDonViCommand request, CancellationToken cancellationToken)
    {
        var nhomDonVi = new NhomDonVi(request.TenNhom, request.MoTa);
        nhomDonVi.AddDonVis(request.DonViIds);
        await _repositoryWithEvents.AddAsync(nhomDonVi, cancellationToken);
        return Result<Guid>.Success(nhomDonVi.Id);
    }
}
