using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Commands;
public class AddKhieuNaiDanhGiaCommandHandler : ICommandHandler<AddKhieuNaiDanhGiaCommand, Guid>
{
    private readonly IRepository<KhieuNaiDanhGia> _repositoryWithEvents;
    public AddKhieuNaiDanhGiaCommandHandler(IRepository<KhieuNaiDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddKhieuNaiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var khieuNaiDanhGia = KhieuNaiDanhGia.Create(request.MaPhieu, request.LyDo, request.DinhKemKhieuNai, request.TrangThai, request.MaDonVi, request.MaDonViCha, request.KetQua, request.DinhKemKetQua, request.ThoiGianCapNhat, request.NguoiCapNhatKQId, request.SoLuongKhieuNai);
        await _repositoryWithEvents.AddAsync(khieuNaiDanhGia, cancellationToken);
        return Result<Guid>.Success(khieuNaiDanhGia.Id);

    }
}