using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Catalog.LogAuthen.Queries;
using TD.DanhGiaCanBo.Catalog.Catalog.LogAuthen.Queries;

namespace TD.DanhGiaCanBo.Host.Controllers.Catalog;
public class LogAuthenController : VersionedApiController
{
    [Authorize]
    [HttpGet]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Lấy dữ liệu LogAuthen theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchLogAuthenQuery req)
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
    [HttpGet("Detail")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Lấy thông tin người dùng với userName", "")]
    public async Task<ActionResult> GetAuthen([FromQuery] GetLogAuthenQuery req)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu LogAuthens ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteLogAuThenQuery req, DefaultIdType id)
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
