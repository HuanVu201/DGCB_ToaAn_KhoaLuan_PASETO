using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Commands;

public class UpdateKhoTieuChiCommandHandler : ICommandHandler<UpdateKhoTieuChiCommand>
{
    private readonly IRepositoryWithEvents<KhoTieuChi> _repositoryWithEvents;

    public UpdateKhoTieuChiCommandHandler(IRepositoryWithEvents<KhoTieuChi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateKhoTieuChiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KhoTieuChi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKhoTieuChi = itemExitst.Update(request.MaTieuChi, request.TenTieuChi, request.SuDung, request.DiemTru, request.ThangDiem, request.GhiChu, request.DiemThuong,
            request.DiemLiet, request.DuocChamNhieuLan, request.KiemNhiem, request.DonViTinh, request.SoLan,request.LoaiDiem,request.FullCode,request.ParrentCode,request.ParrentName,request.JsonLienKet,request.JsonDiemLiet,request.TieuChiLienKet,request.STT,request.ThuTu);
        await _repositoryWithEvents.UpdateAsync(updatedKhoTieuChi, cancellationToken);
        return (Result)Result.Success();
    }
}
