using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Commands;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class MauPhoiController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một mẫu phôi ", "")]
    public async Task<ActionResult> Add(AddMauPhoiCommand req)
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
    [OpenApiOperation("Lấy dữ liệu mẫu phôi theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchMauPhoiQuery req)
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
    [HttpGet("urlMauPhoi")]
    [OpenApiOperation("Lấy đường dẫn phôi theo bộ lọc", "")]
    public async Task<ActionResult> getUrlMauPhoi([FromQuery] GetUrlMauPhoiQuery req)
    {
        try
        {
            string res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("urlMauPhoiDefault")]
    [OpenApiOperation("Lấy đường dẫn phôi mặc định ", "")]
    public async Task<ActionResult> GetUrlMauPhoiDefaultQuery([FromQuery] GetUrlMauPhoiDefaultQuery req)
    {
        try
        {
            string res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu mẫu phôi theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetMauPhoiQuery(id));
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
    [OpenApiOperation("Sửa một mẫu phôi", "")]
    public async Task<ActionResult> Update(UpdateMauPhoiCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một mẫu phôi", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteMauPhoiCommand req, Guid id)
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

}