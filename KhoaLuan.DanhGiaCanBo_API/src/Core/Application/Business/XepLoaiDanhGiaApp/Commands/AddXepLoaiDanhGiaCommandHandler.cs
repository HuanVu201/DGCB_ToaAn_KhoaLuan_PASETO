using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Commands;
public class AddXepLoaiDanhGiaCommandHandler : ICommandHandler<AddXepLoaiDanhGiaCommand, Guid>
{
    private readonly IRepositoryWithEvents<XepLoaiDanhGia> _repositoryWithEvents;
    public AddXepLoaiDanhGiaCommandHandler(IRepositoryWithEvents<XepLoaiDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddXepLoaiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var xepLoaiDanhGia = XepLoaiDanhGia.Create(request.Ten, request.Ma, request.DiemToiThieu, request.DiemToiDa, request.Active, request.MaBoTieuChi, request.TenBoTieuChi);
        await _repositoryWithEvents.AddAsync(xepLoaiDanhGia, cancellationToken);
        return Result<Guid>.Success(xepLoaiDanhGia.Id);
    }
}
