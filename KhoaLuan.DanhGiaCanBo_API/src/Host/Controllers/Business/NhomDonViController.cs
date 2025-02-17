using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Commands;
using TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class NhomDonViController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một nhóm đơn vị ", "")]
    public async Task<ActionResult> Add(AddNhomDonViCommand req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return StatusCode(201, res);
            }
            else
            {
                return StatusCode(500, Result.Fail(res.Message));
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy danh sách nhóm đơn vị theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchNhomDonViQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy chi tiết nhóm đơn vị theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetNhomDonViQuery(id));
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(Result.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }
    [Authorize]
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một nhóm đơn vị", "")]
    public async Task<ActionResult> Update(UpdateNhomDonViCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            else
            {
                return StatusCode(500, Result.Fail(res.Message));
            }
        }
        catch (NotFoundException ex)
        {
            return NotFound(Result.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời một nhóm đơn vị ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteNhomDonViCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }
}
