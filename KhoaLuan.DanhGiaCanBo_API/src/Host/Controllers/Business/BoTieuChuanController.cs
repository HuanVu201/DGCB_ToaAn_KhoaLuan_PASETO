using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Commands;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Queries;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class BoTieuChuanController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một dữ liệu BoTieuChuan ", "")]
    public async Task<ActionResult> Add(AddBoTieuChuanCommand req)
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
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu BoTieuChuan theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetBoTieuChuanQuery(id));
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
    [OpenApiOperation("Sửa một dữ liệu BoTieuChuan", "")]
    public async Task<ActionResult> Update(UpdateBoTieuChuanCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu BoTieuChuan ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteBoTieuChuanCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một dữ liệu BoTieuChuan ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreBoTieuChuanCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu dữ liệu BoTieuChuan theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchBoTieuChuanQuery req)
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
    [HttpGet("bo-tieu-chuan/theo-loai-thoi-gian")]
    [OpenApiOperation("Lấy danh sách bộ tiêu chuẩn theo loại thời gian", "")]
    public async Task<ActionResult<List<BoTieuChuan>>> GetBoTieuChuanByLoaiThoiGian([FromQuery] GetBoTieuChuanByLoaiThoiGianQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
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
}
