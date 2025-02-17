using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Commands;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class BuocXuLyController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một bước xử lý ", "")]
    public async Task<ActionResult> Add(AddBuocXuLyCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy danh sách bước xử lý theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchBuocXuLyQuery req)
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
    [OpenApiOperation("Lấy chi tiết bước xử lý theo mã Id", "")]
    public async Task<ActionResult> Get([FromQuery] GetBuocXuLyQuery req, Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetBuocXuLyQuery(id, req.InCludeChucVu, req.InCludeChucDanh, req.InCludeNhomNguoiDung, req.InCludeTrangThaiDanhGia, req.InCludeSource, req.InCludeTarget, req.InCludeDonVi));
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
    [OpenApiOperation("Sửa một bước xử lý", "")]
    public async Task<ActionResult> Update(UpdateBuocXuLyCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
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
    [HttpGet("GetBuocHienTai")]
    [OpenApiOperation("Lấy bước hiện tại theo người đang đăng nhập", "")]
    public async Task<ActionResult> GetBuocHienTai([FromQuery] GetQuyTrinhXuLyByCurrentUserQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời một bước xử lý ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteBuocXuLyCommand req, DefaultIdType id)
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
