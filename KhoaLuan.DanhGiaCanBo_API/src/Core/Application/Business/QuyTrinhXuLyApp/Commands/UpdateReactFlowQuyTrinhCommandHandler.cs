using Mapster;
using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;
using TD.DanhGiaCanBo.Domain.Business;
using static TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands.UpdateReactFlowQuyTrinhCommand;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;

public class GetReactFlowQuyTrinhXuLyDataSpec : Specification<QuyTrinhXuLy>, ISingleResultSpecification
{
    public GetReactFlowQuyTrinhXuLyDataSpec(DefaultIdType id)
    {
        Query.Where(x => x.Id == id)
            .Include(x => x.LienKetBuocXuLys)
            .Include(x => x.BuocXuLys).AsSplitQuery();
    }
}
public class UpdateReactFlowQuyTrinhCommandHandler : ICommandHandler<UpdateReactFlowQuyTrinhCommand>
{
    private readonly IRepository<QuyTrinhXuLy> _quyTrinhXuLyRepo;
    private readonly ILogger<AddReactFlowQuyTrinhCommandHandler> _logger;
    private readonly ICurrentUser _currentUser;

    public UpdateReactFlowQuyTrinhCommandHandler(
        IRepository<QuyTrinhXuLy> quyTrinhXuLyRepo,
        ILogger<AddReactFlowQuyTrinhCommandHandler> logger,
        ICurrentUser currentUser)
    {
        _quyTrinhXuLyRepo = quyTrinhXuLyRepo;
        _logger = logger;
        _currentUser = currentUser;
    }
    public async Task<Result> Handle(UpdateReactFlowQuyTrinhCommand request, CancellationToken cancellationToken)
    {
        QuyTrinhXuLy? quyTrinhXuLy = await _quyTrinhXuLyRepo.FirstOrDefaultAsync(new GetReactFlowQuyTrinhXuLyDataSpec(request.QuyTrinhXuLyId), cancellationToken);
        if (quyTrinhXuLy == null)
        {
            throw new NotFoundException($"Quy trình xử lý với Id: {request.QuyTrinhXuLyId} trên hệ thống");
        }
        try
        {
            var buocXuLyDatas = request.BuocXuLys.Adapt<List<BuocXuLy>>();
            var lienKetBuocXuLyDatas = request.LienKetBuocXuLys.Adapt<List<LienKetBuocXuLy>>();
            quyTrinhXuLy.UpdateBuocXuLys(buocXuLyDatas);
            quyTrinhXuLy.UpdateLienKetBuocXuLys(lienKetBuocXuLyDatas, deletedBy: _currentUser.GetUserId());
            await _quyTrinhXuLyRepo.UpdateAsync(quyTrinhXuLy);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError("{Name}: cập nhật quy trình thất bại req: {Req}, res: {Res}", new
            {
                Name = nameof(UpdateReactFlowQuyTrinhCommand),
                Req = JsonConvert.SerializeObject(request),
                Res = ex.ToString()
            });
            return (Result)Result.Fail("Có lỗi xảy ra");
        }
    }
}
