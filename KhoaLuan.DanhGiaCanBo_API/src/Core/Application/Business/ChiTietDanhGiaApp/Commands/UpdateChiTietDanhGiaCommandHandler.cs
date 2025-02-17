using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Commands;

public class UpdateDanhGiaCommandHandler : ICommandHandler<UpdateChiTietDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<ChiTietDanhGia> _repositoryWithEvents;

    public UpdateDanhGiaCommandHandler(IRepositoryWithEvents<ChiTietDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateChiTietDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ChiTietDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.TenMauPhieu, request.MaMauPhieu, request.MaPhieu, request.ChiTietDiemLanhDaoDanhGia, request.ChiTietDiemTuDanhGia, request.ChiTietDiemThamMuu, request.ChiTietDiemNhanXet, request.ChiTietDiemDanhGia,
            request.DataTuDanhGia, request.DataNhanXet, request.DataThamMuu, request.DataLanhDaoDanhGia, request.DiemDanhGia, request.DiemTuDanhGia, request.DiemNhanXet, request.DiemThamMuu, request.DiemLanhDaoDanhGia, request.ThuTu,
            request.HasDiemLietTuDanhGia, request.HasDiemLietNhanXet, request.HasDiemLietThamMuu, request.HasDiemLietLanhDaoDanhGia, request.DataKhieuNai, request.DataXuLyKhieuNai, request.SoLuongKhieuNai);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
