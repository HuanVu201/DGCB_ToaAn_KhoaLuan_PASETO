using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
public class GetPhieuDanhGiaQueryHandler : IRequestHandler<GetPhieuDanhGiaQuery, Result<GetDanhGiaDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly IMediator _mediator;
    public GetPhieuDanhGiaQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _mediator = mediator;
    }

    public async Task<Result<GetDanhGiaDto>> Handle(GetPhieuDanhGiaQuery request, CancellationToken cancellationToken)
    {
        GetDanhGiaDto resultData = new GetDanhGiaDto();

        var danhGiaData = await _mediator.Send(new GetDanhGiaQuery(request.Id));
        if (danhGiaData == null)
        {
            return Result<GetDanhGiaDto>.Fail(message: "Không có thông tin đánh giá!");
        }

        if (request.DaXem != -1) // Cập nhật DaXem cho tblDanhGia
        {
            try
            {
                string sqlUpdate = $@"UPDATE [Business].[DanhGias]
                                    SET DaXem = '{request.DaXem}'
                                    WHERE ID = '{request.Id}'";

                await _dapperRepository.ExcuteAsync(sqlUpdate);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi cập nhật [DanhGias].[DaXem]: " + ex.Message, ex);
            }
        }

        try
        {
            resultData = danhGiaData.Data.Adapt(resultData);
        }
        catch (Exception ex)
        {
            return Result<GetDanhGiaDto>.Fail(message: ex.Message);
        }

        string sqlChiTietDanhGiaQuery = @"Select * FROM [Business].[ChiTietDanhGias]
                                          WHERE DeletedOn IS NULL AND MaPhieu = @MaPhieu";

        var dataChiTiet = await _dapperRepository.PaginatedListSingleQueryAsync<ChiTietDanhGiaDto>(sqlChiTietDanhGiaQuery, 10, "ThuTu ASC", cancellationToken, 1, new { MaPhieu = resultData.MaPhieu });

        if (dataChiTiet.Data == null || dataChiTiet.Data.Count == 0)
        {
            return Result<GetDanhGiaDto>.Fail(message: "Không có thông tin chi tiết đánh giá!");
        }

        List<ChiTietDanhGiaDto> datas = new List<ChiTietDanhGiaDto>();
        foreach (var item in dataChiTiet.Data)
        {
            ChiTietDanhGiaDto data = new ChiTietDanhGiaDto();
            data.Id = item.Id;
            data.TenMauPhieu = item.TenMauPhieu;
            data.MaMauPhieu = item.MaMauPhieu;
            data.ChiTietDiemTuDanhGia = item.ChiTietDiemTuDanhGia;
            data.ChiTietDiemThamMuu = item.ChiTietDiemThamMuu;
            data.ChiTietDiemNhanXet = item.ChiTietDiemNhanXet;
            data.ChiTietDiemDanhGia = item.ChiTietDiemDanhGia;
            data.DataTuDanhGia = item.DataTuDanhGia;
            data.DataNhanXet = item.DataNhanXet;
            data.DataThamMuu = item.DataThamMuu;
            data.DataLanhDaoDanhGia = item.DataLanhDaoDanhGia;
            data.DiemDanhGia = item.DiemDanhGia;
            data.DiemTuDanhGia = item.DiemTuDanhGia;
            data.DiemNhanXet = item.DiemNhanXet;
            data.DiemThamMuu = item.DiemThamMuu;
            data.ChiTietDiemLanhDaoDanhGia = item.ChiTietDiemLanhDaoDanhGia;
            data.DiemLanhDaoDanhGia = item.DiemLanhDaoDanhGia;
            data.ThuTu = item.ThuTu;
            data.ScorePoint = item.ScorePoint;
            data.HasDiemLietTuDanhGia = item.HasDiemLietTuDanhGia;
            data.HasDiemLietNhanXet = item.HasDiemLietNhanXet;
            data.HasDiemLietLanhDaoDanhGia = item.HasDiemLietLanhDaoDanhGia;
            data.DataKhieuNai = item.DataKhieuNai;
            data.DataXuLyKhieuNai = item.DataXuLyKhieuNai;
            data.SoLuongKhieuNai = item.SoLuongKhieuNai;

            datas.Add(data);
        }

        if (datas.Count > 0)
            resultData.MauPhieus = datas;

        return Result<GetDanhGiaDto>.Success(resultData);
    }
}
