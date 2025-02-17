using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
public class GetPhieuDanhGiaDonViQueryHandler : IRequestHandler<GetPhieuDanhGiaDonViQuery, Result<GetDanhGiaDonViDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly IMediator _mediator;
    public GetPhieuDanhGiaDonViQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _mediator = mediator;
    }

    public async Task<Result<GetDanhGiaDonViDto>> Handle(GetPhieuDanhGiaDonViQuery request, CancellationToken cancellationToken)
    {
        GetDanhGiaDonViDto resultData = new GetDanhGiaDonViDto();

        var danhGiaDonViData = await _mediator.Send(new GetDanhGiaDonViQuery(request.Id));
        if (danhGiaDonViData == null)
        {
            return Result<GetDanhGiaDonViDto>.Fail(message: "Không có thông tin đánh giá!");
        }

        if (request.DaXem != -1) // Cập nhật DaXem cho tblDanhGiaDonVi
        {
            try
            {
                string sqlUpdate = $@"UPDATE [Business].[DanhGiaDonVis]
                                    SET DaXem = '{request.DaXem}'
                                    WHERE ID = '{request.Id}'";

                await _dapperRepository.ExcuteAsync(sqlUpdate);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi cập nhật [DanhGiaDonVis].[DaXem]: " + ex.Message, ex);
            }
        }

        try
        {
            resultData = danhGiaDonViData.Data.Adapt(resultData);
        }
        catch (Exception ex)
        {
            return Result<GetDanhGiaDonViDto>.Fail(message: ex.Message);
        }

        string sqlChiTietDanhGiaDonViQuery = @"Select * FROM [Business].[ChiTietDanhGiaDonVis]
                                          WHERE DeletedOn IS NULL AND MaPhieu = @MaPhieu";

        var dataChiTiet = await _dapperRepository.PaginatedListSingleQueryAsync<ChiTietDanhGiaDonViDto>(sqlChiTietDanhGiaDonViQuery, 10, "ThuTu ASC", cancellationToken, 1, new { MaPhieu = resultData.MaPhieu });

        if (dataChiTiet.Data == null || dataChiTiet.Data.Count == 0)
        {
            return Result<GetDanhGiaDonViDto>.Fail(message: "Không có thông tin chi tiết đánh giá!");
        }

        List<ChiTietDanhGiaDonViDto> datas = new List<ChiTietDanhGiaDonViDto>();
        foreach (var item in dataChiTiet.Data)
        {
            ChiTietDanhGiaDonViDto data = new ChiTietDanhGiaDonViDto();
            data.Id = item.Id;
            data.TenMauPhieu = item.TenMauPhieu;
            data.MaMauPhieu = item.MaMauPhieu;
            data.ChiTietDiemTuDanhGia = item.ChiTietDiemTuDanhGia;
            data.ChiTietDiemThamMuu = item.ChiTietDiemThamMuu;
            data.ChiTietDiemDanhGia = item.ChiTietDiemDanhGia;
            data.DataTuDanhGia = item.DataTuDanhGia;
            data.DataThamMuu = item.DataThamMuu;
            data.DataLanhDaoDanhGia = item.DataLanhDaoDanhGia;
            data.DiemDanhGia = item.DiemDanhGia;
            data.DiemTuDanhGia = item.DiemTuDanhGia;
            data.DiemThamMuu = item.DiemThamMuu;
            data.ChiTietDiemLanhDaoDanhGia = item.ChiTietDiemLanhDaoDanhGia;
            data.DiemLanhDaoDanhGia = item.DiemLanhDaoDanhGia;
            data.ThuTu = item.ThuTu;
            data.ScorePoint = item.ScorePoint;
            data.HasDiemLietTuDanhGia = item.HasDiemLietTuDanhGia;
            data.HasDiemLietThamMuu = item.HasDiemLietThamMuu;
            data.HasDiemLietLanhDaoDanhGia = item.HasDiemLietLanhDaoDanhGia;

            datas.Add(data);
        }

        if (datas.Count > 0)
            resultData.MauPhieus = datas;

        return Result<GetDanhGiaDonViDto>.Success(resultData);
    }
}
