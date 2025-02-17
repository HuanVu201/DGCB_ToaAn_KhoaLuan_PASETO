using Org.BouncyCastle.Ocsp;
using TD.DanhGiaCanBo.Application.Identity.UserRoles.Queries;

namespace TD.DanhGiaCanBo.Host.Controllers.Identity;

public class UserRoleController : VersionedApiController
{
    
    [Authorize]
    [HttpGet("search")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Danh sách userRoles.")]
    public async Task<ActionResult> SearchUserRoles([FromQuery] SearchUserRoles request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


    [Authorize]
    [HttpGet("searchWithRoleNames")]
    [OpenApiOperation("Danh sách userRoles.")]
    public async Task<ActionResult> SearchUserWithRoles([FromQuery] SearchUserWithRoles request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

}
