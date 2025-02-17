using Microsoft.AspNetCore.Mvc;
using Syncfusion.DocIO.DLS;
using System.Text.RegularExpressions;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class TieuChiDanhGiaController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một dữ liệu TieuChiDanhGia ", "")]
    public async Task<ActionResult> Add(AddTieuChiDanhGiaCommand req)
    {
        try
        {
            //Regex.Replace(req.TenTieuChi, @"[^,.!$&()=@{}[]';]+", "");
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("old")]
    [OpenApiOperation("Thêm một dữ liệu TieuChiDanhGia(update) ", "")]
    public async Task<ActionResult> AddUpdate(PostTieuChiTheoDoiTuongQuery req)
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

    //[AllowAnonymous]
    //[HttpGet]
    //[OpenApiOperation("Lấy dữ liệu dữ liệu TieuChiDanhGia theo bộ lọc", "")]
    //async Task<ActionResult> Search([FromQuery] SearchTieuChiDanhGiaQuery req)
    //{
    //    try
    //    {
    //        var res = await Mediator.Send(req);
    //        return Ok(res);
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(500, ex.Message);
    //    }
    //}
    [AllowAnonymous]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu TieuChiDanhGia theo tất cả mẫu phiếu đánh giá", "")]
    public async Task<ActionResult> GetTieuChiTheoTatCaDoiTuong([FromQuery] GetTieuChiTheoTatCaDoiTuongQuery req)
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
    // [Route("dgcbapi/TieuChis2/doiTuongUpdate/{nhomDoiTuongId:int}")]
    [AllowAnonymous]
    [HttpGet("GetDS")]
    [OpenApiOperation("Lấy danh sách tiêu chí theo mẫu phiếu", "")]
    public async Task<ActionResult> GetDSTieuChiTheoNhomDoiTuongTieuChi([FromQuery] GetDSTieuChiTheoNhomDoiTuongTieuChiQuery req)
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
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu TieuChiDanhGia theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetTieuChiDanhGiaQuery(id));
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

    [Authorize]
    [HttpPut("old/{id:guid}")]
    [OpenApiOperation("Sửa một dữ liệu TieuChiDanhGia (cũ không dùng)", "")]
    public async Task<ActionResult> UpdateCu(UpdateTieuChiDanhGiaCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một dữ liệu TieuChiDanhGia", "")]
    public async Task<ActionResult> Update(UpdateTieuChiTheoDoiTuongQuery req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    //[Route("dgcbapi/TieuChis/{id:int:min(1)}")]
    //[HttpDelete]
    [Authorize]
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu TieuChiDanhGia ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteTieuChiTheoDoiTuongQuery req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpDelete("old/{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu TieuChiDanhGia (cũ không dùng)", "")]
    public async Task<ActionResult> SoftDeleteCu([FromBody] DeleteTieuChiDanhGiaCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPatch("{id:guid}")]
    [OpenApiOperation("khôi phục một dữ liệu TieuChiDanhGia ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreTieuChiDanhGiaCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


    [AllowAnonymous]
    [HttpGet("getlsttieuchibymauphieudanhgia")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu danh sách tiêu chí theo Mau Phieu Danh Gia")]
    public async Task<ActionResult> GetLstTieuChiByMayPhieuDanhGia([FromQuery] GetLstTieuChiByMauPhieuQuery req)
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
    [Authorize]
    [HttpPost("CopyTieuChiDanhGiaTuKho")]
    [OpenApiOperation("Copy tiêu chí từ kho", "")]
    public async Task<ActionResult> CopyTieuChiDanhGiaTuKho(CopyTieuChiDanhGiaTuKhoQuery req)
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
}
