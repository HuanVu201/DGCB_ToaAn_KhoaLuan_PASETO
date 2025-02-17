using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Queries;


public class GetChiTietDanhGiaByMaMauPhieuQueryHandler : IQueryHandler<GetChiTietDanhGiaByMauPhieuDanhGiaQuery, ChiTietDanhGia>
{
    private readonly IDapperRepository _dapperRepository;
    public GetChiTietDanhGiaByMaMauPhieuQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<Result<ChiTietDanhGia>> Handle(GetChiTietDanhGiaByMauPhieuDanhGiaQuery request, CancellationToken cancellationToken)
    {

        string query = $"SELECT * FROM  {TableNames.ChiTietDanhGias}";
        string where = $" WHERE ID > 0 and MaPhieu= @MaPhieu and MaMauPhieu = @MaMauPhieu";
        var parameters = new { MaPhieu = request.MaPhieu, MaMauPhieu = request.MaMauPhieu };
        var items = await _dapperRepository.QueryAsync<ChiTietDanhGia>(query, parameters);
        var item = items.FirstOrDefault();
        // Kiểm tra nếu không tìm thấy bản ghi
        if (item == null)
        {
            throw new NotFoundException($"ChiTietDanhGia với mã phiếu: {request.MaPhieu} và mã mẫu phiếu: {request.MaMauPhieu} không tìm thấy.");
        }
        return Result<ChiTietDanhGia>.Success(item);
    }
}
