using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Commands;
internal class UpdateLienKetBuocXuLyCommandHandler : ICommandHandler<UpdateLienKetBuocXuLyCommand>
{
    private readonly IRepository<LienKetBuocXuLy> _lienKetBuocXuLyRepo;
    public UpdateLienKetBuocXuLyCommandHandler(IRepository<LienKetBuocXuLy> lienKetBuocXuLyRepo)
    {
        _lienKetBuocXuLyRepo = lienKetBuocXuLyRepo;
    }
    public async Task<Result> Handle(UpdateLienKetBuocXuLyCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _lienKetBuocXuLyRepo.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Liên kết bước xử lý với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedLienKet = itemExitst.SetLabel(request.Label);
        await _lienKetBuocXuLyRepo.UpdateAsync(updatedLienKet, cancellationToken);
        return (Result)Result.Success();
    }
}
