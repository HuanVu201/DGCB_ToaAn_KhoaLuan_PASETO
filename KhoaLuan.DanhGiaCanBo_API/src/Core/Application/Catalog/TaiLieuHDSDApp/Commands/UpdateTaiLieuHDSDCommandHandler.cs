using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp.Commands;
public class UpdateTaiLieuHDSDCommandHandler : ICommandHandler<UpdateTaiLieuHDSDCommand>
{
    private readonly IRepositoryWithEvents<TaiLieuHDSD> _repositoryWithEvents;

    public UpdateTaiLieuHDSDCommandHandler(IRepositoryWithEvents<TaiLieuHDSD> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateTaiLieuHDSDCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DSTaiLieuHDSD với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.ThuTu, request.TenTaiLieu, request.TepDinhKem, request.MoTa, request.NgayDang, request.TaiLieuDanhCho);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
