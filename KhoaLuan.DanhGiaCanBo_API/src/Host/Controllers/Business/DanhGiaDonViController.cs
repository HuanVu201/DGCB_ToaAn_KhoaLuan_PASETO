using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Catalog.DuLieuThongKeApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class DanhGiaDonViController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một dữ liệu DanhGiaDonVi ", "")]
    public async Task<ActionResult> Add(AddDanhGiaDonViCommand req)
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
    [OpenApiOperation("Lấy dữ liệu dữ liệu DanhGiaDonVi theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchDanhGiaDonViQuery req)
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
    [OpenApiOperation("Lấy dữ liệu dữ liệu DanhGiaDonVi theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetDanhGiaDonViQuery(id));
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
    [OpenApiOperation("Lấy dữ liệu dữ liệu DanhGiaDonVi theo mã Id", "")]
    public async Task<ActionResult> GetPhieuDanhGiaDonViQuery(DefaultIdType id, int? daXem)
    {
        try
        {
            var res = await Mediator.Send(new GetPhieuDanhGiaDonViQuery(id, daXem));
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
    public async Task<ActionResult> Update(UpdateDanhGiaDonViCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu DanhGiaDonVi ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteDanhGiaDonViCommand req, DefaultIdType id)
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
    [HttpGet("GetDanhGiaDonViByMaPhieu/{maPhieu:guid}")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu DanhGiaDonVi theo mã Id", "")]
    public async Task<ActionResult> GetDanhGiaDonViByMaPhieu(Guid maPhieu)
    {
        try
        {
            var res = await Mediator.Send(new GetDanhGiaDonViByMaPhieuQuery(maPhieu));
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
    [HttpDelete("XoaDiemLanhDaoCham/{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một dữ liệu DanhGiaDonVi ", "")]
    public async Task<ActionResult> XoaDiemLanhDaoChamCommand([FromBody] XoaDiemLanhDaoChamDGDVCommand req, DefaultIdType id)
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
    public async Task<ActionResult> TraLaiPhieuDanhGiaDonViCommand([FromBody] TraLaiPhieuDanhGiaDonViCommand req, DefaultIdType id)
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
    public async Task<ActionResult> ThuHoiPhieuDanhGiaDonViCommand([FromBody] ThuHoiPhieuDanhGiaDonViCommand req, DefaultIdType id)
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
    public async Task<ActionResult> DuyetPhieuDonViNNhanXet([FromBody] DuyetPhieuNhanXetDGDVQuery req)
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
    [HttpPost("UpdateLanhDaoDaXem")]
    [OpenApiOperation("UpDateLanhDaoDaXem", "")]
    public async Task<ActionResult> UpdateLanhDaoDaXem(UpdateLanhDaoDaXemDGDVQuery req)
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
    [HttpPut("UpdateUrlPhieuDanhGia/{id:guid}")]
    [OpenApiOperation("Sửa một dữ liệu DanhGia", "")]
    public async Task<ActionResult> UpdateUrlPhieuDanhGiaCommand(UpdateUrlPhieuDanhGiaDonViCommand req, DefaultIdType id)
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
