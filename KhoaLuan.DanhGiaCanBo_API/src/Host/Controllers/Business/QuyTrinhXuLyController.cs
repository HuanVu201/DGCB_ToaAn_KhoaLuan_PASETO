using MediatR;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Ocsp;
using TD.DanhGiaCanBo.Application.Business.ActionApp.Commands;
using TD.DanhGiaCanBo.Application.Business.ActionApp.Queries;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class QuyTrinhXuLyController : VersionedApiController
{
    [Authorize]
    [HttpPost("AddFlow")]
    [OpenApiOperation("Thêm một sơ đồ quy trình xử lý ", "")]
    public async Task<ActionResult> Add(AddReactFlowQuyTrinhCommand req, CancellationToken cancellationToken)
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
    [HttpPut("UpdateFlow")]
    [OpenApiOperation("Sửa một sơ đồ quy trình xử lý", "")]
    public async Task<ActionResult> Update(UpdateReactFlowQuyTrinhCommand req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return Ok(res);
            } else
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
    [HttpGet("GetFlow/{id:guid}")]
    [OpenApiOperation("Lấy chi tiết sơ đồ quy trình xử lý", "")]
    public async Task<ActionResult> GetFlow([FromQuery] GetReactFlowQuyTrinhXuLyQuery req, Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(new GetReactFlowQuyTrinhXuLyQuery(id, req.FilterByChucVu, req.FilterByChucDanh), cancellationToken);
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
    [HttpPost]
    [OpenApiOperation("Thêm một quy trình xử lý ", "")]
    public async Task<ActionResult> Add(AddQuyTrinhXuLyCommand req, CancellationToken cancellationToken)
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
    [OpenApiOperation("Lấy danh sách quy trình xử lý theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchQuyTrinhXuLyQuery req)
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
    [OpenApiOperation("Lấy chi tiết quy trình xử lý theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetQuyTrinhXuLyQuery(id));
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
    [OpenApiOperation("Sửa một quy trình xử lý", "")]
    public async Task<ActionResult> Update(UpdateQuyTrinhXuLyCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời một quy trình xử lý ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteQuyTrinhXuLyCommand req, DefaultIdType id)
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
