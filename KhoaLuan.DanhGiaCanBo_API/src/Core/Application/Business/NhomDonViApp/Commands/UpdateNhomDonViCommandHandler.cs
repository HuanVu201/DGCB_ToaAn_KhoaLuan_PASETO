using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Commands;

public class UpdateNhomDonViCommandHandler : ICommandHandler<UpdateNhomDonViCommand>
{
    private readonly IRepositoryWithEvents<NhomDonVi> _repositoryWithEvents;

    public UpdateNhomDonViCommandHandler(IRepositoryWithEvents<NhomDonVi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    private class UpdateNhomDonViCDataSpec : SingleResultSpecification<NhomDonVi>
    {
        public UpdateNhomDonViCDataSpec(DefaultIdType Id)
        {
            Query.Where(x => x.Id == Id).Include(x => x.danhSachNhomDonVis);
        }
    }
    public async Task<Result> Handle(UpdateNhomDonViCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetBySpecAsync(new UpdateNhomDonViCDataSpec((Guid)request.Id), cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"NhomDonVi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedNhomDonVi = itemExitst.Update(request.TenNhom, request.MoTa);
        updatedNhomDonVi.UpdateDonVi(request.DonViIds);
        await _repositoryWithEvents.UpdateAsync(updatedNhomDonVi, cancellationToken);
        return (Result)Result.Success();
    }
}
