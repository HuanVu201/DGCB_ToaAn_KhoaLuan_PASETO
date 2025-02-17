using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.HoSoCongTacDanhGiaApp.Commands;
public class UpdateHoSoCongTacDanhGiaCommandHandler : ICommandHandler<UpdateHoSoCongTacDanhGiaCommand>
{
    private readonly IRepository<HoSoCongTacDanhGia> _repositoryWithEvents;

    public UpdateHoSoCongTacDanhGiaCommandHandler(IRepository<HoSoCongTacDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateHoSoCongTacDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"HoSoCongTacDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedHoSoCongTacDanhGia = itemExitst.Update(request.TenHoSo, request.TenDonVi, request.MaDonVi, request.DKBanKiemDiem, request.DKBanNhanXetCapUy, request.DKBienBanHoiNghiKiemDiem, request.DKKetQuaThamDinhCuaCoQuanThamMuu, request.DKKetLuanDanhGiaXepLoai, request.DKVanBanGoiYKiemDiem, request.DKVanBanThamGiaGopY, request.DKHoSoGiaiQuyetKhieuNaiKienNghi, request.DKCacVanBanKhac);
        await _repositoryWithEvents.UpdateAsync(updatedHoSoCongTacDanhGia, cancellationToken);
        return (Result)Result.Success(message: "Cập nhật hồ sơ thành công");
    }
}