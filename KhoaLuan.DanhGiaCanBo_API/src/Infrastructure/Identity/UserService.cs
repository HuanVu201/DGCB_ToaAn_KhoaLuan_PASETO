using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Finbuckle.MultiTenant;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Events;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Common.FileStorage;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Mailing;
using TD.DanhGiaCanBo.Application.Common.Models;
using TD.DanhGiaCanBo.Application.Common.Specification;
using TD.DanhGiaCanBo.Application.Identity.Users;
using TD.DanhGiaCanBo.Domain.Identity;
using TD.DanhGiaCanBo.Infrastructure.Auth;
using TD.DanhGiaCanBo.Infrastructure.Persistence.Context;
using TD.DanhGiaCanBo.Shared.Authorization;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System.Threading;
using TD.DanhGiaCanBo.Infrastructure.Persistence.Repository;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Catalog;
using Org.BouncyCastle.Ocsp;
using TD.DanhGiaCanBo.Application.Identity.Users.Password;
using TD.DanhGiaCanBo.Application.Common.Identity;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
using TD.DanhGiaCanBo.Infrastructure.Identity.Specifications;
using System.Collections.Generic;
using TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
using TD.DanhGiaCanBo.Application.Identity.UserGroups;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
using TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs;
using TD.DanhGiaCanBo.Infrastructure.Identity.CustomManager;
using Newtonsoft.Json;
using Paseto.Builder;
using Paseto.Cryptography.Key;
using Paseto;
using System.Text;
using TD.DanhGiaCanBo.Infrastructure.Auth.PASETO;
using TD.DanhGiaCanBo.Application.Identity.Tokens;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;

