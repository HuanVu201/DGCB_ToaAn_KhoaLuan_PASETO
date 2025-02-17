using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp.Commands;
public class AddTaiLieuHDSDCommandHandler : ICommandHandler<AddTaiLieuHDSDCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<TaiLieuHDSD> _repositoryWithEvents;
    public AddTaiLieuHDSDCommandHandler(IRepositoryWithEvents<TaiLieuHDSD> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddTaiLieuHDSDCommand request, CancellationToken cancellationToken)
    {
        var dsTaiLieuHDSD = TaiLieuHDSD.Create(request.ThuTu, request.TenTaiLieu, request.TepDinhKem, request.MoTa, request.NgayDang, request.TaiLieuDanhCho);
        await _repositoryWithEvents.AddAsync(dsTaiLieuHDSD, cancellationToken);
        return Result<DefaultIdType>.Success(dsTaiLieuHDSD.Id);
    }
}
