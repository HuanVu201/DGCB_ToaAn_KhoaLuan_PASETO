using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.HoSoCongTacDanhGiaApp.Commands;
public class AddHoSoCongTacDanhGiaCommandHandler : ICommandHandler<AddHoSoCongTacDanhGiaCommand, Guid>
{
    private readonly IRepository<HoSoCongTacDanhGia> _repositoryWithEvents;
    public AddHoSoCongTacDanhGiaCommandHandler(IRepository<HoSoCongTacDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddHoSoCongTacDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var hoSoCongTacDanhGia = HoSoCongTacDanhGia.Create(request.DanhGiaId, request.TenHoSo, request.TenDonVi, request.MaDonVi, request.DKBanKiemDiem, request.DKBanNhanXetCapUy, request.DKBienBanHoiNghiKiemDiem, request.DKKetQuaThamDinhCuaCoQuanThamMuu, request.DKKetLuanDanhGiaXepLoai, request.DKVanBanGoiYKiemDiem, request.DKVanBanThamGiaGopY, request.DKHoSoGiaiQuyetKhieuNaiKienNghi, request.DKCacVanBanKhac);
        await _repositoryWithEvents.AddAsync(hoSoCongTacDanhGia, cancellationToken);
        return Result<Guid>.Success(hoSoCongTacDanhGia.Id);

    }
}