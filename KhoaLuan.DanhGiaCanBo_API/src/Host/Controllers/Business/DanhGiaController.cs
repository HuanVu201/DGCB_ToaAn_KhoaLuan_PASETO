using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Catalog.DuLieuThongKeApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class DanhGiaController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một dữ liệu DanhGia ", "")]
    public async Task<ActionResult> Add(AddDanhGiaCommand req)
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
    [OpenApiOperation("Lấy dữ liệu dữ liệu DanhGia theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchDanhGiaQuery req)
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
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu DanhGia theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetDanhGiaQuery(id));
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
    [HttpGet("GetDanhGiaByMaPhieu/{maPhieu:guid}")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu DanhGia theo mã Id", "")]
    public async Task<ActionResult> GetDanhGiaByMaPhieu(Guid maPhieu)
    {
        try
        {
            var res = await Mediator.Send(new GetDanhGiaByMaPhieuQuery(maPhieu));
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
    [HttpGet("GetPhieuDanhGia/{daXem:int}/{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu DanhGia theo mã Id", "")]
    public async Task<ActionResult> GetPhieuDanhGiaQuery(DefaultIdType id, int? daXem)
    {
        try
        {
            var res = await Mediator.Send(new GetPhieuDanhGiaQuery(id, daXem));
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
    [OpenApiOperation("Sửa một dữ liệu DanhGia", "")]
    public async Task<ActionResult> Update(UpdateDanhGiaCommand req, DefaultIdType id)
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
    [HttpPut("UpdateDanhGiaWithoutBuocId/{id:guid}")]
    [OpenApiOperation("Sửa một dữ liệu DanhGia", "")]
    public async Task<ActionResult> UpdateDanhGiaWithoutBuocIdCommand(UpdateDanhGiaWithoutBuocIdCommand req, DefaultIdType id)
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
    [HttpPut("UpdateUrlPhieuDanhGia/{id:guid}")]
    [OpenApiOperation("Sửa một dữ liệu DanhGia", "")]
    public async Task<ActionResult> UpdateUrlPhieuDanhGiaCommand(UpdateUrlPhieuDanhGiaCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu DanhGia ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteDanhGiaCommand req, DefaultIdType id)
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
    [HttpDelete("XoaDiemLanhDaoCham/{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu DanhGia ", "")]
    public async Task<ActionResult> XoaDiemLanhDaoChamCommand([FromBody] XoaDiemLanhDaoChamCommand req, DefaultIdType id)
    {
        try
        {
            req.DanhGiaId = id;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("TraLaiPhieuDanhGia/{id:guid}")]
    [OpenApiOperation("Trả lại phiếu đánh giá ", "")]
    public async Task<ActionResult> TraLaiPhieuDanhGiaCommand([FromBody] TraLaiPhieuDanhGiaCommand req, DefaultIdType id)
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
    [HttpPost("ThuHoiPhieuDanhGia/{id:guid}")]
    [OpenApiOperation("Trả lại phiếu đánh giá ", "")]
    public async Task<ActionResult> ThuHoiPhieuDanhGiaCommand([FromBody] ThuHoiPhieuDanhGiaCommand req, DefaultIdType id)
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
    [HttpPost("DuyetDanhGia")]
    [OpenApiOperation("Duyệt đánh giá", "")]
    public async Task<ActionResult> DuyetPhieuNhanXet([FromBody] DuyetPhieuNhanXetQuery req)
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
    [HttpPatch("{id:guid}")]
    [OpenApiOperation("khôi phục một dữ liệu DanhGia ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreDanhGiaCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("UpdateLanhDaoDaXem")]
    [OpenApiOperation("UpDateLanhDaoDaXem", "")]
    public async Task<ActionResult> UpdateLanhDaoDaXem(UpdateLanhDaoDaXemQuery req)
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
    [HttpGet("GetCurrentUserDanhGia")]
    [OpenApiOperation("Lấy dữ liệu người đánh giá hiện tại", "")]
    public async Task<ActionResult> GetCurrentUserDanhGiaQuery()
    {
        try
        {
            var res = await Mediator.Send(new GetCurrentUserDanhGiaQuery());
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
    [HttpGet("XuatDanhGiaMau09")]
    [OpenApiOperation("Lấy dữ liệu thống kê mẫu 09", "")]
    public async Task<ActionResult> XuatDanhGiaMau09([FromQuery] XuatDanhGiaMau09Query req)
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
    [HttpGet("DuLieuPhieuCQ")]
    [OpenApiOperation("Lấy dữ liệu thống kê cơ quan", "")]
    public async Task<ActionResult> DuLieuPhieuCQ([FromQuery] DuLieuPhieuCQQuery req)
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
    [HttpGet("GetTongHopCaNhan")]
    [OpenApiOperation("Lấy dữ liệu thống kê cá nhân", "")]
    public async Task<ActionResult> GetTongHopCaNhan([FromQuery] GetTongHopCaNhanQuery req)
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
    [HttpPost("XoaDanhGiaChon")]
    [OpenApiOperation("Xóa đánh giá chọn", "")]
    public async Task<ActionResult> XoaDanhGiaChonTask(XoaDanhGiaChonQuery req)
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

    [Authorize]
    [HttpPost("XoaDanhGiaQT")]
    [OpenApiOperation("Xóa đánh giá quản trị", "")]
    public async Task<ActionResult> XoaDanhGiaQTTask(XoaDanhGiaQTQuery req)
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

    [Authorize]
    [HttpPost("KhoiPhucDanhGiaChon")]
    [OpenApiOperation("Khôi phục đánh giá quản trị", "")]
    public async Task<ActionResult> KhoiPhucDanhGiaQTTask(KhoiPhucDanhGiaChonQuery req)
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
    #region API Dashboard
    [AllowAnonymous]
    [HttpPost("ThongKeTimerJob2")]
    [OpenApiOperation("Lấy dữ liệu ThongKeTimerJob2", "")]
    public async Task<ActionResult> ThongKeTimerJob2(ThongKeTimerJob2Query req)
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
    [HttpPost("GetNhacViec")]
    [OpenApiOperation("Lấy dữ liệu nhắc việc cá nhân", "")]
    public async Task<ActionResult> GetNhacViec(GetNhacViecQuery req)
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
    [HttpPost("GetTKDanhGiaCaNhan")]
    [OpenApiOperation("Lấy thống kê GetTKDanhGiaCaNhan", "")]
    public async Task<ActionResult> GetTKDanhGIaCaNhanQuery(GetTKDanhGIaCaNhanQuery req)
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
    [HttpPost("GetDanhSachDanhGia")]
    [OpenApiOperation("Lấy dữ liệu GetDanhSachDanhGiaQuery", "")]
    public async Task<ActionResult> GetDanhSachDanhGiaQuery([FromBody] GetDanhSachDanhGiaQuery req)
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
    [AllowAnonymous]
    [HttpPost("GetDanhSachDanhGiaTichHop")]
    [OpenApiOperation("Lấy dữ liệu GetDanhSachDanhGiaTichHop", "")]
    public async Task<ActionResult> SearchDanhGiaTichHopQuery([FromBody] SearchDanhGiaTichHopQuery req)
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
    [HttpPost("GetThongKeTheoDonVi")]
    [OpenApiOperation("Lấy dữ liệu GetThongKeTheoDonVi", "")]
    public async Task<ActionResult> GetThongKeTheoDonVi(GetThongKeTheoDonViQuery req)
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
    #endregion

    [Authorize]
    [HttpGet("UrlPhieuDanhGia")]
    [OpenApiOperation("Lấy thông tin phiếu đánh giá pdf và docx", "")]
    public async Task<ActionResult> GetPhieuDanhGiaQuery([FromQuery] GetUrlPhieuDanhGiaQuery req)
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
