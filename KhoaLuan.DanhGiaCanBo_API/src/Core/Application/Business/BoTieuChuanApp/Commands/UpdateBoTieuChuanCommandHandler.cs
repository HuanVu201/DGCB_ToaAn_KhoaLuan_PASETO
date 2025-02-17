using MediatR;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Commands;

public class UpdateBoTieuChuanCommandHandler : ICommandHandler<UpdateBoTieuChuanCommand>
{
    private readonly IRepositoryWithEvents<BoTieuChuan> _repositoryWithEvents;

    public UpdateBoTieuChuanCommandHandler(IRepositoryWithEvents<BoTieuChuan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateBoTieuChuanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"BoTieuChuan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(null, request.TenBoTieuChi, request.SuDung, request.DinhKem, request.SoKyHieu, request.NgayBanHanh, request.CoQuanBanHanh, request.LoaiThoiGian, request.ThoiGian, request.DonVi, request.TuNgay, request.DenNgay, request.CauHinhThoiGianGiaHan, request.MaCapDanhGia, request.CapDanhGia, request.MaDonViDanhGia, request.DonViDanhGia, request.LaDonVi);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
