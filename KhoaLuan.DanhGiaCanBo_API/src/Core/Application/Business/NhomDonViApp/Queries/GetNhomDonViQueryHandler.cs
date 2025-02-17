using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.NhomDonViApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Queries;

public class GetNhomDonViByIdSpec : Specification<NhomDonVi, ChiTietNhomDonViDto>
{
    public GetNhomDonViByIdSpec(Guid Id)
    {
        Query.Select(x => new ChiTietNhomDonViDto(x, x.danhSachNhomDonVis.Select(dv => new ChiTietNhomDonViDto.DonVi()
        {
            Id = dv.Id.ToString(),
            GroupCode = dv.GroupCode,
            GroupName = dv.Group.GroupName,
        }).ToList()))
            .Where(x => x.Id == Id).AsNoTracking();
    }
}

public class GetNhomDonViQueryHandler : IQueryHandler<GetNhomDonViQuery, ChiTietNhomDonViDto>
{
    private readonly IReadRepository<NhomDonVi> _readRepository;
    public GetNhomDonViQueryHandler(IReadRepository<NhomDonVi> readRepository) => _readRepository = readRepository;
    public async Task<Result<ChiTietNhomDonViDto>> Handle(GetNhomDonViQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetNhomDonViByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"NhomDonVi với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ChiTietNhomDonViDto>.Success(item);
    }
}
