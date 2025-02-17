using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Ocsp;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Identity.Users;
using TD.DanhGiaCanBo.Application.Identity.XepLoaiDanhGiaApp.Queries;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class LstUsersController : VersionedApiController
{
    //[AllowAnonymous]
    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu dữ liệu SearchLstUsersQuery theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchLstUsersQuery req)
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
    [HttpGet("SearchListAUGOfGroupQuery")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu SearchListAUGOfGroupQuery theo bộ lọc", "")]
    public async Task<ActionResult> SearchListAUGOfGroup([FromQuery] SearchListAUGOfGroupQuery req)
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
    [HttpGet("SearchListAUGNotPermissionDanhGia")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu SearchListAUGNotPermissionDanhGia theo bộ lọc", "")]
    public async Task<ActionResult> SearchListAUGNotPermissionDanhGia([FromQuery] SearchListAUGNotPermissionDanhGiaQuery req)
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
    [HttpGet("SearchUserNotBuocXuLy")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu SearchUserNotBuocXuLy theo bộ lọc", "")]
    public async Task<ActionResult> SearchUserNotBuocXuLy([FromQuery] SearchUserNotBuocXuLyQuery req)
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
    [HttpGet("SearchListAUGNotPermission")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu SearchListAUGNotPermission theo bộ lọc", "")]
    public async Task<ActionResult> SearchListAUGNotPermission([FromQuery] SearchListAUGNotPermissionQuery req)
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
