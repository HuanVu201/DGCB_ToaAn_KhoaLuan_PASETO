using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.HoSoCongTacDanhGiaApp.Queries;
public class GetHoSoCongTacDanhGiaByIdSpec : Specification<HoSoCongTacDanhGia>, ISingleResultSpecification
{
    public GetHoSoCongTacDanhGiaByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetHoSoCongTacDanhGiaQueryHandler : IQueryHandler<GetHoSoCongTacDanhGiaQuery, HoSoCongTacDanhGia>
{
    private readonly IReadRepository<HoSoCongTacDanhGia> _readRepository;
    public GetHoSoCongTacDanhGiaQueryHandler(IReadRepository<HoSoCongTacDanhGia> readRepository) => _readRepository = readRepository;
    public async Task<Result<HoSoCongTacDanhGia>> Handle(GetHoSoCongTacDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetHoSoCongTacDanhGiaByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"HoSoCongTacDanhGia với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<HoSoCongTacDanhGia>.Success(item);
    }
}