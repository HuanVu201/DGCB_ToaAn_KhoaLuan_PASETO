using MapsterMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Minio;
using TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaCaNhan;

namespace TD.DanhGiaCanBo.Application.ExportData.Bussiness.DanhSachDanhGiaCaNhan;
public class ExportExcelDanhGiaCaNhanRequestHandler : IRequestHandler<ExportExcelDanhGiaCaNhanRequest, Result<string>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IExportExcelDanhGiaCaNhan _exportThongKeService;
    private readonly ICacheService _cacheService;
    private readonly IMinioService _minioService;
    private readonly ICurrentUser _currentUser;

    public ExportExcelDanhGiaCaNhanRequestHandler(IDapperRepository dapperRepository, IMediator mediator, IExportExcelDanhGiaCaNhan exportThongKeService, ICacheService cacheService, IMinioService minioService, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _exportThongKeService = exportThongKeService;
        _cacheService = cacheService;
        _minioService = minioService;
        _currentUser = currentUser;
    }

    public async Task<Result<string>> Handle(ExportExcelDanhGiaCaNhanRequest request, CancellationToken cancellationToken)
    {
        var dataDanhGias = await _mediator.Send(new SearchDanhGiaQuery()
        {
            TrangThai = request.TrangThai,
            PhanLoaiDanhGia = request.PhanLoaiDanhGia,
            LoaiNgay = request.LoaiNgay,
            LoaiDanhGia = request.LoaiDanhGia,
            Type = request.Type,
            MaPhongBan = request.MaPhongBan,
            MaDonVi = request.MaDonVi,
            MaDonViCha = request.MaDonViCha,
            ThoiGianQuery = request.ThoiGianQuery,
            LoaiThoiGian = request.LoaiThoiGian,
            TuNgay = request.TuNgay,
            DenNgay = request.DenNgay,
            TruongDonVi = request.TruongDonVi,
            GetDataCurrentUser = request.GetDataCurrentUser,
            FilterByUserRole = request.FilterByUserRole,
            ToanBoDonVi = request.ToanBoDonVi,
            SuDung = request.SuDung,
            DifferencePerson = request.DifferencePerson,
            ChuaKhieuNai = request.ChuaKhieuNai,
            PageSize = request.PageSize,
            PageNumber = request.PageNumber,
        });

        if (dataDanhGias == null)
        {
            return Result<string>.Fail("Không có dữ liệu đánh giá cá nhân");
        }

        string urlPhoi = await _mediator.Send(new GetUrlMauPhoiQuery()
        {
            LoaiPhoi = $"phoi-excel",
            MaMauPhoi = "danh-sach-danh-gia-ca-nhan",
        });

        if (string.IsNullOrEmpty(urlPhoi))
            return Result<string>.Fail("Không có dữ liệu của mẫu phôi");

        string response = await _exportThongKeService.ExportDanhSachDanhGiaCaNhan(dataDanhGias.Data, urlPhoi);

        if (string.IsNullOrEmpty(response))
            return Result<string>.Fail("Có lỗi trong quá trình xuất thông tin danh sách đánh giá");

        return Result<string>.Success(data: response, message: "Xuất danh sách đánh giá thành công");
    }
}
