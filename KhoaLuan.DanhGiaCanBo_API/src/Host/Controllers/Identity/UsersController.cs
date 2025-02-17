using Mapster;
using Microsoft.Extensions.Caching.Memory;
using System.IdentityModel.Tokens.Jwt;
using System.Threading;
using TD.CitizenAPI.Application.Identity.Users.Password;
using TD.DanhGiaCanBo.Application.Business.RoleApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Identity.UserGroups;
using TD.DanhGiaCanBo.Application.Identity.UserGroups.Params;
using TD.DanhGiaCanBo.Application.Identity.Users;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
using TD.DanhGiaCanBo.Application.Identity.Users.Password;
using TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Infrastructure.Identity;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;

namespace TD.DanhGiaCanBo.Host.Controllers.Identity;

public class UsersController : VersionNeutralApiController
{
    private readonly IUserService _userService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<UsersController> _logger;
    private readonly ICurrentUser _currentUser;
    private readonly IMemoryCache _memoryCache;
    private readonly IUserGroupService _userGroupService;
   // private readonly IRepositoryWithEvents<ApplicationUserGroup> _repositoryWithEvents;

    public UsersController(IUserGroupService userGroupService, IUserService userService, IConfiguration configuration, ILogger<UsersController> logger, ICurrentUser currentUser, IMemoryCache memoryCache)
    {
        _userService = userService;
        _configuration = configuration;
        _logger = logger;
        _currentUser = currentUser;
        _userGroupService = userGroupService;
        _memoryCache = memoryCache;
    }

    [HttpPost("search")]
   // [MustHavePermission(TDAction.View, TDResource.NhomCanBoMotCua + "," + TDResource.NhomCanBoTTHCC + "," + TDResource.NhomLanhDaoDonVi + "," + TDResource.NhomLanhDaoPhong + "," + TDResource.NhomCanBoXuLyChungThucDienTu + "," + TDResource.NhomChuyenVien + "," + TDResource.NhomQuanTriDonVi + "," + TDResource.NhomVanThuDonVi)]
    [MustHavePermission(TDAction.View, TDResource.Tenants + ","+ TDResource.NhomQuanTriDonVi)]
    [OpenApiOperation("Danh sách người dùng.", "")]
    public Task<PaginationResponse<DanhSachUserGroupDto>> SearchAsync(SearchUserGroupRequest request, CancellationToken cancellationToken)
    {
        return _userGroupService.SearchUserGroup(request, cancellationToken);
    }

