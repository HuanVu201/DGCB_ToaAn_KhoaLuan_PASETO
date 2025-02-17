using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
public class GetDanhGiaDonViByMaPhieuSpec : Specification<DanhGiaDonVi>, ISingleResultSpecification
{
    public GetDanhGiaDonViByMaPhieuSpec(Guid maPhieu)
    {
        Query.Where(x => x.MaPhieu == maPhieu.ToString());
    }
}

public class GetDanhGiaDonViByMaPhieuQueryHandler : IQueryHandler<GetDanhGiaDonViByMaPhieuQuery, DanhGiaDonVi>
{
    private readonly IReadRepository<DanhGiaDonVi> _readRepository;
    public GetDanhGiaDonViByMaPhieuQueryHandler(IReadRepository<DanhGiaDonVi> readRepository) => _readRepository = readRepository;
    public async Task<Result<DanhGiaDonVi>> Handle(GetDanhGiaDonViByMaPhieuQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDanhGiaDonViByMaPhieuSpec(request.maPhieu), cancellationToken);
        if (item == null)
            throw new NotFoundException($"DanhGiaDonVi với mã phiếu: {request.maPhieu} chưa được thêm vào hệ thống");
        return Result<DanhGiaDonVi>.Success(item);
    }
}
