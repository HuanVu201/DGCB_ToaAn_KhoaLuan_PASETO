using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.AuditLogApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class AuditLogController : VersionedApiController
{
  
    [AllowAnonymous]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu trạng thái AuditLog theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchAuditLogQuery req)
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
