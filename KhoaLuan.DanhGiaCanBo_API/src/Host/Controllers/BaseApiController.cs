using MediatR;

namespace TD.DanhGiaCanBo.Host.Controllers;

[ApiController]
public class BaseApiController : Controller
{
    private ISender _mediator = null!;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
}