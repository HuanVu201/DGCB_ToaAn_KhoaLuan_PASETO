using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;

public class ChuyenBuocDanhGiaCommandValidator : CustomValidator<ChuyenBuocDanhGiaCommand>
{
    public ChuyenBuocDanhGiaCommandValidator()
    {
        RuleFor(x => x.DanhGiaId).NotEmpty().NotEmpty();
        RuleFor(x => x).Must(RequiredTargetIdBaseOnThuHoi).WithMessage("Chuyển tiếp đánh giá yêu cầu bước xử lý tiếp");
        RuleFor(x => x).Must(RequiredTenThaoTacBaseOnThuHoi).WithMessage("Chuyển tiếp đánh giá yêu cầu tên thao tác");
    }
    private bool RequiredTargetIdBaseOnThuHoi(ChuyenBuocDanhGiaCommand req)
    {
        if(req.ThuHoi == false && (req.TargetId == null || req.TargetId == Guid.Empty))
        {
            return false;
        }

        return true;
    }
    private bool RequiredTenThaoTacBaseOnThuHoi(ChuyenBuocDanhGiaCommand req)
    {
        if (req.ThuHoi == false && string.IsNullOrEmpty(req.TenThaoTac))
        {
            return false;
        }

        return true;
    }
}

public class ChuyenBuocDanhGiaCommandHandler : ICommandHandler<ChuyenBuocDanhGiaCommand>
{
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;
    private readonly IRepository<DanhGia> _danhGiaRepo;
    private readonly IVetXuLyDanhGiaService _vetXuLyDanhGiaService;
    private readonly ICurrentUser _currentUser;
    public ChuyenBuocDanhGiaCommandHandler(
        IReadRepository<BuocXuLy> buocXuLyRepo,
        IRepository<DanhGia> danhGiaRepo,
        IVetXuLyDanhGiaService vetXuLyDanhGiaService,
        ICurrentUser currentUser)
    {
        _buocXuLyRepo = buocXuLyRepo;
        _danhGiaRepo = danhGiaRepo;
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
        _currentUser = currentUser;
    }
    public async Task<Result> Handle(ChuyenBuocDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = _currentUser.GetUserGroupId();
        IReadOnlyList<string> userIds = new List<string>() { currentUserId.ToString() };
        var danhGia = await _danhGiaRepo.GetByIdAsync(request.DanhGiaId, cancellationToken) ??
                throw new NotFoundException($"Đánh giá với Id: {request.DanhGiaId} không tồn tại hoặc đã bị xóa");

        if (request.ThuHoi == true)
        {

            if (danhGia.BuocTruocId == null || danhGia.BuocTruocId == Guid.Empty)
            {
                return (Result)Result.Fail("Không thể thu hồi");
            }
            if (danhGia.BuocHienTaiId == null || danhGia.BuocHienTaiId == Guid.Empty)
            {
                return (Result)Result.Fail("Không thể thu hồi do không xác định được bước hiện tại");
            }

            var danhSachVetXuLyBuocHienTai = await _vetXuLyDanhGiaService.GetByBuocXuLy((Guid)danhGia.BuocHienTaiId, cancellationToken);
            if (danhSachVetXuLyBuocHienTai.Data.Count > 1)
            {
                return (Result)Result.Fail("Không thể thu hồi do hồ sơ đã được xử lý");
            }

            DefaultIdType vetXuLyId = danhSachVetXuLyBuocHienTai.Data[0].Id;

            await _vetXuLyDanhGiaService.Remove(vetXuLyId, cancellationToken);
            danhGia.ChuyenBuoc((Guid)danhGia.BuocTruocId, null);
        } else
        {
            var buocXuLy = await _buocXuLyRepo.GetByIdAsync(request.TargetId, cancellationToken) ??
            throw new NotFoundException($"Bước xử lý với Id: {request.TargetId} không tồn tại hoặc đã bị xóa");
            await _vetXuLyDanhGiaService.Add(Guid.Parse(currentUserId), danhGia.BuocHienTaiId, danhGia.Id, request.TenThaoTac, buocXuLy.TenBuoc, _currentUser.GetUserFullName(), _currentUser.GetUserName(), true, buocXuLy.TrangThaiDanhGiaId, cancellationToken);
            danhGia.ChuyenBuoc((Guid)request.TargetId, danhGia.BuocHienTaiId);
        }
        await _danhGiaRepo.SaveChangesAsync(cancellationToken);
        return (Result)Result.Success();
    }
}
