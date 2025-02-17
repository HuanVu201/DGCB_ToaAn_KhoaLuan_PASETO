using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class ChiTietDanhGiaController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một dữ liệu ChiTietDanhGia ", "")]
    public async Task<ActionResult> Add(AddChiTietDanhGiaCommand req)
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
    [HttpPost("AddListChiTietDanhGia")]
    [OpenApiOperation("Thêm lst dữ liệu ChiTietDanhGia ", "")]
    public async Task<ActionResult> AddList([FromBody] AddListChiTietDanhGiaQuery req)
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
    //[HttpGet("{id:guid}")]
    //[OpenApiOperation("Lấy dữ liệu dữ liệu ChiTietDanhGia theo mã Id", "")]
    //public async Task<ActionResult> Get(DefaultIdType id)
    //{
    //    try
    //    {
    //        var res = await Mediator.Send(new GetDanhGiaQuery(id));
    //        return Ok(res);
    //    }
    //    catch (NotFoundException ex)
    //    {
    //        return NotFound(ex.Message);
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(500, ex.Message);
    //    }
    //}

    [Authorize]
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một dữ liệu ChiTietDanhGia", "")]
    public async Task<ActionResult> Update(UpdateChiTietDanhGiaCommand req, DefaultIdType id)
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
    [HttpPut("UpdateListChiTietDanhGia")]
    [OpenApiOperation("Sửa danh sách dữ liệu ChiTietDanhGia", "")]
    public async Task<ActionResult> UpdateList(UpdateListChiTietDanhGiaQuery req)
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu ChiTietDanhGia ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteDanhGiaCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một dữ liệu ChiTietDanhGia ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreDanhGiaCommand(id));
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
    public async Task<ActionResult> GetMauPhieuDanhGiaByUserAndBoTieuChuan([FromQuery] GetChiTietDanhGiaByMauPhieuDanhGiaQuery req)
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
