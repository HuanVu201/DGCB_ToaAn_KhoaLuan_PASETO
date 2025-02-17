using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Commands;
using TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Queries;
using TD.DanhGiaCanBo.Application.Business.ChucDanhMauPhieuDanhGiaApp.Specs;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class ChucDanhController : VersionedApiController
{
    private readonly IRepository<ChucDanhMauPhieuDanhGia> _chucDanhMauPhieuDanhGiaRepo;
    public ChucDanhController(
         IRepository<ChucDanhMauPhieuDanhGia> chucDanhMauPhieuDanhGiaRepo)
    {
        _chucDanhMauPhieuDanhGiaRepo = chucDanhMauPhieuDanhGiaRepo;
    }


    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một dữ liệu ChucDanh ", "")]
    public async Task<ActionResult> Add(AddChucDanhCommand req)
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

    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu dữ liệu ChucDanh theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchChucDanhQuery req)
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
    [HttpGet("MauPhieuDanhGias/{id:guid}")]
    [OpenApiOperation("Lấy danh sách mẫu phiếu", "")]
    public async Task<ActionResult> SearchMauPhieu(DefaultIdType id)
    {
        try
        {
            List<ChucDanhMauPhieuDanhGiaSpecifications.Response.MauPhieuDanhGiaResponse> res = await _chucDanhMauPhieuDanhGiaRepo.ListAsync(new ChucDanhMauPhieuDanhGiaSpecifications.DanhSachMauPhieuDanhGiaByChucDanh(id));
            return Ok(Result<List<ChucDanhMauPhieuDanhGiaSpecifications.Response.MauPhieuDanhGiaResponse>>.Success(res));
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu ChucDanh theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetChucDanhQuery(id));
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
    [OpenApiOperation("Sửa một dữ liệu ChucDanh", "")]
    public async Task<ActionResult> Update(UpdateChucDanhCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu ChucDanh ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteChucDanhCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một dữ liệu ChucDanh ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreChucDanhCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
