using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Commands;
using TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class ScreenActionController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một ScreenAction ", "")]
    public async Task<ActionResult> Add(AddScreenActionCommand req)
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
    [OpenApiOperation("Lấy dữ liệu ScreenAction theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchScreenActionQuery req)
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
    [HttpGet("CanBo")]
    [OpenApiOperation("Lấy dữ liệu ScreenAction của cán bộ theo bộ lọc", "")]
    public async Task<ActionResult> SearchByUser([FromQuery] SearchScreenActionCacheQuery req)
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
    [HttpGet("Screen")]
    [OpenApiOperation("Lấy dữ liệu Action chưa có trong Screen theo screenId", "")]
    public async Task<ActionResult> Search([FromQuery] SearchActionNotInScreenQuery req)
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
    [OpenApiOperation("Lấy dữ liệu ScreenAction theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetScreenActionQuery(id));
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa vĩnh viễn một ScreenAction ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteScreenActionCommand req, DefaultIdType id)
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
