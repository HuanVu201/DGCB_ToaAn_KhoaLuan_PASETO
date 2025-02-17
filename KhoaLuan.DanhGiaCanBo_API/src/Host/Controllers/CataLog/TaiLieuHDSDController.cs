using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp.Commands;
using TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.CataLog;
public class TaiLieuHDSDController :  VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một DSTaiLieuHDSD ", "")]
    public async Task<ActionResult> Add(AddTaiLieuHDSDCommand req)
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

    [AllowAnonymous]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu DSTaiLieuHDSD theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchTaiLieuHDSDQuery req)
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
    [OpenApiOperation("Lấy dữ liệu DSTaiLieuHDSD theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetTaiLieuHDSDQuery(id));
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
    [OpenApiOperation("Sửa một DSTaiLieuHDSD", "")]
    public async Task<ActionResult> Update(UpdateTaiLieuHDSDCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một DSTaiLieuHDSD ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteTaiLieuHDSDCommand req, DefaultIdType id)
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
