using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.APITichHopApp.Commands;
public class AddAPITichHopCommandHandler : ICommandHandler<AddAPITichHopCommand, Guid>
{
    private readonly IRepositoryWithEvents<APITichHop> _repositoryWithEvents;
    public AddAPITichHopCommandHandler(IRepositoryWithEvents<APITichHop> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddAPITichHopCommand request, CancellationToken cancellationToken)
    {
        var apiTichHop = APITichHop.Create(request.Ten, request.Ma, request.Url, request.Input, request.Output, request.PhuongThuc,request.MoTa, request.LoaiDichVu, request.LoaiQuanLy, request.SuDung);
        await _repositoryWithEvents.AddAsync(apiTichHop, cancellationToken);
        return Result<Guid>.Success(apiTichHop.Id);
    }
}
