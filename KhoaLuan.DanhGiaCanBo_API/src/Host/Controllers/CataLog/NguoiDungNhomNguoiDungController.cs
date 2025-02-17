using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs;
using TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs.Params;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;

namespace TD.DanhGiaCanBo.Host.Controllers.CataLog;
public class NguoiDungNhomNguoiDungController : VersionedApiController
{
    private readonly IUserNhomNguoiDungService _userNhomNguoiDungService;
    public NguoiDungNhomNguoiDungController(IUserNhomNguoiDungService userNhomNguoiDungService)
    {
        _userNhomNguoiDungService = userNhomNguoiDungService;
    }

    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy danh sách người dùng trong nhóm theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchUserNhomNguoiDungQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _userNhomNguoiDungService.GetUserNhomNguoiDung(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpGet("usernotinnhom")]
    [OpenApiOperation("Lấy danh sách người dùng trong nhóm theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchUserNotInNhomNguoiDungRequest req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _userNhomNguoiDungService.GetUserNotInNhomNguoiDung(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpPost("addList")]
    [OpenApiOperation("Thêm danh sách người dùng vào nhóm", "")]
    public async Task<ActionResult> Post([FromBody] AddUserNhomNguoiDungRequest req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _userNhomNguoiDungService.AddUsesr(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpDelete]
    [OpenApiOperation("Xóa người dùng khỏi nhóm", "")]
    public async Task<ActionResult> Delete([FromBody] RemoveUserNhomNguoiDungRequest req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _userNhomNguoiDungService.Remove(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }
}
