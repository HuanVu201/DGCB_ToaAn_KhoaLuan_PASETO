using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAPIApp.Commands;
public class AddLogAPICommandHandler : ICommandHandler<AddLogAPICommand, Guid>
{
    private readonly IRepositoryWithEvents<LogAPI> _repositoryWithEvents;
    public AddLogAPICommandHandler(IRepositoryWithEvents<LogAPI> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddLogAPICommand request, CancellationToken cancellationToken)
    {
        var logAPI = LogAPI.Create(request.Ten, request.Ma, request.TenAPI,  request.LoaiDichVu, request.LoaiQuanLy);
        await _repositoryWithEvents.AddAsync(logAPI, cancellationToken);
        return Result<Guid>.Success(logAPI.Id);
    }
}
