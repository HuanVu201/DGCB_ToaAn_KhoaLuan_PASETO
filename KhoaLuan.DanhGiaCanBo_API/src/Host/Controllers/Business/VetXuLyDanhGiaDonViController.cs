using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.VetXuLyDanhGiaDonViApp.Commands;
using TD.DanhGiaCanBo.Application.Business.VetXuLyDanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class VetXuLyDanhGiaDonViController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một dữ liệu khiếu nại ", "")]
    public async Task<ActionResult> Add(AddVetXuLyDanhGiaDonViCommand req)
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
    [OpenApiOperation("Lấy dữ liệu dữ liệu khiếu nại theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchVetXuLyDanhGiaDonViQuery req)
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu khiếu nại", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteVetXuLyDanhGiaDonViCommand req, Guid id)
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

}
