using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Minio;
using TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaCaNhan;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaDonVi;
public class ExportPhieuDanhGiaDonViRequestHandler : IRequestHandler<ExportPhieuDanhGiaDonViRequest, Result<UrlPhieuDanhGiaDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IExportPhieuDanhGiaDonVi _exportThongKeService;
    private readonly ICacheService _cacheService;
    private readonly IMinioService _minioService;
    private readonly ICurrentUser _currentUser;

    public ExportPhieuDanhGiaDonViRequestHandler(IDapperRepository dapperRepository, IMediator mediator, IExportPhieuDanhGiaDonVi exportThongKeService, ICacheService cacheService, IMinioService minioService, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _exportThongKeService = exportThongKeService;
        _cacheService = cacheService;
        _minioService = minioService;
        _currentUser = currentUser;
    }

    public async Task<Result<UrlPhieuDanhGiaDto>> Handle(ExportPhieuDanhGiaDonViRequest request, CancellationToken cancellationToken)
    {
        UrlPhieuDanhGiaDto response = new UrlPhieuDanhGiaDto();
        var data = await _mediator.Send(new GetPhieuDanhGiaDonViQuery(request.DanhGiaId, -1));
        if (data == null)
        {
            return Result<UrlPhieuDanhGiaDto>.Fail("Không có dữ liệu của phiếu đánh giá");
        }

        string sqlQueryUser = @$"
                SELECT IsKySo
                FROM [Identity].[ApplicationUserGroups]
                WHERE DeletedOn is null AND Id= '{_currentUser.GetUserGroupId() ?? string.Empty}'";

        var resCheckKySo = await _dapperRepository.QueryFirstOrDefaultAsync<UrlPhieuDanhGiaDto>(sqlQueryUser);

        if (resCheckKySo.IsKySo.HasValue)
            response.IsKySo = resCheckKySo.IsKySo ?? false;

        if (request.Refresh == false && !string.IsNullOrEmpty(data.Data.UrlPdf) && !string.IsNullOrEmpty(data.Data.UrlDocx))
        {
            response.UrlPdf = data.Data.UrlPdf;
            response.UrlDocx = data.Data.UrlDocx;

            return Result<UrlPhieuDanhGiaDto>.Success(data: response, message: "Lấy thông phiếu đánh giá thành công");
        }

        string maMauPhoiReq = "phieu-danh-gia-don-vi";

        if (data.Data.DiemThamMuu == null)
            maMauPhoiReq += "-khong-tham-muu";

        int soLuongMauPhieu = data.Data.MauPhieus != null ? data.Data.MauPhieus.Count() : 0;
        if (soLuongMauPhieu == 0)
            return Result<UrlPhieuDanhGiaDto>.Fail("Không có dữ liệu của các mẫu phiếu đánh giá");
        else maMauPhoiReq += $"-{soLuongMauPhieu}";

        string urlPhoi = await _mediator.Send(new GetUrlMauPhoiQuery()
        {
            LoaiPhoi = $"phoi-phieu",
            MaMauPhoi = maMauPhoiReq,
        });

        if (string.IsNullOrEmpty(urlPhoi))
            return Result<UrlPhieuDanhGiaDto>.Fail("Không có dữ liệu của mẫu phôi");

        response = await _exportThongKeService.ExportPhieuDanhGiaDonVi(data.Data, urlPhoi);
        if (response == null)
            return Result<UrlPhieuDanhGiaDto>.Fail("Có lỗi trong quá trình xuất thông tin phiếu đánh giá");

        await _mediator.Send(new UpdateUrlPhieuDanhGiaDonViCommand()
        {
            Id = request.DanhGiaId,
            UrlPdf = response.UrlPdf,
            UrlDocx = response.UrlDocx,
        });

        return Result<UrlPhieuDanhGiaDto>.Success(data: response, message: "Xuất phiếu đánh giá thành công");
    }
}
