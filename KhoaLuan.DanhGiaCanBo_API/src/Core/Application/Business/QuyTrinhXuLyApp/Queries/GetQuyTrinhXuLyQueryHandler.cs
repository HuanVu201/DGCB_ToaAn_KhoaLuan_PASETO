using Mapster;
using MapsterMapper;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ActionApp.Dtos;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos;
using TD.DanhGiaCanBo.Application.Business.ScreenActionApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;

public class GetQuyTrinhXuLyByIdSpec : SingleResultSpecification<QuyTrinhXuLy, ChiTietQuyTrinhXuLyDto>
{
    public GetQuyTrinhXuLyByIdSpec(DefaultIdType Id)
    {
        Query.Select(x => new ChiTietQuyTrinhXuLyDto(x, x.DonVis.Select(dv => new ChiTietQuyTrinhXuLyDto.DonVi()
        {
            Id = dv.Id.ToString(),
            GroupCode = dv.OfficeCode,
            GroupName = dv.DonVi.GroupName,
        }).ToList()))
            .Where(x => x.Id == Id).AsNoTracking();
    }
}

public class GetQuyTrinhXuLyQueryHandler : IQueryHandler<GetQuyTrinhXuLyQuery, ChiTietQuyTrinhXuLyDto>
{
    private readonly IReadRepository<QuyTrinhXuLy> _readRepository;
    public GetQuyTrinhXuLyQueryHandler(IReadRepository<QuyTrinhXuLy> readRepository)
    {
         _readRepository = readRepository;
    }
    public async Task<Result<ChiTietQuyTrinhXuLyDto>> Handle(GetQuyTrinhXuLyQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetQuyTrinhXuLyByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Quy trình với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ChiTietQuyTrinhXuLyDto>.Success(data: item.Adapt<ChiTietQuyTrinhXuLyDto>());
    }
}
