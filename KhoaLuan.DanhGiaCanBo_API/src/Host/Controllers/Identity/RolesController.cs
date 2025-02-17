using TD.DanhGiaCanBo.Application.Business.RoleApp.Queries;
using TD.DanhGiaCanBo.Application.Business.RoleClaimDistinctApp.Queries;
using TD.DanhGiaCanBo.Application.Identity.Roles;

namespace TD.DanhGiaCanBo.Host.Controllers.Identity;

public class RolesController : VersionNeutralApiController
{
    private readonly IRoleService _roleService;

    public RolesController(IRoleService roleService) => _roleService = roleService;

    [HttpGet]
    //[MustHavePermission(TDAction.View, TDResource.Roles)]
    [MustHavePermission(TDAction.View, TDResource.Tenants + "," + TDResource.NhomQuanTriDonVi)]
    [OpenApiOperation("Get a list of all roles.", "")]
    public Task<List<RoleDto>> GetListAsync(CancellationToken cancellationToken)
    {
        return _roleService.GetListAsync(cancellationToken);
    }


    [HttpGet("permissions")]
    [MustHavePermission(TDAction.View, TDResource.Roles)]
    [OpenApiOperation("Get a list of all permissions.", "")]
    public Task<List<RolePermission>> SearchWithPermissionsAsync(CancellationToken cancellationToken)
    {
        return _roleService.SearchWithPermissionsAsync(cancellationToken);
    }


    [HttpGet("{id}")]
    [MustHavePermission(TDAction.View, TDResource.Roles)]
    [OpenApiOperation("Get role details.", "")]
    public Task<RoleDto> GetByIdAsync(string id)
    {
        return _roleService.GetByIdAsync(id);
    }

    [HttpGet("{id}/permissions")]
    [MustHavePermission(TDAction.View, TDResource.RoleClaims)]
    [OpenApiOperation("Get role details with its permissions.", "")]
    public Task<RoleDto> GetByIdWithPermissionsAsync(string id, CancellationToken cancellationToken)
    {
        return _roleService.GetByIdWithPermissionsAsync(id, cancellationToken);
    }

    [HttpPut("{id}/permissions")]
    [MustHavePermission(TDAction.Update, TDResource.RoleClaims)]
    [OpenApiOperation("Update a role's permissions.", "")]
    public async Task<ActionResult<string>> UpdatePermissionsAsync(string id, UpdateRolePermissionsRequest request, CancellationToken cancellationToken)
    {
        if (id != request.RoleId)
        {
            return BadRequest();
        }

        return Ok(await _roleService.UpdatePermissionsAsync(request, cancellationToken));
    }

    [HttpPost]
    [MustHavePermission(TDAction.Create, TDResource.Roles)]
    [OpenApiOperation("Create or update a role.", "")]
    public Task<string> RegisterRoleAsync(CreateOrUpdateRoleRequest request)
    {
        return _roleService.CreateOrUpdateAsync(request);
    }

    [HttpDelete("{id}")]
    [MustHavePermission(TDAction.Delete, TDResource.Roles)]
    [OpenApiOperation("Delete a role.", "")]
    public Task<string> DeleteAsync(string id)
    {
        return _roleService.DeleteAsync(id);
    }
    [Authorize]
    [HttpGet("search")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu KhoTieuChi theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchRoleQuery req)
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
    [HttpGet("RoleClaim/Distinct")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu danh sách role claim distinct", "")]
    public async Task<ActionResult> SearchRoleClaim([FromQuery] GetRoleClaimDistinctQuery req)
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
    [HttpPut("update/RoleClaim/Distinct")]
    [OpenApiOperation("Lấy dữ liệu dữ liệu danh sách role claim distinct", "")]
    public async Task<ActionResult> UpdateRoleClaim( UpdateRoleClaimDistinctQuery req)
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