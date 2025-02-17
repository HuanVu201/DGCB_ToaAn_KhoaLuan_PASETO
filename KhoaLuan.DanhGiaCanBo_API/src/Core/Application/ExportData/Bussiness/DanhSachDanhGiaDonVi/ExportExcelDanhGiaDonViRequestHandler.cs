using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Minio;
using TD.DanhGiaCanBo.Application.ExportData.Bussiness.DanhSachDanhGiaDonVi;

namespace TD.DanhGiaCanBo.Application.ExportData.Bussiness.DanhSachDanhGiaDonVi;
public class ExportExcelDanhGiaDonViRequestHandler : IRequestHandler<ExportExcelDanhGiaDonViRequest, Result<string>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IExportExcelDanhGiaDonVi _exportThongKeService;
    private readonly ICacheService _cacheService;
    private readonly IMinioService _minioService;
    private readonly ICurrentUser _currentUser;

    public ExportExcelDanhGiaDonViRequestHandler(IDapperRepository dapperRepository, IMediator mediator, IExportExcelDanhGiaDonVi exportThongKeService, ICacheService cacheService, IMinioService minioService, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _exportThongKeService = exportThongKeService;
        _cacheService = cacheService;
        _minioService = minioService;
        _currentUser = currentUser;
    }

    public async Task<Result<string>> Handle(ExportExcelDanhGiaDonViRequest request, CancellationToken cancellationToken)
    {
        var dataDanhGias = await _mediator.Send(new SearchDanhGiaDonViQuery()
        {
            TrangThai = request.TrangThai,
            TrangThais = request.TrangThais,
            PhanLoaiDanhGia = request.PhanLoaiDanhGia,
            LoaiNgay = request.LoaiNgay,
            Type = request.Type,
            MaPhongBan = request.MaPhongBan,
            MaDonVi = request.MaDonVi,
            MaDonViCha = request.MaDonViCha,
            ThoiGianQuery = request.ThoiGianQuery,
            TuNgay = request.TuNgay,
            DenNgay = request.DenNgay,
            TruongDonVi = request.TruongDonVi,
            GetDataCurrentUser = request.GetDataCurrentUser,
            FilterByUserRole = request.FilterByUserRole,
            ToanBoDonVi = request.ToanBoDonVi,
            SuDung = request.SuDung,
            DifferencePerson = request.DifferencePerson,
            SendDanhGia = request.SendDanhGia,
            PageSize = request.PageSize,
            PageNumber = request.PageNumber,
        });

        if (dataDanhGias == null)
        {
            return Result<string>.Fail("Không có dữ liệu đánh giá đơn vị");
        }

        string urlPhoi = await _mediator.Send(new GetUrlMauPhoiQuery()
        {
            LoaiPhoi = $"phoi-excel",
            MaMauPhoi = "danh-sach-danh-gia-don-vi",
        });

        if (string.IsNullOrEmpty(urlPhoi))
            return Result<string>.Fail("Không có dữ liệu của mẫu phôi");

        string response = await _exportThongKeService.ExportDanhSachDanhGiaDonVi(dataDanhGias.Data, urlPhoi);

        if (string.IsNullOrEmpty(response))
            return Result<string>.Fail("Có lỗi trong quá trình xuất thông tin danh sách đánh giá");

        return Result<string>.Success(data: response, message: "Xuất danh sách đánh giá thành công");
    }
}