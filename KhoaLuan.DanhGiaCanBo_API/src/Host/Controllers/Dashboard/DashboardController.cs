using TD.DanhGiaCanBo.Application.Dashboard;

namespace TD.DanhGiaCanBo.Host.Controllers.Dashboard;

public class DashboardController : VersionedApiController
{
    [HttpGet]
    [MustHavePermission(TDAction.View, TDResource.Dashboard)]
    [OpenApiOperation("Get statistics for the dashboard.", "")]
    public Task<StatsDto> GetAsync()
    {
        return Mediator.Send(new GetStatsRequest());
    }
    [AllowAnonymous]
    [HttpGet("/ServerStatus")]
    //[MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Xem thông số hệ thống sử dụng: CPU, RAM, ...", "")]
    public IActionResult ServerStatus()
    {
        return View("~/Views/Dashboard/ServerStatus.cshtml");
    }
}