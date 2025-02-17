using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Commands;

public class UpdateMauPhieuDanhGiaCommandHandler : ICommandHandler<UpdateMauPhieuDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<MauPhieuDanhGia> _repositoryWithEvents;

    public UpdateMauPhieuDanhGiaCommandHandler(IRepositoryWithEvents<MauPhieuDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateMauPhieuDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"MauPhieuDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        // Ma va xep loai de null

        var updatedMauPhieuDanhGia = itemExitst.Update(request.LevelBoTieuChi,request.Ten,null, request.DiemDatYeuCau, request.DiemThuong, request.DiemTru, null, request.MaCapDanhGia, request.CapDanhGia, request.MaDonViDanhGia, request.DonViDanhGia, request.MaChucVuDanhGia, request.TenChucVuDanhGia
            ,request.MaChucDanhDanhGia, request.TenChucDanhDanhGia, request.MaCaNhanDanhGia, request.CaNhanDanhGia, request.MaBoTieuChi, request.MauImportDanhGia, request.DataTieuChi, request.DinhKem,request.ThuTu,request.SuDung);
        await _repositoryWithEvents.UpdateAsync(updatedMauPhieuDanhGia, cancellationToken);

        return (Result)Result.Success();
    }
}
