using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Commands;
public class UpdateBuocXuLyCommandValidator : CustomValidator<UpdateBuocXuLyCommand>
{
    public UpdateBuocXuLyCommandValidator()
    {
        RuleForEach(x => x.BuocXuLyChucDanhIds).SetValidator(new GuidValidator());
        RuleForEach(x => x.BuocXuLyChucVuIds).SetValidator(new GuidValidator());
        RuleForEach(x => x.BuocXuLyNhomNguoiDungIds).SetValidator(new GuidValidator());
    }
}

public class UpdateBuocXuLyByIdSpec : Specification<BuocXuLy>, ISingleResultSpecification
{
    public UpdateBuocXuLyByIdSpec(DefaultIdType id)
    {
        Query.Where(x => x.Id == id).AsSplitQuery()
            .Include(x => x.BuocXuLyChucDanhs)
            .Include(x => x.BuocXuLyChucVus)
            .Include(x => x.DonVis)
            //.Include(x => x.BuocXuLyNhomNguoiDungs)
            .Include(x => x.TrangThaiDanhGia);
    }
}

public class UpdateBuocXuLyCommandHandler : ICommandHandler<UpdateBuocXuLyCommand>
{
    private readonly IRepository<BuocXuLy> _repositoryWithEvents;

    public UpdateBuocXuLyCommandHandler(IRepository<BuocXuLy> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateBuocXuLyCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.FirstOrDefaultAsync(new UpdateBuocXuLyByIdSpec((Guid)request.Id), cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"BuocXuLy với mã: {request.Id} chưa được thêm vào hệ thống");
        var buocXuLy = itemExitst.Update(new BuocXuLy(request.TenBuoc, (bool)request.LaBuocDauTien, (bool)request.LaBuocCuoiCung, (bool)request.CungDonVi, (bool)request.CungPhongBan, (bool)request.LayNguoiQuanLy,
            (bool)request.LayDonViCapTren, (bool)request.KhongCoChucVu, (bool)request.KhongCoChucDanh, request.QuyTrinhXuLyId, request.TrangThaiDanhGiaId, request.PositionX, request.PositionY,
            request.PositionAbsoluteX, request.PositionAbsoluteY, request.Type, request.Deletable, request.Width, request.Height, false, false, request.ThoiHanXuLy));

        buocXuLy.UpsertChucDanhs(request.BuocXuLyChucDanhIds);
        buocXuLy.UpsertGroups(request.BuocXuLyDonVis);
        buocXuLy.UpsertChucVus(request.BuocXuLyChucVuIds);
        //buocXuLy.UpsertNhomNguoiDungs(request.BuocXuLyNhomNguoiDungIds);

        await _repositoryWithEvents.UpdateAsync(buocXuLy, cancellationToken);
        return (Result)Result.Success();
    }
}
