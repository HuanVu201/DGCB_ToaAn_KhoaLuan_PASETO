using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.GiaHanDanhGiaApp.Queries;
public class GetGiaHanByIdSpec : Specification<GiaHanDanhGia>, ISingleResultSpecification
{
    public GetGiaHanByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetGiaHanQueryHandler : IQueryHandler<GetGiaHanDanhGiaQuery, GiaHanDanhGia>
{
    private readonly IReadRepository<GiaHanDanhGia> _readRepository;
    public GetGiaHanQueryHandler(IReadRepository<GiaHanDanhGia> readRepository) => _readRepository = readRepository;
    public async Task<Result<GiaHanDanhGia>> Handle(GetGiaHanDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetGiaHanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"GiaHanDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<GiaHanDanhGia>.Success(item);
    }
}