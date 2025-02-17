using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Commands;

public class AddBuocXuLyCommandValidator : CustomValidator<AddBuocXuLyCommand>
{
    public AddBuocXuLyCommandValidator()
    {
        RuleForEach(x => x.BuocXuLyChucDanhIds).SetValidator(new GuidValidator());
        RuleForEach(x => x.BuocXuLyChucVuIds).SetValidator(new GuidValidator());
        RuleForEach(x => x.BuocXuLyNhomNguoiDungIds).SetValidator(new GuidValidator());
    }
}
//public class BuocXuLyChucDanhValidator : CustomValidator<BuocXuLyChucDanh>
//{
//    public BuocXuLyChucDanhValidator()
//    {
//        RuleFor(x => x.ChucDanhId).NotNull().NotEmpty();
//    }
//}

//public class BuocXuLyChucVuValidator : CustomValidator<BuocXuLyChucVu>
//{
//    public BuocXuLyChucVuValidator()
//    {
//        RuleFor(x => x.ChucVuId).NotNull().NotEmpty();
//    }
//}

//public class BuocXuLyNhomNguoiDungValidator : CustomValidator<BuocXuLyNhomNguoiDung>
//{
//    public BuocXuLyNhomNguoiDungValidator()
//    {
//        RuleFor(x => x.NhomNguoiDungId).NotNull().NotEmpty();
//    }
//}

public class AddBuocXuLyCommandHandler : ICommandHandler<AddBuocXuLyCommand, DefaultIdType>
{
    private readonly IRepository<BuocXuLy> _repositoryWithEvents;
    public AddBuocXuLyCommandHandler(IRepository<BuocXuLy> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddBuocXuLyCommand request, CancellationToken cancellationToken)
    {
        var buocXuLy = new BuocXuLy(request.TenBuoc, (bool)request.LaBuocDauTien, (bool)request.LaBuocCuoiCung, (bool)request.CungDonVi, (bool)request.CungPhongBan, (bool)request.LayNguoiQuanLy
            , (bool)request.LayDonViCapTren, (bool)request.KhongCoChucVu, (bool)request.KhongCoChucDanh, request.QuyTrinhXuLyId, request.TrangThaiDanhGiaId, request.PositionX, request.PositionY,
            request.PositionAbsoluteX, request.PositionAbsoluteY, request.Type, request.Deletable, request.Width, request.Height, request.Selected, request.Dragging, request.ThoiHanXuLy);

        buocXuLy.SetId(request.Id);
        buocXuLy.UpsertChucDanhs(request.BuocXuLyChucDanhIds);
        buocXuLy.UpsertChucVus(request.BuocXuLyChucVuIds);
        buocXuLy.UpsertGroups(request.BuocXuLyDonVis);
        //buocXuLy.UpsertNhomNguoiDungs(request.BuocXuLyNhomNguoiDungIds);

        await _repositoryWithEvents.AddAsync(buocXuLy, cancellationToken);
        return Result<DefaultIdType>.Success(buocXuLy.Id);
    }
}
