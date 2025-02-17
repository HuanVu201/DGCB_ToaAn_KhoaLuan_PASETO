using Microsoft.AspNetCore.Mvc;

using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class VetXuLyDanhGiaToChucController : VersionedApiController
{
    private readonly IVetXuLyDanhGiaToChucService _VetXuLyDanhGiaToChucService;
    public VetXuLyDanhGiaToChucController(IVetXuLyDanhGiaToChucService VetXuLyDanhGiaToChucService)
    {
        _VetXuLyDanhGiaToChucService = VetXuLyDanhGiaToChucService;
    }

    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy danh sách vết xử lý đánh giá theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchVetXuLyDanhGiaToChucQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _VetXuLyDanhGiaToChucService.GetDatas(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpGet("DanhGiaByNguoiDaXuLy")]
    [OpenApiOperation("Lấy danh sách đánh giá theo người đã xử lý theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchDanhGiaToChucByNguoiDaXuLyQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _VetXuLyDanhGiaToChucService.GetDanhGiaByNguoiDaXuLy(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }
}
