using Mapster;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;

public class GetReactFlowQuyTrinhXuLySpec : Specification<QuyTrinhXuLy>, ISingleResultSpecification
{
    public GetReactFlowQuyTrinhXuLySpec(GetReactFlowQuyTrinhXuLyQuery request)
    {
        Query.Where(x => x.Id == request.Id).AsNoTracking()
            .Include(x => x.BuocXuLys).ThenInclude(x => x.TrangThaiDanhGia)
            .Include(x => x.LienKetBuocXuLys).AsSplitQuery();
    }
}

public class GetReactFlowQuyTrinhXuLyQueryHandler : IQueryHandler<GetReactFlowQuyTrinhXuLyQuery, ReactFlowQuyTrinhXuLyDto>
{
    private readonly IReadRepository<QuyTrinhXuLy> _quyTrinhXuLyRepository;
    public GetReactFlowQuyTrinhXuLyQueryHandler(IReadRepository<QuyTrinhXuLy> quyTrinhXuLyRepository)
    {
        _quyTrinhXuLyRepository = quyTrinhXuLyRepository;
    }
    public async Task<Result<ReactFlowQuyTrinhXuLyDto>> Handle(GetReactFlowQuyTrinhXuLyQuery request, CancellationToken cancellationToken)
    {
        var datas = await _quyTrinhXuLyRepository.FirstOrDefaultAsync(new GetReactFlowQuyTrinhXuLySpec(request), cancellationToken);
        if (datas == null)
            throw new NotFoundException($"Quy trình với mã: {request.Id} chưa được thêm vào hệ thống");
        List<ReactFlowNodeDto> nodes = datas.BuocXuLys.Select(x => new ReactFlowNodeDto(x)).ToList();
        List<ReactFlowEdgeDto> edges = datas.LienKetBuocXuLys.Select(x => new ReactFlowEdgeDto(x)).ToList();

        return Result<ReactFlowQuyTrinhXuLyDto>.Success(new ReactFlowQuyTrinhXuLyDto()
        {
            Edges = edges,
            Nodes = nodes
        });
    }
}
