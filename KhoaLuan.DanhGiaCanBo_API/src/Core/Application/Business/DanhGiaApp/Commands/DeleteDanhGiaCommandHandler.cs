using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
public class DeleteDanhGiaCommandHandler : ICommandHandler<DeleteDanhGiaCommand>
{
    private readonly IRepositoryWithEvents<DanhGia> _repositoryWithEvents;
    private readonly IMediator _mdeiator;
    private readonly IDapperRepository _dapperRepository;
    public DeleteDanhGiaCommandHandler(IRepositoryWithEvents<DanhGia> repositoryWithEvents, IMediator mdeiator, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _mdeiator = mdeiator;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(DeleteDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        if (request.ForceDelete == true)
        {
            //await _repositoryWithEvents.DeleteAsync(itemExitst);
            //return (Result)Result.Success();
        }

        var itemDG = itemExitst;
        if (itemDG != null)
        {
            if (!string.IsNullOrEmpty(itemDG.MaPhieu))
                await XoaChiTietPhieu(itemDG.MaPhieu);
        }

        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        var req = new CapNhatDuLieuThongKeCommand()
        {
            Type = "DanhGia",
            XuLy = "Xoa",
            Input = itemDG,
            InputKT = null,
            PhanLoaiCu = null,
            TrangThaiCVCu = null,
        };
        var res = await _mdeiator.Send(req);
        return (Result)Result.Success(message: "Thao tác thành công!");
    }

    public async Task XoaChiTietPhieu(string maPhieu)
    {
        string rel = string.Empty;
        string sqlQuery = "DELETE FROM [Business].[ChiTietDanhGias] WHERE MaPhieu=@MaPhieu";
        await _dapperRepository.ExcuteAsync(sqlQuery, new { MaPhieu = maPhieu });

    }
}
