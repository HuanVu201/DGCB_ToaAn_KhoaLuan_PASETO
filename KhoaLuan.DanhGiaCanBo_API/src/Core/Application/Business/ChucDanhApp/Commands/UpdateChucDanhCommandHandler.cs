using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Commands;

public class UpdateChucDanhCommandHandler : ICommandHandler<UpdateChucDanhCommand>
{
    private readonly IRepository<ChucDanh> _repositoryWithEvents;

    public UpdateChucDanhCommandHandler(IRepository<ChucDanh> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    private class GetChucDanhSpec : SingleResultSpecification<ChucDanh>
    {
        public GetChucDanhSpec(DefaultIdType? Id)
        {
            Query.Where(x => x.Id == Id)
                .Include(x => x.MauPhieuDanhGias);
                
        }
    }

    public async Task<Result> Handle(UpdateChucDanhCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.SingleOrDefaultAsync(new GetChucDanhSpec(request.Id), cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ChucDanh với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedChucDanh = itemExitst.Update(request.Ten, request.Ma, request.MoTa, request.Active,request.TenCapDanhGia,request.MaCapDanhGia);
        updatedChucDanh.UpsertMauPhieuDanhGias(request.MauPhieuDanhGiaIds);
        await _repositoryWithEvents.UpdateAsync(updatedChucDanh, cancellationToken);
        return (Result)Result.Success();
    }
}
