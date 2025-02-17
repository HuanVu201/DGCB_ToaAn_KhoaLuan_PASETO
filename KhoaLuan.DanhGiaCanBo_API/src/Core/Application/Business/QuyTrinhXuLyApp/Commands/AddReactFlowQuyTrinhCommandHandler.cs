using Newtonsoft.Json;
using System.Text.Json.Nodes;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;

public class AddReactFlowQuyTrinhCommandHandler : ICommandHandler<AddReactFlowQuyTrinhCommand>
{
    private readonly IRepository<BuocXuLy> _repositoryBuocXuLy;
    private readonly IRepository<LienKetBuocXuLy> _repositoryLienKetBuocXuLy;
    private readonly IRepository<QuyTrinhXuLy> _quyTrinhXuLyRepo;
    private readonly ILogger<AddReactFlowQuyTrinhCommandHandler> _logger;

    public AddReactFlowQuyTrinhCommandHandler(
        IRepository<BuocXuLy> repositoryBuocXuLy,
        IRepository<LienKetBuocXuLy> repositoryLienKetBuocXuLy,
        IRepository<QuyTrinhXuLy> quyTrinhXuLyRepo,
        ILogger<AddReactFlowQuyTrinhCommandHandler> logger)
    {
        _repositoryBuocXuLy = repositoryBuocXuLy;
        _repositoryLienKetBuocXuLy = repositoryLienKetBuocXuLy;
        _quyTrinhXuLyRepo = quyTrinhXuLyRepo;
        _logger = logger;
    }

    public async Task<Result> Handle(AddReactFlowQuyTrinhCommand request, CancellationToken cancellationToken)
    {
        QuyTrinhXuLy? quyTrinhXuLy = await _quyTrinhXuLyRepo.GetByIdAsync(request.QuyTrinhXuLyId, cancellationToken);
        if(quyTrinhXuLy == null)
        {
            throw new NotFoundException($"Quy trình xử lý với Id: {request.QuyTrinhXuLyId} trên hệ thống");
        }
        try
        {
           
            quyTrinhXuLy.AddBuocXuLy(request.BuocXuLys);
            quyTrinhXuLy.AddLienKetBuocXuLy(request.LienKetBuocXuLys);

            await _quyTrinhXuLyRepo.UpdateAsync(quyTrinhXuLy);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError("{Name}: Thêm mới quy trình thất bại req: {Req}, res: {Res}", new
            {
                Name = nameof(AddReactFlowQuyTrinhCommandHandler),
                Req = JsonConvert.SerializeObject(request),
                Res = ex.ToString()
            });
            return (Result)Result.Fail("Có lỗi xảy ra!");
        }
    }
}
