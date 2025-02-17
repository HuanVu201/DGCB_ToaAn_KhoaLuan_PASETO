using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Commands;
using TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class KhoTieuChiController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một dữ liệu KhoTieuChi ", "")]
    public async Task<ActionResult> Add(AddKhoTieuChiCommand req)
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
    [OpenApiOperation("Lấy dữ liệu dữ liệu KhoTieuChi theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchKhoTieuChiQuery req)
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
    [OpenApiOperation("Lấy dữ liệu dữ liệu KhoTieuChi theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetKhoTieuChiQuery(id));
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
    [OpenApiOperation("Sửa một dữ liệu KhoTieuChi", "")]
    public async Task<ActionResult> Update(UpdateKhoTieuChiCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu KhoTieuChi ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteKhoTieuChiCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một dữ liệu KhoTieuChi ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreKhoTieuChiCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
