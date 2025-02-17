using TD.DanhGiaCanBo.Application.Business.RoleClaimDistinctApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Identity.RoleClaimDistincts;

public class UpdateRoleClaimDistinctQueryHandler : IRequestHandler<UpdateRoleClaimDistinctQuery, Result>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public UpdateRoleClaimDistinctQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<Result> Handle(UpdateRoleClaimDistinctQuery request, CancellationToken cancellationToken)
    {

        try
        {
            var accoutCurrenuser = _currentUser.GetUserName();
            // Truy vấn danh sách quyền hiện tại theo RoleId
            var sql = $@"SELECT DISTINCT 
                            [ClaimValue],
                            [Description],
                            [RoleId]
                        FROM 
                            [Identity].[RoleClaims] 
                        WHERE 
                            [RoleId] = @RoleId";
            var data = await _dapperRepository.QueryAsync<RoelClaimDistinct>(sql, new { RoleId = request.RoleId });

            // Danh sách quyền mới
            var listPermissionUpdate = request.ListPermission;

            // Danh sách quyền cũ lấy từ database (data)
            var currentPermissions = data.ToList();

            // **Bước 1**: Xóa quyền cũ không có trong danh sách mới
            var permissionsToDelete = currentPermissions
                .Where(current => !listPermissionUpdate.Any(newPerm => newPerm.ClaimValue == current.ClaimValue))
                .ToList();

            // **Bước 2**: Thêm quyền mới chưa có trong danh sách cũ
            var permissionsToAdd = listPermissionUpdate
                .Where(newPerm => !currentPermissions.Any(current => current.ClaimValue == newPerm.ClaimValue))
                .ToList();

            // **Xử lý xóa các quyền đã mất**
            foreach (var permission in permissionsToDelete)
            {
                var deleteSql = @"DELETE FROM [Identity].[RoleClaims] 
                                  WHERE ClaimValue = @ClaimValue 
                                  AND RoleId = @RoleId";
                await _dapperRepository.ExcuteAsync(deleteSql, new { ClaimValue = permission.ClaimValue, RoleId = request.RoleId });
            }

            // **Xử lý thêm các quyền mới**
            foreach (var permission in permissionsToAdd)
            {
                var insertSql = @"INSERT INTO [Identity].[RoleClaims] (ClaimValue, Description, RoleId,CreatedOn,CreatedBy,TenantId,ClaimType) 
                                  VALUES (@ClaimValue, @Description, @RoleId,@CreatedOn,@CreatedBy,'root','permission')";
                await _dapperRepository.ExcuteAsync(insertSql, new
                {
                    ClaimValue = permission.ClaimValue,
                    Description = permission.Description,
                    RoleId = request.RoleId,
                    CreatedOn = DateTime.Now,
                    CreatedBy = accoutCurrenuser
                });
            }

            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            // Xử lý lỗi, ví dụ log lỗi hoặc trả về thông báo lỗi
            return (Result) Result.Fail("Lỗi khi cập nhật quyền vai trò: " + ex.Message);
        }
    }
}
