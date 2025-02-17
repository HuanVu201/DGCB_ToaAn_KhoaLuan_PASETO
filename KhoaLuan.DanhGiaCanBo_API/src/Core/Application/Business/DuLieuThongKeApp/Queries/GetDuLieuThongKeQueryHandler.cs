//using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
//using TD.DanhGiaCanBo.Application.Business.ChucVuApp;
//using TD.DanhGiaCanBo.Application.Common.Persistence;
//using TD.DanhGiaCanBo.Domain.Business;

//namespace TD.DanhGiaCanBo.Application.Business.ChucVuApp.Queries;

//public class GetChucVuByIdSpec : Specification<ChucVu>, ISingleResultSpecification
//{
//    public GetChucVuByIdSpec(Guid Id)
//    {
//        Query.Where(x => x.Id == Id);
//    }
//}

//public class GetChucVuQueryHandler : IQueryHandler<GetChucVuQuery, ChucVu>
//{
//    private readonly IReadRepository<ChucVu> _readRepository;
//    public GetChucVuQueryHandler(IReadRepository<ChucVu> readRepository) => _readRepository = readRepository;
//    public async Task<Result<ChucVu>> Handle(GetChucVuQuery request, CancellationToken cancellationToken)
//    {
//        var item = await _readRepository.FirstOrDefaultAsync(new GetChucVuByIdSpec(request.Id), cancellationToken);
//        if (item == null)
//            throw new NotFoundException($"ChucVu với mã: {request.Id} chưa được thêm vào hệ thống");
//        return Result<ChucVu>.Success(item);
//    }
//}
