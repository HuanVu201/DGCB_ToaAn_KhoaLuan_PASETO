using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Commands;
public class AddMauPhieuDanhGiaCommandHandler : ICommandHandler<AddMauPhieuDanhGiaCommand, Guid>
{
    private readonly IRepositoryWithEvents<MauPhieuDanhGia> _repositoryWithEvents;
    public AddMauPhieuDanhGiaCommandHandler(IRepositoryWithEvents<MauPhieuDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddMauPhieuDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var maTuSinh = Guid.NewGuid().ToString();
        // Ma cua phan nay dc tu sinh ra
        //request.XepLoai  van chua dung den 
        var mauPhieuDanhGia = MauPhieuDanhGia.Create(request.LevelBoTieuChi,request.Ten,maTuSinh, request.DiemDatYeuCau, request.DiemThuong, request.DiemTru,"", request.MaCapDanhGia, request.CapDanhGia, request.MaDonViDanhGia, request.DonViDanhGia, request.MaChucVuDanhGia, request.TenChucVuDanhGia,
            request.MaChucDanhDanhGia, request.TenChucDanhDanhGia, request.MaCaNhanDanhGia, request.CaNhanDanhGia, request.MaBoTieuChi , request.MauImportDanhGia,request.DataTieuChi,request.DinhKem,request.ThuTu,request.Sudung);
        await _repositoryWithEvents.AddAsync(mauPhieuDanhGia, cancellationToken);
        return Result<Guid>.Success(mauPhieuDanhGia.Id);
    }
}
