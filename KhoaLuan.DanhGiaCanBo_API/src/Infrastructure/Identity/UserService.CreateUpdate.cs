using System.Security.Claims;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Common.Mailing;
using TD.DanhGiaCanBo.Application.Identity.Users;
using TD.DanhGiaCanBo.Domain.Common;
using TD.DanhGiaCanBo.Domain.Identity;
using TD.DanhGiaCanBo.Shared.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using TD.DanhGiaCanBo.Domain.Catalog;
using System.Data;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Common.Identity;
using TD.DanhGiaCanBo.Domain.Constant;
using DocumentFormat.OpenXml.Vml;
using Group = TD.DanhGiaCanBo.Domain.Catalog.Group;
using TD.DanhGiaCanBo.Application.Common.Classes;
using Microsoft.IdentityModel.Tokens;
using static TD.DanhGiaCanBo.Infrastructure.Identity.ApplicationUser;
using Mapster;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
using TD.DanhGiaCanBo.Application.Identity.UserGroups.Params;
using Microsoft.AspNetCore.Http;
using TD.DanhGiaCanBo.Infrastructure.Identity.Specifications;
using TD.DanhGiaCanBo.Application.Catalog.GroupApp;
using DocumentFormat.OpenXml.VariantTypes;
using TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs.Params;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;

internal partial class UserService
{
    private readonly IDapperRepository _dapperRepository;

    /// <summary>
    /// This is used when authenticating with AzureAd.
    /// The local user is retrieved using the objectidentifier claim present in the ClaimsPrincipal.
    /// If no such claim is found, an InternalServerException is thrown.
    /// If no user is found with that ObjectId, a new one is created and populated with the values from the ClaimsPrincipal.
    /// If a role claim is present in the principal, and the user is not yet in that roll, then the user is added to that role.
    /// </summary>
    public async Task<string> GetOrCreateFromPrincipalAsync(ClaimsPrincipal principal)
    {
        string? objectId = principal.GetObjectId();
        if (string.IsNullOrWhiteSpace(objectId))
        {
            throw new InternalServerException(_t["Invalid objectId"]);
        }

        var user = await _userManager.Users.Where(u => u.ObjectId == objectId).FirstOrDefaultAsync()
            ?? await CreateOrUpdateFromPrincipalAsync(principal);

        if (principal.FindFirstValue(ClaimTypes.Role) is string role &&
            await _roleManager.RoleExistsAsync(role) &&
            !await _userManager.IsInRoleAsync(user, role, null))
        {
            await _userManager.AddToRoleAsync(user, role, null);
        }

        return user.Id;
    }

    private async Task<ApplicationUser> CreateOrUpdateFromPrincipalAsync(ClaimsPrincipal principal)
    {
        string? email = principal.FindFirstValue(ClaimTypes.Upn);
        string? username = principal.GetDisplayName();
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(username))
        {
            throw new InternalServerException(string.Format(_t["Username or Email not valid."]));
        }

        var user = await _userManager.FindByNameAsync(username);
        if (user is not null && !string.IsNullOrWhiteSpace(user.ObjectId))
        {
            throw new InternalServerException(string.Format(_t["Username {0} đã tồn tại, không thể thêm mới."], username));
        }

        if (user is null)
        {
            user = await _userManager.FindByEmailAsync(email);
            if (user is not null && !string.IsNullOrWhiteSpace(user.ObjectId))
            {
                throw new InternalServerException(string.Format(_t["Email {0} đã tồn tại, không thể thêm mới."], email));
            }
        }

        IdentityResult? result;
        if (user is not null)
        {
            user.ObjectId = principal.GetObjectId();
            result = await _userManager.UpdateAsync(user);

            await _events.PublishAsync(new ApplicationUserUpdatedEvent(user.Id));
        }
        else
        {
            user = new ApplicationUser
            {
                ObjectId = principal.GetObjectId(),
                Email = email,
                NormalizedEmail = email.ToUpperInvariant(),
                UserName = username,
                TypeUser = ApplicationUserType.CanBo,
                NormalizedUserName = username.ToUpperInvariant(),
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                IsActive = true
            };
            result = await _userManager.CreateAsync(user);

            await _events.PublishAsync(new ApplicationUserCreatedEvent(user.Id));
        }

