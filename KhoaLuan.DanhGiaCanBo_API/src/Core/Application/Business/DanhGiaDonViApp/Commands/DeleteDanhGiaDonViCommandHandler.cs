using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;
public class DeleteDanhGiaDonViCommandHandler : ICommandHandler<DeleteDanhGiaDonViCommand>
{
    private readonly IRepositoryWithEvents<DanhGiaDonVi> _repositoryWithEvents;
    private readonly IMediator _mdeiator;
    private readonly IDapperRepository _dapperRepository;
    public DeleteDanhGiaDonViCommandHandler(IRepositoryWithEvents<DanhGiaDonVi> repositoryWithEvents, IMediator mdeiator, IDapperRepository dapperRepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _mdeiator = mdeiator;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> Handle(DeleteDanhGiaDonViCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhGiaDonVi với mã: {request.Id} chưa được thêm vào hệ thống");
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

        return (Result)Result.Success(message: "Thao tác thành công!");
    }

    public async Task XoaChiTietPhieu(string maPhieu)
    {
        string rel = string.Empty;
        string sqlQuery = "DELETE FROM [Business].[ChiTietDanhGiaDonVis] WHERE MaPhieu=@MaPhieu";
        await _dapperRepository.ExcuteAsync(sqlQuery, new { MaPhieu = maPhieu });

    }
}
