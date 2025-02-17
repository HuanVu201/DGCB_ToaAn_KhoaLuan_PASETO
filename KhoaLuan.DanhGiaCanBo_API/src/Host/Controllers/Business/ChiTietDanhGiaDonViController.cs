using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp.Commands;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class ChiTietDanhGiaDonViController : VersionedApiController
{
    [Authorize]
    [HttpPost("AddListChiTietDanhGiaDonVi")]
    [OpenApiOperation("Thêm lst dữ liệu ChiTietDanhGiaDonVi ", "")]
    public async Task<ActionResult> AddList([FromBody] AddListChiTietDanhGiaDonViQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("UpdateListChiTietDanhGiaDonVi")]
    [OpenApiOperation("Sửa danh sách dữ liệu ChiTietDanhGiaDonVi", "")]
    public async Task<ActionResult> UpdateList(UpdateListChiTietDanhGiaDonViQuery req)
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

    [AllowAnonymous]
    [HttpGet("GetChiTieuDanhGiaByMaMauPhieuDanhGia")]
    [OpenApiOperation("Lấy dữ liệu MauPhieuDanhGia theo Ma MauPhieuDanhGia", "")]
    public async Task<ActionResult> GetMauPhieuDanhGiaByUserAndBoTieuChuan([FromQuery] GetChiTietDanhGiaDonViByMauPhieuDanhGiaQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