    [HttpPost("SearchDanhSachNguoiXuLyTiep")]
    [OpenApiOperation("Danh sách lãnh đạo đơn vị/phòng")]
    public async Task<ActionResult> SearchByChucDanhChucVu([FromBody] SearchUserByBuocXuLyHienTaiRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _userGroupService.SearchDanhSachNguoiXuLyTiep(request, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [HttpGet("currentuser")]
    [OpenApiOperation("Get a user's details.", "")]
    public async Task<object> GetCurrentUserAsync(CancellationToken cancellationToken)
    {
        object res = await _userService.GetCurrentUserAsync(cancellationToken);
        return res;
    }

    [HttpGet("DanhSachTruongDonVi")]
    [OpenApiOperation("Get a user's details.", "")]
    public async Task<ActionResult> GetUserGroupTruongDonVi(CancellationToken cancellationToken)
    {
        try
        {
            var res = await _userGroupService.SearchUserGroupTruongDonVi(cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [HttpGet("currentuser/DanhSachVaiTro")]
    [OpenApiOperation("Get a user's details.", "")]
    public async Task<ActionResult> SearchDanhSachUserGroupVaiTro(CancellationToken cancellationToken)
    {
        try
        {
            var res = await _userGroupService.SearchDanhSachUserGroupVaiTro(cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [HttpPut("{id}")]
    [MustHavePermission(TDAction.Update, TDResource.Users)]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    [OpenApiOperation("Update user information.", "")]
    public async Task<ActionResult> UpdateUserAsync(string id, UpdateUserRequest request, CancellationToken cancellationToken)
    {
        try
        {
            request.Id = id;
            await _userService.UpdateUserAsyncById(request, cancellationToken);

            return Ok(Result.Success());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }

    [Authorize]
    [HttpGet]
    [MustHavePermission(TDAction.View, TDResource.Users)]
    [OpenApiOperation("Get list of all users.", "")]
    public Task<List<UserDto>> GetListAsync(CancellationToken cancellationToken)
    {
        return _userService.GetListAsync(cancellationToken);
    }

    [HttpGet("{id:guid}")]
    [OpenApiOperation("Get a user's details.", "")]
    public async Task<DetailCurrentUserDto> GetByIdAsync(DefaultIdType id, CancellationToken cancellationToken)
    {
        return await _userService.GetUserAsync(id.ToString(), cancellationToken);
    }

    [HttpGet("{id}/roles")]
    [OpenApiOperation("Get a user's roles.", "")]
    public Task<List<UserRoleDto>> GetRolesAsync(string id, CancellationToken cancellationToken)
    {
        return _userService.GetRolesAsync(id, null, cancellationToken);
    }
    [HttpGet("{id}/userGroups/{userGroupId}/roles")]
    [OpenApiOperation("Get a userGroup's roles.", "")]
    public Task<List<UserRoleDto>> GetRolesAsync(string id, string userGroupId, CancellationToken cancellationToken)
    {
        return _userService.GetRolesAsync(id, userGroupId, cancellationToken);
    }
    [HttpPost("{id}/roles")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    [MustHavePermission(TDAction.Update, TDResource.UserRoles)]
    [OpenApiOperation("Update a user's assigned roles.", "")]
    public Task<string> AssignRolesAsync(string id, UserRolesRequest request, CancellationToken cancellationToken)
    {
        return _userService.AssignRolesAsync(id, null, request, cancellationToken); ;
    }

    [HttpPost("{id}/userGroups/{userGroupId}/roles")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    [MustHavePermission(TDAction.Update, TDResource.UserRoles)]
    [OpenApiOperation("Update a userGroup's assigned roles.", "")]
    public Task<string> AssignRolesAsync(string id, string userGroupId, UserRolesRequest request, CancellationToken cancellationToken)
    {
        return _userService.AssignRolesAsync(id, userGroupId, request, cancellationToken);
    }

    [HttpPost]
    [MustHavePermission(TDAction.Create, TDResource.Users)]
    [OpenApiOperation("Creates a new user.", "")]
    public Task<string> CreateAsync(CreateUserRequest request)
    {
        // TODO: check if registering anonymous users is actually allowed (should probably be an appsetting)
        // and return UnAuthorized when it isn't
        // Also: add other protection to prevent automatic posting (captcha?)
        return _userService.CreateAsync(request, GetOriginFromRequest());
    }

    [HttpDelete("{id}")]
    [MustHavePermission(TDAction.Delete, TDResource.Users)]
    [OpenApiOperation("Delete a user.", "")]
    public Task<string> CreateAsync(string id)
    {
        // TODO: check if registering anonymous users is actually allowed (should probably be an appsetting)
        // and return UnAuthorized when it isn't
        // Also: add other protection to prevent automatic posting (captcha?)
        return _userService.DeleteAsync(id);
    }

    [HttpDelete("account")]
    [MustHavePermission(TDAction.Delete, TDResource.Users)]
    [OpenApiOperation("Delete a user.", "")]
    public async Task<ActionResult> DeleteAccountAsync(RemoveUserGroupRequest req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _userGroupService.Remove(req, cancellationToken);
            return Ok(res);
        } catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [HttpPost("admin-register")]
    [MustHavePermission(TDAction.Create, TDResource.Users)]
    [OpenApiOperation("Creates a new user(default password).", "")]
    public Task<string> CreateWithDefaultPasswordAsync(CreateUserWithDefaultPasswordRequest request)
    {
        // TODO: check if registering anonymous users is actually allowed (should probably be an appsetting)
        // and return UnAuthorized when it isn't
        // Also: add other protection to prevent automatic posting (captcha?)
        return _userService.CreateWithDefaultPasswordAsync(request, GetOriginFromRequest());
    }

    [HttpPost("self-register")]
    [TenantIdHeader]
    [AllowAnonymous]
    [OpenApiOperation("Anonymous user creates a user.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    [NonAction]
    private Task<string> SelfRegisterAsync(CreateUserRequest request)
    {
        // TODO: check if registering anonymous users is actually allowed (should probably be an appsetting)
        // and return UnAuthorized when it isn't
        // Also: add other protection to prevent automatic posting (captcha?)
        return _userService.CreateAsync(request, GetOriginFromRequest());
    }

    [HttpPost("{id}/toggle-status")]
    [MustHavePermission(TDAction.Update, TDResource.Users)]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    [OpenApiOperation("Toggle a user's active status.", "")]
    [NonAction]
    private async Task<ActionResult> ToggleStatusAsync(string id, ToggleUserStatusRequest request, CancellationToken cancellationToken)
    {
        if (id != request.UserId)
        {
            return BadRequest();
        }

        await _userService.ToggleStatusAsync(request, cancellationToken);
        return Ok();
    }

    [HttpGet("confirm-email")]
    [AllowAnonymous]
    [OpenApiOperation("Confirm email address for a user.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Search))]
    [NonAction]
    private Task<string> ConfirmEmailAsync([FromQuery] string tenant, [FromQuery] string userId, [FromQuery] string code, CancellationToken cancellationToken)
    {
        return _userService.ConfirmEmailAsync(userId, code, tenant, cancellationToken);
    }

    [HttpGet("confirm-phone-number")]
    [AllowAnonymous]
    [OpenApiOperation("Confirm phone number for a user.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Search))]
    [NonAction]
    private Task<string> ConfirmPhoneNumberAsync([FromQuery] string userId, [FromQuery] string code)
    {
        return _userService.ConfirmPhoneNumberAsync(userId, code);
    }

    [HttpPost("forgot-password")]
    [AllowAnonymous]
    [TenantIdHeader]
    [OpenApiOperation("Request a password reset email for a user.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    [NonAction]
    private Task<string> ForgotPasswordAsync(ForgotPasswordRequest request)
    {
        return _userService.ForgotPasswordAsync(request, GetOriginFromRequest());
    }

    [HttpPost("reset-password")]
    [OpenApiOperation("Reset a user's password.", "")]
    [ApiConventionMethod(typeof(TDApiConventions), nameof(TDApiConventions.Register))]
    public Task<string> ResetPasswordAsync(ResetPasswordRequest request)
    {
        return _userService.ResetPasswordAsync(request);
    }

    [HttpPost("admin-change-password")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Admin thay đổi mật khẩu.", "")]
    public Task<bool> AdminResetPasswordAsync(AdminResetPasswordRequest request)
    {
        return _userService.AdminChangePasswordAsync(request);
    }

    [HttpPost("admin-change-password-validations")]
    //[MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [MustHavePermission(TDAction.View + "," + TDAction.Full, TDResource.Tenants + "," + TDResource.NhomQuanTriDonVi + "," + TDResource.NhomQuanTriNghiepVu)]
    [OpenApiOperation("Admin thay đổi mật khẩu theo yêu cầu.", "")]
    public async Task<ActionResult<Result>> AdminChangePasswordWithValidationAsync(PasswordResetOptions request)
    {
        try
        {
            // Gọi service để thực hiện việc thay đổi mật khẩu với các validation
            var result = await _userService.AdminResetPasswordWithValidationAsync(request);

            // Trả về kết quả dưới dạng HTTP OK (200) nếu thành công
            return Ok(result);
        }
        catch (Exception ex)
        {
            // Trả về lỗi nếu có lỗi trong quá trình thực hiện
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("admin-reset-password/{id}")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Admin reset mật khẩu.", "")]
    public Task<Result> AdminResetPasswordAsync(string id)
    {
        return _userService.AdminResetPasswordAsync(id);
    }

    private string GetOriginFromRequest() => $"{Request.Scheme}://{Request.Host.Value}{Request.PathBase.Value}";

    [AllowAnonymous]
    [Route("/logout")]
    public async Task<IActionResult> Logout(string? accessToken, string? returnUrl, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(returnUrl))
        {
            returnUrl = "/";
        }

        if (accessToken != null)
        {
            DetailCurrentUserDto? currUsr = null;
            JwtSecurityToken jwtSecurityToken;
            jwtSecurityToken = new JwtSecurityToken(accessToken);
            try
            {
                string? idUser = jwtSecurityToken.Payload["uid"]?.ToString();
                currUsr = await _userService.GetAsync(idUser ?? string.Empty, cancellationToken);
                if (currUsr != null)
                {
                    string? typeUser = currUsr.TypeUser;
                    switch (typeUser)
                    {
                        case "CanBo":
                        case "Admin":
                            string? usingSSOWSO2IS = _configuration.GetSection("SSOWSO2IS:Active").Value;
                            if (usingSSOWSO2IS == "1")
                            {
                                string? url_logout = _configuration.GetSection("SSOWSO2IS:Url_logout").Value;
                                string? url_CallBack_logout = _configuration.GetSection("SSOWSO2IS:Url_CallBack_logout").Value;
                                string? id_token = Request.Cookies["id_token_SSOWSO2IS"];
                                if (id_token != null)
                                {
                                    string urlLogout = string.Format(url_logout ?? string.Empty, url_CallBack_logout, id_token);
                                    Response.Cookies.Delete("id_token_SSOWSO2IS");
                                    return Redirect(urlLogout);
                                }
                            }

                            string? usingSSOCas = _configuration.GetSection("SSOCAS:Active").Value;
                            if (usingSSOCas == "1")
                            {
                                string? cashost = _configuration.GetSection("SSOCAS:Cashost").Value;
                                string? returnUrlLogout = _configuration.GetSection("SSOCAS:ReturnUrlLogout").Value;
                                returnUrl = cashost + "logout?backtologin=" + returnUrlLogout;
                            }

                            break;
                    }

                    var diffTimeToken = jwtSecurityToken.ValidTo - DateTime.UtcNow;
                    if (diffTimeToken.TotalSeconds > 0)
                    {
                        _memoryCache.Set(accessToken, "Logout", diffTimeToken);
                    }
                }
            }
            catch
            {

            }
        }

        ViewBag.UrlRedirect = returnUrl;
        return View("~/Views/Identity/Logout.cshtml");
    }

    private string? GetIpAddress() =>
    Request.Headers.ContainsKey("X-Forwarded-For")
        ? Request.Headers["X-Forwarded-For"]
        : HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString() ?? "N/A";
    private string? GetDevice() =>
    Request.Headers.TryGetValue("User-Agent", out var value) ? value : "Unknown";

    [Authorize]
    [HttpGet("GetUsersWithDonViQuanLy")]
    [OpenApiOperation("Lấy dữ liệu người dùng của đơn vị quản lý", "")]
    public async Task<ActionResult> Search([FromQuery] SearchUsersWithDonViQuanLyQuery req)
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
    [HttpPut("UpdateUserGroup/{id:guid}")]
    [OpenApiOperation("Update user information.", "")]
    public async Task<ActionResult> UpdateUserGroupRequest(DefaultIdType id, UpdateUserGroupRequest request, CancellationToken cancellationToken)
    {
        try
        {
            request.Id = id;
            await _userGroupService.Update(request, cancellationToken);


            return Ok(Result.Success());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }

    [HttpPut("UpdateCurrentUserGroup")]
    [OpenApiOperation("Update current user group information.", "")]
    public async Task<ActionResult> UpdateCurrentUserGroupAsync([FromBody] UpdateUserGroupRequest request, CancellationToken cancellationToken)
    {
        try
        {
            string? userGroupId = _currentUser.GetUserGroupId();
            string? userType = _currentUser.GetTypeUser();
            var adminRequest = request.Adapt<UpdateUserRequest>();
            adminRequest.Id = _currentUser.GetUserId().ToString();

            await _userService.UpdateUserAsyncById(adminRequest, cancellationToken);
            if (!string.IsNullOrEmpty(userGroupId))
            {
                request.Id = Guid.Parse(userGroupId);
                await _userGroupService.Update(request, cancellationToken);
            }

            return Ok(Result.Success());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }
    [Authorize]
    [HttpPost("searchUserGroup")]
    [OpenApiOperation("search GroupUser", "")]
    public Task<PaginationResponse<DanhSachUserGroupDto>> SearchUserGroup([FromBody] SearchUserGroupNotGroupCodeRequest req, CancellationToken cancellationToken)
    {
        return _userGroupService.SearchUserGroupNotGroupCode(req, cancellationToken);
    }
}