        if (!result.Succeeded)
        {
            throw new InternalServerException(_t["Validation Errors Occurred."], result.GetErrors(_t));
        }

        return user;
    }

    public async Task<string> CreateAsync(CreateUserRequest request, string origin)
    {
        var res = await AddUserToGroupIfExist(request.UserName, request.UserGroupData);
        if (res == 1)
        {
            return string.Join(Environment.NewLine, "cap nhat thanh cong");
        }
        var user = new ApplicationUser
        {
            Email = request.Email,
            FullName = request.FullName,
            UserName = request.UserName,
            PhoneNumber = request.PhoneNumber,
            IsActive = request.IsActive.HasValue ? request.IsActive.Value : false,
            UserOrder = request.UserOrder.HasValue ? request.UserOrder.Value : 9999,
            TypeUser = ApplicationUserType.CanBo
        };
        var userId = Guid.NewGuid();
        user.SetId(userId.ToString());
        request.UserGroupData.UserId = user.Id;
        user.AddToGroup(request.UserGroupData?.Adapt<ApplicationUserGroup>());

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            throw new InternalServerException(_t["Validation Errors Occurred."], result.GetErrors(_t));
        }
        await _userNhomNguoiDungService.AddToNhom(request.UserGroupData?.NhomNguoiDungs, userId);


        //await _userManager.AddToRoleAsync(user, TDRoles.ChuyenVien);

        var messages = new List<string> { string.Format(_t["User {0} Registered."], user.UserName) };

        if (_securitySettings.RequireConfirmedAccount && !string.IsNullOrEmpty(user.Email))
        {
            // send verification email
            string emailVerificationUri = await GetEmailVerificationUriAsync(user, origin);
            RegisterUserEmailModel eMailModel = new RegisterUserEmailModel()
            {
                Email = user.Email,
                UserName = user.UserName,
                Url = emailVerificationUri
            };
            var mailRequest = new MailRequest(
                new List<string> { user.Email },
                _t["Confirm Registration"],
                _templateService.GenerateEmailTemplate("email-confirmation", eMailModel));
            _jobService.Enqueue(() => _mailService.SendAsync(mailRequest, CancellationToken.None));
            messages.Add(_t[$"Please check {user.Email} to verify your account!"]);
        }

        await _events.PublishAsync(new ApplicationUserCreatedEvent(user.Id));

        return string.Join(Environment.NewLine, messages);
    }
    public async Task<string> CreateWithDefaultPasswordAsync(CreateUserWithDefaultPasswordRequest request, string origin)
    {

        var res = await AddUserToGroupIfExist(request.UserName, request.UserGroupData);
        if(res == 1)
        {
            return string.Join(Environment.NewLine, "cap nhat thanh cong");
        }
        var user = new ApplicationUser
        {
            Email = request.Email,
            FullName = request.FullName,
            UserName = request.UserName,
            PhoneNumber = request.PhoneNumber,
            IsActive = request.IsActive.HasValue ? request.IsActive.Value : true,
            UserOrder = request.UserOrder.HasValue ? request.UserOrder.Value : 9999,
            CreatedBy = _currentUser.GetUserId(),
            TypeUser = ApplicationUserType.CanBo
        };
        var userId = Guid.NewGuid();
        user.SetId(userId.ToString());
        request.UserGroupData.UserId = user.Id;
        user.AddToGroup(request.UserGroupData?.Adapt<ApplicationUserGroup>());

        // get default password
        CommonSettings defaultPassword = _commonServices.Get();

        if (defaultPassword == null && string.IsNullOrEmpty(defaultPassword.DefaultPassword)) throw new NoNullAllowedException($"default password is not founded!");

        var result = await _userManager.CreateAsync(user, defaultPassword.DefaultPassword);
        if (!result.Succeeded)
        {
            throw new InternalServerException(_t["Validation Errors Occurred."], result.GetErrors(_t));
        }
        await _userNhomNguoiDungService.AddToNhom(request.UserGroupData?.NhomNguoiDungs, userId);

        //await _userManager.AddToRoleAsync(user, TDRoles.ChuyenVien);

        var messages = new List<string> { string.Format(_t["User {0} Registered."], user.UserName) };

        await _events.PublishAsync(new ApplicationUserCreatedEvent(user.Id));

        return string.Join(Environment.NewLine, messages);
    }

    public async Task UpdateAsync(UpdateUserRequest request, string userId)
    {
        var user = await _userManager.Users
            .Where(x => x.Id == request.Id)
            .AsSplitQuery()
            .SingleOrDefaultAsync();

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);
        user.PhoneNumber = request.PhoneNumber;
        user.FullName = request.FullName ?? user.FullName;

        user.LastModifiedBy = _currentUser.GetUserId();
        user.LastModifiedOn = DateTime.Now;
        await _userManager.UpdateAsync(user);
        var groupData = request.UserGroupData;
        if (groupData != null)
        {
            var group = await _userGroupRepo.GetBySpecAsync(new ApplicationUserGroupSpec.GetUserGroup(userId, null));
            if (group != null)
            {
                if (group.IsDefault && groupData.IsDefault && group.Id != groupData.Id)
                {
                    throw new InternalServerException("Tài khoản đã được tích mặc định ở một đơn vị khác");
                }
                group.Update(null, null, groupData.GroupCode, groupData.ChucDanhId, groupData.ChucVuId, groupData.IsDefault, groupData.UserOrder, groupData.NoiDungKiemNhiem, groupData.ThamQuyenXepLoai,
                    groupData.KiemNhiem, groupData.TruongDonVi, groupData.KhongDanhGia, groupData.MaPhieuDanhGia,groupData.IsKySo);

                await _userGroupRepo.UpdateAsync(group);
                await _userNhomNguoiDungService.AddToNhom(groupData.NhomNguoiDungs, group.Id);
            }
        }
        string? phoneNumber = await _userManager.GetPhoneNumberAsync(user);
        if (request.PhoneNumber != phoneNumber)
        {
            await _userManager.SetPhoneNumberAsync(user, request.PhoneNumber);
        }

        var result = await _userManager.UpdateAsync(user);

        await _signInManager.RefreshSignInAsync(user);

        await _events.PublishAsync(new ApplicationUserUpdatedEvent(user.Id));

        if (!result.Succeeded)
        {
            throw new InternalServerException(_t["Update profile failed"], result.GetErrors(_t));
        }
    }

    /// <summary>
    /// 0: username chua bi lay, 1: them user vao group thanh cong.
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    private async Task<int> AddUserToGroupIfExist(string userName, AddUserGroupData? userGroupData)
    {
        var user = await _userManager.Users
            .Where(x => x.UserName == userName)
            .SingleOrDefaultAsync();
        if(user == null)
        {
            return 0;
        }

        if (userGroupData == null)
        {
            throw new BadHttpRequestException(_t["UserGroupData is required."]);
        }
        try
        {
            var group = await _userGroupRepo.GetBySpecAsync(new ApplicationUserGroupSpec.GetUserGroup(user.Id, null));
            if (group != null)
            {
                if (group.IsDefault && userGroupData.IsDefault && group.Id != userGroupData.Id)
                {
                    throw new InternalServerException("Tài khoản đã được tích mặc định ở một đơn vị khác");
                }
            }
            var userGroup = new ApplicationUserGroup(user.Id, userGroupData.OfficeCode, userGroupData.GroupCode, userGroupData.ChucDanhId, userGroupData.ChucVuId, userGroupData.IsDefault,
            userGroupData.UserOrder, userGroupData.NoiDungKiemNhiem, userGroupData.MaPhieuDanhGia, userGroupData.ThamQuyenXepLoai, userGroupData.KiemNhiem, userGroupData.TruongDonVi, userGroupData.KhongDanhGia);
            await _userGroupRepo.AddAsync(userGroup);
            await _userNhomNguoiDungService.AddToNhom(userGroupData.NhomNguoiDungs, userGroup.Id);

            return 1;
        } catch (Exception ex)
        {
            throw ex;
        }
    }
}
