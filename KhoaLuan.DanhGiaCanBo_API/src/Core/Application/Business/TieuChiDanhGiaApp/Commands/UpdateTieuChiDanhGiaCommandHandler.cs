using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Commands;

public class UpdateTieuChiDanhGiaCommandHandler : ICommandHandler<UpdateTieuChiDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<TieuChiDanhGia> _repositoryWithEvents;

    public UpdateTieuChiDanhGiaCommandHandler(IRepositoryWithEvents<TieuChiDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateTieuChiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TieuChiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.MaTieuChi, request.MaDayDu, request.TenTieuChi, request.SuDung, request.DiemTru, request.ThuTu, request.ThuTuHienThi, request.ThangDiem, request.GhiChu, request.MaMauPhieuDanhGia,
            request.MaDonVi, request.DiemThuong, request.DiemLiet, request.TieuChiLienKet, request.DuocChamNhieuLan, request.KiemNhiem, request.STT, request.DonViTinh, request.JsonLienKet, request.JsonDiemLiet, request.SoLan, request.MaKhoTieuChi);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
