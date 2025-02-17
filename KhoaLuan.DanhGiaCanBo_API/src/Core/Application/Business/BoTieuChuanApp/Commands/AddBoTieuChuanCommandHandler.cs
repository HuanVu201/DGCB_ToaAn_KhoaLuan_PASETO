using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Commands;
public class AddBoTieuChuanCommandHandler : ICommandHandler<AddBoTieuChuanCommand, Guid>
{
    private readonly IRepositoryWithEvents<BoTieuChuan> _repositoryWithEvents;
    public AddBoTieuChuanCommandHandler(IRepositoryWithEvents<BoTieuChuan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddBoTieuChuanCommand request, CancellationToken cancellationToken)
    {
        var boTieuChuan = BoTieuChuan.Create(request.MaBoTieuChi, request.TenBoTieuChi, request.SuDung, request.DinhKem, request.SoKyHieu, request.NgayBanHanh, request.CoQuanBanHanh, request.LoaiThoiGian, request.ThoiGian, request.DonVi, request.TuNgay, request.DenNgay, request.CauHinhThoiGianGiaHan, request.MaCapDanhGia, request.CapDanhGia, request.MaDonViDanhGia, request.DonViDanhGia, request.LaDonVi);
        await _repositoryWithEvents.AddAsync(boTieuChuan, cancellationToken);
        return Result<Guid>.Success(boTieuChuan.Id);
    }
}
