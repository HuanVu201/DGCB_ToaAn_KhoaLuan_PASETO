using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp;
using TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp.Queries;

public class GetChiTietDanhGiaDonViByMaMauPhieuQueryHandler : IQueryHandler<GetChiTietDanhGiaDonViByMauPhieuDanhGiaQuery, ChiTietDanhGiaDonVi>
{
    private readonly IDapperRepository _dapperRepository;
    public GetChiTietDanhGiaDonViByMaMauPhieuQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<Result<ChiTietDanhGiaDonVi>> Handle(GetChiTietDanhGiaDonViByMauPhieuDanhGiaQuery request, CancellationToken cancellationToken)
    {

        string query = $"SELECT * FROM  {TableNames.ChiTietDanhGiaDonVis}";
        string where = $" WHERE ID > 0 and MaPhieu= @MaPhieu and MaMauPhieu = @MaMauPhieu";
        var parameters = new { MaPhieu = request.MaPhieu, MaMauPhieu = request.MaMauPhieu };
        var items = await _dapperRepository.QueryAsync<ChiTietDanhGiaDonVi>(query, parameters);
        var item = items.FirstOrDefault();
        // Kiểm tra nếu không tìm thấy bản ghi
        if (item == null)
        {
            throw new NotFoundException($"ChiTietDanhGiaDonVi với mã phiếu: {request.MaPhieu} và mã mẫu phiếu: {request.MaMauPhieu} không tìm thấy.");
        }
        return Result<ChiTietDanhGiaDonVi>.Success(item);
    }
}
