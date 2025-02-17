using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Commands;

public class UpdateXepLoaiDanhGiaCommandHandler : ICommandHandler<UpdateXepLoaiDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<XepLoaiDanhGia> _repositoryWithEvents;

    public UpdateXepLoaiDanhGiaCommandHandler(IRepositoryWithEvents<XepLoaiDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateXepLoaiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"XepLoaiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedXepLoaiDanhGia = itemExitst.Update(request.Ten, request.Ma, request.DiemToiThieu, request.DiemToiDa, request.Active, request.MaBoTieuChi, request.TenBoTieuChi);
        await _repositoryWithEvents.UpdateAsync(updatedXepLoaiDanhGia, cancellationToken);
        return (Result)Result.Success();
    }
}
