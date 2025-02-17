using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.ExportData.Bussiness.DanhSachDanhGiaCaNhan;
using TD.DanhGiaCanBo.Application.ExportData.Bussiness.DanhSachDanhGiaDonVi;
using TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaCaNhan;
using TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaDonVi;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class ExportDataController : VersionedApiController
{
    [Authorize]
    [HttpGet("ExportPhieuDanhGiaCaNhan")]
    [OpenApiOperation("Xuất phiếu đánh giá của cá nhân", "")]
    public async Task<ActionResult> ExportPhieuDanhGiaCaNhanRequest([FromQuery] ExportPhieuDanhGiaCaNhanRequest req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("ExportPhieuDanhGiaDonVi")]
    [OpenApiOperation("Xuất phiếu đánh giá của đơn vị", "")]
    public async Task<ActionResult> ExportPhieuDanhGiaDonViRequest([FromQuery] ExportPhieuDanhGiaDonViRequest req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("ExportExcelDanhGiaCaNhan")]
    [OpenApiOperation("Xuất danh sách đánh giá cá nhân")]
    public async Task<ActionResult> Search([FromQuery] ExportExcelDanhGiaCaNhanRequest req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("ExportExcelDanhGiaDonVi")]
    [OpenApiOperation("Xuất danh sách đánh giá đơn vị")]
    public async Task<ActionResult> Search([FromQuery] ExportExcelDanhGiaDonViRequest req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}