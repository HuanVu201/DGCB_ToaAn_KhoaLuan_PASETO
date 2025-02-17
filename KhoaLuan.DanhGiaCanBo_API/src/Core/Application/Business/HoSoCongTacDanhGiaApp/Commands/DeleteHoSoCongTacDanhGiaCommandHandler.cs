using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.HoSoCongTacDanhGiaApp.Commands;
public class DeleteHoSoCongTacDanhGiaCommandHandler : ICommandHandler<DeleteHoSoCongTacDanhGiaCommand>
{
    private readonly IRepository<HoSoCongTacDanhGia> _repositoryWithEvents;
    public DeleteHoSoCongTacDanhGiaCommandHandler(IRepository<HoSoCongTacDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteHoSoCongTacDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"HoSoCongTacDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}