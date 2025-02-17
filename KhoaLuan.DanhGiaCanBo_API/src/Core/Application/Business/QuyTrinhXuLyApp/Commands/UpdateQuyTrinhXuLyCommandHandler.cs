using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;

public class UpdateQuyTrinhXuLyDataSpec : SingleResultSpecification<QuyTrinhXuLy>
{
    public UpdateQuyTrinhXuLyDataSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id).Include(x => x.DonVis);
    }
}
public class UpdateQuyTrinhXuLyCommandHandler : ICommandHandler<UpdateQuyTrinhXuLyCommand>
{
    private readonly IRepository<QuyTrinhXuLy> _repositoryWithEvents;

    public UpdateQuyTrinhXuLyCommandHandler(IRepository<QuyTrinhXuLy> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateQuyTrinhXuLyCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetBySpecAsync(new UpdateQuyTrinhXuLyDataSpec((Guid)request.Id), cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuyTrinhXuLy với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedAction = itemExitst.Update(request.TenQuyTrinh, request.ThuTu);
        updatedAction.UpdateDonViSuDungQuyTrinh(request.DonViIds);
        await _repositoryWithEvents.UpdateAsync(updatedAction, cancellationToken);
        return (Result)Result.Success();
    }
}
