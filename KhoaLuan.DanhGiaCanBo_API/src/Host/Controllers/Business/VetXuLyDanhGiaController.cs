using Microsoft.AspNetCore.Mvc;

using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class VetXuLyDanhGiaController : VersionedApiController
{
    private readonly IVetXuLyDanhGiaService _vetXuLyDanhGiaService;
    public VetXuLyDanhGiaController(IVetXuLyDanhGiaService vetXuLyDanhGiaService)
    {
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
    }

    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy danh sách vết xử lý đánh giá theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchVetXuLyDanhGiaQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _vetXuLyDanhGiaService.GetDatas(req, cancellationToken);
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
    public async Task<ActionResult> Search([FromQuery] SearchDanhGiaByNguoiDaXuLyQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _vetXuLyDanhGiaService.GetDanhGiaByNguoiDaXuLy(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }
}
