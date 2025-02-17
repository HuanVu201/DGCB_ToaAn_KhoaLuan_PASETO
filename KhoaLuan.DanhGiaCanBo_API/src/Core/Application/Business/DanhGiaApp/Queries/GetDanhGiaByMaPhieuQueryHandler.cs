using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
public class GetDanhGiaByMaPhieuSpec : Specification<DanhGia>, ISingleResultSpecification
{
    public GetDanhGiaByMaPhieuSpec(Guid maPhieu)
    {
        Query.Where(x => x.MaPhieu == maPhieu.ToString());
    }
}

public class GetDanhGiaByMaPhieuQueryHandler : IQueryHandler<GetDanhGiaByMaPhieuQuery, DanhGia>
{
    private readonly IReadRepository<DanhGia> _readRepository;
    public GetDanhGiaByMaPhieuQueryHandler(IReadRepository<DanhGia> readRepository) => _readRepository = readRepository;
    public async Task<Result<DanhGia>> Handle(GetDanhGiaByMaPhieuQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDanhGiaByMaPhieuSpec(request.maPhieu), cancellationToken);
        if (item == null)
            throw new NotFoundException($"DanhGia với mã phiếu: {request.maPhieu} chưa được thêm vào hệ thống");
        return Result<DanhGia>.Success(item);
    }
}
