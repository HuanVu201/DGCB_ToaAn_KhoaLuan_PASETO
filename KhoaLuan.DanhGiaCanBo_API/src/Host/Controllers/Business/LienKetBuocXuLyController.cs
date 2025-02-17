using DocumentFormat.OpenXml.Office2010.Excel;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Commands;
using TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Dtos;
using TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Host.Controllers.Business;
public class LienKetBuocXuLyController : VersionedApiController
{
    private readonly IRepository<LienKetBuocXuLy> _repository;
    public LienKetBuocXuLyController(IRepository<LienKetBuocXuLy> repository)
    {
        _repository = repository;
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một liên kết bước xử lý", "")]
    public async Task<ActionResult> Update(UpdateLienKetBuocXuLyCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            else
            {
                return StatusCode(500, Result.Fail(res.Message));
            }
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

    [AllowAnonymous]
    [HttpPost("DanhSachBuocXuLyTiep")]
    public async Task<ActionResult> GetDanhSachBuocXuLyTiep(SearchDanhSachBuocXuLyTiepRequest req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _repository.ListAsync(new SearchReactFlowLienKetBuocXuLySpec(req), cancellationToken);
            return Ok(Result<List<DanhSachBuocXuLyTiepDto>>.Success(res));
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }
}
