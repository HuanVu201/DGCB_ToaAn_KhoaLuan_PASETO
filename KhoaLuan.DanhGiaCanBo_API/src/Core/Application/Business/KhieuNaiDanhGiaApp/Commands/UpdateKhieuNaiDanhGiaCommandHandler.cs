using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Commands;
public class UpdateKhieuNaiDanhGiaCommandHandler : ICommandHandler<UpdateKhieuNaiDanhGiaCommand>
{
    private readonly IRepository<KhieuNaiDanhGia> _repositoryWithEvents;
    private readonly ICurrentUser _currentUser;

    public UpdateKhieuNaiDanhGiaCommandHandler(IRepository<KhieuNaiDanhGia> repositoryWithEvents, ICurrentUser currentUser)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = currentUser;
    }

    public async Task<Result> Handle(UpdateKhieuNaiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KhieuNaiDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");

        KhieuNaiDanhGia updatedKhieuNaiDanhGia = new KhieuNaiDanhGia();
        updatedKhieuNaiDanhGia = itemExitst.Update(request.MaPhieu, request.LyDo, request.DinhKemKhieuNai, request.TrangThai, request.MaDonVi, request.MaDonViCha, request.KetQua, request.DinhKemKetQua, request.ThoiGianCapNhat, request.NguoiCapNhatKQId, request.SoLuongKhieuNai);

        await _repositoryWithEvents.UpdateAsync(updatedKhieuNaiDanhGia, cancellationToken);
        return (Result)Result.Success();
    }
}