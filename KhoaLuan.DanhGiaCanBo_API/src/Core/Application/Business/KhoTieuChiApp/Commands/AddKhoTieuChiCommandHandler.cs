using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Commands;
public class AddKhoTieuChiCommandHandler : ICommandHandler<AddKhoTieuChiCommand, Guid>
{
    private readonly IRepositoryWithEvents<KhoTieuChi> _repositoryWithEvents;
    public AddKhoTieuChiCommandHandler(IRepositoryWithEvents<KhoTieuChi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddKhoTieuChiCommand request, CancellationToken cancellationToken)
    {
        if (request.MaTieuChi != null)
        {
           
        }
        else
        {
            request.MaTieuChi = Guid.NewGuid().ToString();
            if(request.FullCode == null)
            {
                request.FullCode = request.MaTieuChi;
            }    
        }
         var khoTieuChi = KhoTieuChi.Create(request.MaTieuChi, request.TenTieuChi, request.SuDung, request.DiemTru, request.ThangDiem, request.GhiChu, request.DiemThuong,
            request.DiemLiet, request.DuocChamNhieuLan, request.KiemNhiem, request.DonViTinh, request.SoLan, request.LoaiDiem, request.FullCode, request.ParrentCode, request.ParrentName, request.JsonLienKet, request.JsonDiemLiet, request.TieuChiLienKet,request.STT,request.ThuTu);
        await _repositoryWithEvents.AddAsync(khoTieuChi, cancellationToken);
        return Result<Guid>.Success(khoTieuChi.Id);
    }
}