internal partial class UserService : IUserService
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly CustomUserManager _userManager;
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly ApplicationDbContext _db;
    private readonly IStringLocalizer _t;
    private readonly IJobService _jobService;
    private readonly IMailService _mailService;
    private readonly SecuritySettings _securitySettings;
    private readonly IEmailTemplateService _templateService;
    private readonly IFileStorageService _fileStorage;
    private readonly IEventPublisher _events;
    private readonly ICacheService _cache;
    private readonly ICacheKeyService _cacheKeys;
    private readonly ITenantInfo _currentTenant;
    private readonly ICurrentUser _currentUser;
    private readonly ICommonServices _commonServices;
    private readonly IRepository<ApplicationUserGroup> _userGroupRepo;
    private readonly IUserNhomNguoiDungService _userNhomNguoiDungService;

    public UserService(
        SignInManager<ApplicationUser> signInManager,
        CustomUserManager userManager,
        RoleManager<ApplicationRole> roleManager,
        ApplicationDbContext db,
        IStringLocalizer<UserService> localizer,
        IJobService jobService,
        IMailService mailService,
        IEmailTemplateService templateService,
        IFileStorageService fileStorage,
        IEventPublisher events,
        ICacheService cache,
        ICacheKeyService cacheKeys,
        ITenantInfo currentTenant,
        ICurrentUser currentUser,
        IOptions<SecuritySettings> securitySettings,
        IDapperRepository dapperRepository,
        ICommonServices commonServices,
        IRepository<ApplicationUserGroup> userGroupRepo,
        IUserNhomNguoiDungService userNhomNguoiDungService)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _roleManager = roleManager;
        _db = db;
        _t = localizer;
        _jobService = jobService;
        _mailService = mailService;
        _templateService = templateService;
        _fileStorage = fileStorage;
        _events = events;
        _cache = cache;
        _cacheKeys = cacheKeys;
        _currentTenant = currentTenant;
        _securitySettings = securitySettings.Value;
        _currentUser = currentUser;
        _dapperRepository = dapperRepository;
        _commonServices = commonServices;
        _userGroupRepo = userGroupRepo;
        _userNhomNguoiDungService = userNhomNguoiDungService;
    }

    public async Task<PaginationResponse<UserDetailsDto>> SearchAsync(UserListFilter filter, CancellationToken cancellationToken)
    {

        var spec = new UserListFilterSpec(filter);
        var specPag = new UserListPaginationFilterSpec(filter);

        var users = await _userManager.Users
            .WithSpecification(specPag)
            .ProjectToType<UserDetailsDto>()
            .ToListAsync(cancellationToken);
        int count = await _userManager.Users
            .WithSpecification(spec)
            .CountAsync(cancellationToken);

        return new PaginationResponse<UserDetailsDto>(users, count, filter.PageNumber, filter.PageSize);
    }

    public async Task UpdateUserAsyncById(UpdateUserRequest request, CancellationToken cancellationToken)
    {
        var user = await _userManager.Users
            .Where(x => x.Id == request.Id)
            .AsSplitQuery()
            .SingleOrDefaultAsync(cancellationToken);

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);
        user.FullName = request.FullName ?? user.FullName;
        user.IsActive = request.ActivateUser;
        user.Email = request.Email ?? user.Email;
        user.PhoneNumber = request.PhoneNumber ?? user.PhoneNumber;
        user.UserOrder = request.UserOrder ?? user.UserOrder;
        user.LastModifiedBy = _currentUser.GetUserId();
        user.LastModifiedOn = DateTime.Now;
        var groupData = request.UserGroupData;
        if (groupData != null)
        {
            var group = await _userGroupRepo.GetByIdAsync(groupData.Id);
            if (group != null)
            {
                group.Update(null, null, groupData.GroupCode, groupData.ChucDanhId, groupData.ChucVuId, groupData.IsDefault, groupData.UserOrder, groupData.NoiDungKiemNhiem, groupData.ThamQuyenXepLoai,
                    groupData.KiemNhiem, groupData.TruongDonVi, groupData.KhongDanhGia, groupData.MaPhieuDanhGia, groupData.IsKySo);
                await _userGroupRepo.UpdateAsync(group);
                await _userNhomNguoiDungService.AddToNhom(groupData.NhomNguoiDungs, group.Id);
            }
        }

        await _events.PublishAsync(new ApplicationUserUpdatedEvent(user.Id));
        await _userManager.UpdateAsync(user);
    }

    public async Task<bool> ExistsWithNameAsync(string name)
    {
        EnsureValidTenant();
        return await _userManager.FindByNameAsync(name) is not null;
    }

    public async Task<bool> ExistsWithEmailAsync(string email, string? exceptId = null)
    {
        EnsureValidTenant();
        return await _userManager.FindByEmailAsync(email.Normalize()) is ApplicationUser user && user.Id != exceptId;
    }

    public async Task<bool> ExistsWithPhoneNumberAsync(string phoneNumber, string? exceptId = null)
    {
        EnsureValidTenant();
        return await _userManager.Users.FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber) is ApplicationUser user && user.Id != exceptId;
    }

    private void EnsureValidTenant()
    {
        if (string.IsNullOrWhiteSpace(_currentTenant?.Id))
        {
            throw new UnauthorizedException(_t["Invalid Tenant."]);
        }
    }

    public async Task<List<UserDto>> GetListAsync(CancellationToken cancellationToken) =>
        (await _userManager.Users
                .AsNoTracking()
                .ToListAsync(cancellationToken))
            .Adapt<List<UserDto>>();

    public Task<int> GetCountAsync(CancellationToken cancellationToken) =>
        _userManager.Users.AsNoTracking().CountAsync(cancellationToken);

    public async Task<object> GetCurrentUserAsync(CancellationToken cancellationToken)
    {

        if (_currentUser.GetTypeUser() == ApplicationUser.ApplicationUserType.Admin)
        {
            var user = await _userManager.Users
                .AsNoTracking()
                .Where(u => u.Id == _currentUser.GetUserId().ToString())
                .FirstOrDefaultAsync(cancellationToken);
            _ = user ?? throw new NotFoundException(_t["User Not Found."]);
            return user.Adapt<UserDetailsDto>();

        }
        else
        {
            var user = await _userGroupRepo.FirstOrDefaultAsync(new GetDetailCurrentUserSpec(_currentUser.GetUserGroupId(), string.Empty));
            _ = user ?? throw new NotFoundException(_t["User Not Found."]);
            return user;
        }
    }

    public async Task<DetailCurrentUserDto> GetAsync(string id, CancellationToken cancellationToken)
    {
        var user = await _userGroupRepo.FirstOrDefaultAsync(new GetDetailCurrentUserSpec(id, string.Empty));

        //var user = await _userManager.Users.WithSpecification(new GetDetailCurrentUserSpec(userId)).SingleOrDefaultAsync();
        //var user = await _userManager.Users
        //    .AsNoTracking()
        //    .Where(u => u.Id == userId)
        //    .FirstOrDefaultAsync(cancellationToken);

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);

        return user;
    }
    public async Task<DetailCurrentUserDto> GetUserAsync(string id, CancellationToken cancellationToken)
    {
        var user = await GetAsync(id, cancellationToken);
        return user;
    }

    public async Task ToggleStatusAsync(ToggleUserStatusRequest request, CancellationToken cancellationToken)
    {
        var user = await _userManager.Users.Where(u => u.Id == request.UserId).FirstOrDefaultAsync(cancellationToken);

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);

        bool isAdmin = await _userManager.IsInRoleAsync(user, TDRoles.QuanTriHeThong, null);
        if (isAdmin)
        {
            throw new ConflictException(_t["Administrators Profile's Status cannot be toggled"]);
        }

        user.IsActive = request.ActivateUser;

        await _userManager.UpdateAsync(user);

        await _events.PublishAsync(new ApplicationUserUpdatedEvent(user.Id));
    }

    public async Task<GuestInfoResponse> GetGuestInfoAsync()
    {
        string sqlQueryGuest = @"SELECT Id, TypeUser
                                FROM [Identity].[Users]
                                WHERE UserName = 'Guest'";
        var dataGuest = await _dapperRepository.QueryFirstOrDefaultAsync<ApplicationUser>(sqlQueryGuest);

        if (dataGuest == null)
            throw new Exception(message: "Không có cấu hình thông tin Guest");

        return new GuestInfoResponse(dataGuest.Id, dataGuest.TypeUser ?? string.Empty);
    }
}