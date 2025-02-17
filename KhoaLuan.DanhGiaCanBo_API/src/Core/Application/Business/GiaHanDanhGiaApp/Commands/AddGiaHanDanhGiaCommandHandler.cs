using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.GiaHanDanhGiaApp.Commands;
public class AddGiaHanDanhGiaCommandHandler : ICommandHandler<AddGiaHanDanhGiaCommand, Guid>
{
    private readonly IRepository<GiaHanDanhGia> _repositoryWithEvents;
    public AddGiaHanDanhGiaCommandHandler(IRepository<GiaHanDanhGia> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddGiaHanDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var giaHanDanhGia = GiaHanDanhGia.Create(request.NoiDung, request.YKien, request.TrangThai, request.DinhKem, request.MaDonVi, request.MaDonViCha, request.MaBoTieuChi, request.TenBoTieuChi, request.TuNgay, request.DenNgay);
        try
        {
            await _repositoryWithEvents.AddAsync(giaHanDanhGia, cancellationToken);
        }
        catch (Exception ex)
        {
            return Result<Guid>.Fail(message: "Thêm yêu cầu gia hạn thất bại");

        }
        return Result<Guid>.Success(giaHanDanhGia.Id);

    }
}