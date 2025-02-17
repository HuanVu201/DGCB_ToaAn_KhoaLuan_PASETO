using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Queries;
public class GetKhieuNaiByIdSpec : Specification<KhieuNaiDanhGia>, ISingleResultSpecification
{
    public GetKhieuNaiByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetKhieuNaiQueryHandler : IQueryHandler<GetKhieuNaiDanhGiaQuery, KhieuNaiDanhGia>
{
    private readonly IReadRepository<KhieuNaiDanhGia> _readRepository;
    public GetKhieuNaiQueryHandler(IReadRepository<KhieuNaiDanhGia> readRepository) => _readRepository = readRepository;
    public async Task<Result<KhieuNaiDanhGia>> Handle(GetKhieuNaiDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetKhieuNaiByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"KhieuNai với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<KhieuNaiDanhGia>.Success(item);
    }
}