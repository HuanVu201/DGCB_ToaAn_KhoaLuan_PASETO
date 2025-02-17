using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.DanhMucChungApp.Commands;
public class AddDanhMucChungCommandHandler : ICommandHandler<AddDanhMucChungCommand, Guid>
{
    private readonly IRepositoryWithEvents<DanhMucChung> _repositoryWithEvents;
    public AddDanhMucChungCommandHandler(IRepositoryWithEvents<DanhMucChung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddDanhMucChungCommand request, CancellationToken cancellationToken)
    {
        var danhMucChung = DanhMucChung.Create(request.TenDanhMuc, request.Code, request.ThuTu, request.Active, request.Type, request.DuocChamNhieuLan,request.DinhKem);
        await _repositoryWithEvents.AddAsync(danhMucChung, cancellationToken);
        return Result<Guid>.Success(danhMucChung.Id);
    }
}
