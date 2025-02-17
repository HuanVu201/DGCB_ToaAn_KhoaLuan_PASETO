using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.GiaHanDanhGiaApp.Commands;
public class UpdateGiaHanDanhGiaCommandHandler : ICommandHandler<UpdateGiaHanDanhGiaCommand>
{
    private readonly IRepository<GiaHanDanhGia> _repositoryWithEvents;

    public UpdateGiaHanDanhGiaCommandHandler(IRepository<GiaHanDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateGiaHanDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"GiaHanDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedGiaHanDanhGia = itemExitst.Update(request.NoiDung, request.YKien, request.TrangThai, request.DinhKem, request.MaDonVi, request.MaDonViCha, request.MaBoTieuChi, request.TenBoTieuChi, request.TuNgay, request.DenNgay);
        await _repositoryWithEvents.UpdateAsync(updatedGiaHanDanhGia, cancellationToken);
        return (Result)Result.Success();
    }
}