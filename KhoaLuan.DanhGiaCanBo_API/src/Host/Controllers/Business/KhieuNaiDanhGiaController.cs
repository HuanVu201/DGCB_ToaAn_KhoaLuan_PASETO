using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class KhieuNaiDanhGiaController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một dữ liệu khiếu nại ", "")]
    public async Task<ActionResult> Add(AddKhieuNaiDanhGiaCommand req)
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
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu dữ liệu khiếu nại theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchKhieuNaiDanhGiaQuery req)
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
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu khiếu nại theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetKhieuNaiDanhGiaQuery(id));
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
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một dữ liệu khiếu nại", "")]
    public async Task<ActionResult> Update(UpdateKhieuNaiDanhGiaCommand req, Guid id)
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu khiếu nại", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteKhieuNaiDanhGiaCommand req, Guid id)
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
    [HttpPost("GuiCapTren")]
    [OpenApiOperation("Gửi cấp trên", "")]
    public async Task<ActionResult> DuyetPhieuNhanXet([FromBody] GuiCapTrenCommand req)
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
    //Update
    [Authorize]
    [HttpPost("ThongKeKhieuNaiQuery")]
    [OpenApiOperation("ThongKeKhieuNaiQuery", "")]
    public async Task<ActionResult> ThongKeKhieuNaiQuery([FromBody] ThongKeKhieuNaiCommand req)
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
    [HttpPost("GetDanhSachKhieuNaiDanhGiaTK")]
    [OpenApiOperation("GetDanhSachKhieuNaiDanhGiaQuery", "")]
    public async Task<ActionResult> GetDanhSachKhieuNaiDanhGiaQuery([FromBody] GetDanhSachKhieuNaiDanhGiaQuery req)
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
