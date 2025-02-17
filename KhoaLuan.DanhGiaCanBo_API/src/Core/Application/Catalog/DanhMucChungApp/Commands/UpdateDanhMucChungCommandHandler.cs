using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.DanhMucChungApp.Commands;

public class UpdateDanhMucChungCommandHandler : ICommandHandler<UpdateDanhMucChungCommand>
{
    private readonly IRepositoryWithEvents<DanhMucChung> _repositoryWithEvents;

    public UpdateDanhMucChungCommandHandler(IRepositoryWithEvents<DanhMucChung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateDanhMucChungCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhMucChung với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedDanhMucChung = itemExitst.Update(request.TenDanhMuc, request.Code, request.ThuTu, request.Active, request.Type, request.DuocChamNhieuLan,request.DinhKem);
        await _repositoryWithEvents.UpdateAsync(updatedDanhMucChung, cancellationToken);
        return (Result)Result.Success();
    }
}
