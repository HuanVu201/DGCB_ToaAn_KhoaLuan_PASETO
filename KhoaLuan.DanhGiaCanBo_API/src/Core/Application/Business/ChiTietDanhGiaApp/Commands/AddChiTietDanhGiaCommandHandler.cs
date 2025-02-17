using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Commands;
public class AddChiTietDanhGiaCommandHandler : ICommandHandler<AddChiTietDanhGiaCommand, Guid>
{
    private readonly IRepositoryWithEvents<ChiTietDanhGia> _repositoryWithEvents;
    public AddChiTietDanhGiaCommandHandler(IRepositoryWithEvents<ChiTietDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddChiTietDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var chiTietDanhGia = ChiTietDanhGia.Create(request.TenMauPhieu, request.MaMauPhieu, request.MaPhieu, request.ChiTietDiemLanhDaoDanhGia, request.ChiTietDiemTuDanhGia, request.ChiTietDiemThamMuu, request.ChiTietDiemNhanXet, request.ChiTietDiemDanhGia,
            request.DataTuDanhGia, request.DataNhanXet, request.DataThamMuu, request.DataLanhDaoDanhGia, request.DiemDanhGia, request.DiemTuDanhGia, request.DiemNhanXet, request.DiemThamMuu, request.DiemLanhDaoDanhGia, request.ThuTu, request.ScorePoint,
            request.HasDiemLietTuDanhGia, request.HasDiemLietNhanXet, request.HasDiemLietThamMuu, request.HasDiemLietLanhDaoDanhGia, request.DataKhieuNai, request.DataXuLyKhieuNai, request.SoLuongKhieuNai);
        await _repositoryWithEvents.AddAsync(chiTietDanhGia, cancellationToken);
        return Result<Guid>.Success(chiTietDanhGia.Id);
    }
}
