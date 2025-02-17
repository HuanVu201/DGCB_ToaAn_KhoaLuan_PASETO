using Dapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Data;
using TD.DanhGiaCanBo.Infrastructure.Common.Services;
using TD.DanhGiaCanBo.Infrastructure.Identity;
using TD.DanhGiaCanBo.Infrastructure.Identity.CustomManager;
using TD.DanhGiaCanBo.Infrastructure.Multitenancy;
using TD.DanhGiaCanBo.Infrastructure.Persistence.Context;
using TD.DanhGiaCanBo.Shared.Authorization;
using TD.DanhGiaCanBo.Shared.Multitenancy;

namespace TD.DanhGiaCanBo.Infrastructure.Persistence.Initialization;

internal class ApplicationDbSeeder
{
    private readonly TDTenantInfo _currentTenant;
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly CustomUserManager _userManager;
    private readonly CustomSeederRunner _seederRunner;
    private readonly ILogger<ApplicationDbSeeder> _logger;
    //private readonly string? _connectionStrLogger;
    public ApplicationDbSeeder(TDTenantInfo currentTenant, RoleManager<ApplicationRole> roleManager, CustomUserManager userManager, CustomSeederRunner seederRunner, ILogger<ApplicationDbSeeder> logger, IConfiguration configuration)
    {
        _currentTenant = currentTenant;
        _roleManager = roleManager;
        _userManager = userManager;
        _seederRunner = seederRunner;
        _logger = logger;
        //_connectionStrLogger = configuration.GetValue<string?>("ServiceLoggerConnectString");
        //if (_connectionStrLogger.StartsWith("Crypt:"))
        //{
        //    _connectionStrLogger = _connectionStrLogger.Replace("Crypt:", string.Empty);
        //    _connectionStrLogger = Encryption.Decrypt(_connectionStrLogger);
        //}
    }

    public async Task SeedDatabaseAsync(ApplicationDbContext dbContext, CancellationToken cancellationToken)
    {
        await SeedRolesAsync(dbContext);
        await SeedAdminUserAsync();

        // await SeedSupperAdminUserAsync();
        await SeedCatalogConfig(dbContext);
        await SeedBusinessScreenAction(dbContext);
        await SeedCatalogMenu(dbContext);
        await SeedDatabaseLogger();
        await _seederRunner.RunSeedersAsync(cancellationToken);
    }

    private async Task SeedDatabaseLogger()
    {
        // Tạo bảng LogAuthensDGCB
        //string createTableLogAuthensIfNotExistSql = @"
        //            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'LogAuthensDGCB')
        //                BEGIN
        //                    CREATE TABLE LogAuthensDGCB (
        //                        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        //                        Username NVARCHAR(100) NOT NULL,
        //                        Fullname NVARCHAR(255),
        //                        TypeLogin NVARCHAR(155),
        //                        Token NVARCHAR(MAX),
        //                        TypeUser NVARCHAR(100),
        //                        Device NVARCHAR(200),
        //                        IP VARCHAR(50),
        //                        CreatedAt datetime2(7),
        //                        DeletedOn datetime2(7)
        //                    );
        //                END;";
        //string createIndexLogAuthensIfNotExistSql = @"
        //            IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('LogAuthensDGCB') AND name = 'IX_LogAuthens_Id_CreatedAt')
        //            BEGIN
        //                CREATE INDEX IX_LogAuthens_Id_CreatedAt ON LogAuthensDGCB (Id, CreatedAt);
        //            END;";
        //string sqlLogAuthens = createTableLogAuthensIfNotExistSql + createIndexLogAuthensIfNotExistSql;

        //// Tạo bảng ServiceLogs
        //string createTableServiceLogsIfNotExistSql = @"
        //            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ServiceLogs')
        //                BEGIN
        //                    CREATE TABLE ServiceLogs (
        //                        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        //                        Service VARCHAR(30) NOT NULL,
        //                        Sender NVARCHAR(255),
        //                        Receiver NVARCHAR(255),
        //                        IsSucceed BIT NOT NULL,
        //                        Request NVARCHAR(MAX),
        //                        Response NVARCHAR(MAX),
        //                        MaHoSo VARCHAR(50),
        //                        CreatedAt datetime2(7)
        //                    );
        //                END;";
        //string createIndexServiceLogsIfNotExistSql = @"
        //            IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('ServiceLogs') AND name = 'IX_ServiceLogs_MaHoSo_Service')
        //            BEGIN
        //                CREATE INDEX IX_ServiceLogs_MaHoSo_Service ON ServiceLogs (MaHoSo, Service);
        //            END;";

        //string sqlServiceLogs = createTableServiceLogsIfNotExistSql + createIndexServiceLogsIfNotExistSql;
        //if (!string.IsNullOrEmpty(_connectionStrLogger))
        //{
        //    using (IDbConnection targetConnection = new SqlConnection(_connectionStrLogger))
        //    {
        //        targetConnection.Open();
        //        await targetConnection.ExecuteAsync(sqlLogAuthens);
        //        await targetConnection.ExecuteAsync(sqlServiceLogs);
        //    }
        //}
    }

    private async Task SeedRolesAsync(ApplicationDbContext dbContext)
    {
        foreach (string roleName in TDRoles.DefaultRoles)
        {
            if (await _roleManager.Roles.SingleOrDefaultAsync(r => r.Name == roleName)
                is not ApplicationRole role)
            {
                // Create the role
                //_logger.LogInformation("Seeding {role} Role for '{tenantId}' Tenant.", roleName, _currentTenant.Id);
                role = new ApplicationRole(roleName, $"{roleName} Role for {_currentTenant.Id} Tenant");
                await _roleManager.CreateAsync(role);
            }

            // Assign permissions
            if (roleName == TDRoles.TruongPhongAndChanhToa)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomTruongPhong, role);
            }
            //else if (roleName == TDRoles.ChanhToa)
            //{
            //    await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomChanhToa, role);
            //}
            else if (roleName == TDRoles.ThuTruongCoQuan)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomThuTruongCoQuan, role);
            }
            else if (roleName == TDRoles.TongHopThamMuuDanhGia)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomTongHopThamMuuDanhGia, role);
            }
            else if (roleName == TDRoles.QuanTriDonVi)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomQuanTriDonVi, role);
            }
            else if (roleName == TDRoles.ChanhAnToaAnTNDTC)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomChanhAnTANDTC, role);
            }
            else if (roleName == TDRoles.PhoChanhAnToaAnTNDTC)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomPhoChanhAnTANDTC, role);
            }
            else if (roleName == TDRoles.ThamPhanToaAnTNDTC)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomThamPhanTANDTC, role);
            }
            else if (roleName == TDRoles.TroLyChanhAnToaAnTNDTC)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomTroLyChanhAnTANDTC, role);
            }
            else if (roleName == TDRoles.ThuKyChanhAnToaAnTNDTC)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomThuKyChanhAnTANDTC, role);
            }
            else if (roleName == TDRoles.ThuKyPhoChanhAnToaAnTNDTC)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomThuKyPhoChanhAnTANDTC, role);
            }
            else if (roleName == TDRoles.ThuKyThamPhanToaAnTNDTC)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomThuKyThamPhanTANDTC, role);
            }
            else if (roleName == TDRoles.QuanTriNghiepVu)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomQuanTriNghiepVu, role);
            }
            else if (roleName == TDRoles.PhoThuTruongCoQuan)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomPhoThuTruongCoQuan, role);
            }
            else if (roleName == TDRoles.CongChucVienChuNguoiLD)
            {
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomCongChucVienChucNguoiLD, role);
            }
            //else if (roleName == TDRoles.ThongKeBaoCaoDonVi)
            //{
            //    await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomThongKeBaoCaoDonVi, role);
            //}
            //else if (roleName == TDRoles.TheoDoiHoSoDonVi)
            //{
            //    await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomTheoDoiHoSoDonVi, role);
            //}
            //else if (roleName == TDRoles.TraCuuHoSoToanDonVi)
            //{
            //    await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomTraCuuHoSoToanDonVi, role);
            //}
            //else if (roleName == TDRoles.DanhGiaHaiLongToanDonVi)
            //{
            //    await AssignPermissionsToRoleAsync(dbContext, TDPermissions.NhomDanhGiaHaiLongToanDonVi, role);
            //}
            else if (roleName == TDRoles.QuanTriHeThong)
            {
                role.IsAdmin = true;
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.Admin, role);

                if (_currentTenant.Id == MultitenancyConstants.Root.Id)
                {
                    await AssignPermissionsToRoleAsync(dbContext, TDPermissions.Root, role);
                }
            }

            /*else if (roleName == TDRoles.SupperAdmin)
            {
                role.IsSupperAdmin = true;
                await AssignPermissionsToRoleAsync(dbContext, TDPermissions.Root, role);

                if (_currentTenant.Id == MultitenancyConstants.Root.Id)
                {
                    await AssignPermissionsToRoleAsync(dbContext, TDPermissions.Root, role);
                }
            }*/
        }
    }

    private async Task AssignPermissionsToRoleAsync(ApplicationDbContext dbContext, IReadOnlyList<TDPermission> permissions, ApplicationRole role)
    {
        var currentClaims = await _roleManager.GetClaimsAsync(role);
        foreach (var permission in permissions)
        {
            if (!currentClaims.Any(c => c.Type == TDClaims.Permission && c.Value == permission.Name))
            {
                //_logger.LogInformation("Seeding {role} Permission '{permission}' for '{tenantId}' Tenant.", role.Name, permission.Name, _currentTenant.Id);
                dbContext.RoleClaims.Add(new ApplicationRoleClaim
                {
                    RoleId = role.Id,
                    ClaimType = TDClaims.Permission,
                    ClaimValue = permission.Name,
                    CreatedBy = "ApplicationDbSeeder",
                    Description = permission.Description
                });
                await dbContext.SaveChangesAsync();
            }
        }
    }

    private async Task SeedAdminUserAsync()
    {
        if (string.IsNullOrWhiteSpace(_currentTenant.Id) || string.IsNullOrWhiteSpace(_currentTenant.AdminEmail))
        {
            return;
        }

        if (await _userManager.Users.FirstOrDefaultAsync(u => u.Email == _currentTenant.AdminEmail)
            is not ApplicationUser adminUser)
        {
            string adminUserName = $"{_currentTenant.Id.Trim()}.Admin".ToLowerInvariant();
            adminUser = new ApplicationUser
            {
                Email = _currentTenant.AdminEmail,
                UserName = adminUserName,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                NormalizedEmail = _currentTenant.AdminEmail?.ToUpperInvariant(),
                NormalizedUserName = adminUserName.ToUpperInvariant(),
                IsActive = true,
            };

            //_logger.LogInformation("Seeding Default Admin User for '{tenantId}' Tenant.", _currentTenant.Id);
            var password = new PasswordHasher<ApplicationUser>();
            adminUser.PasswordHash = password.HashPassword(adminUser, MultitenancyConstants.DefaultPwd);
            await _userManager.CreateAsync(adminUser);
        }

        // Assign role to user
        if (!await _userManager.IsInRoleAsync(adminUser, TDRoles.QuanTriHeThong, null))
        {
            //_logger.LogInformation("Assigning Admin Role to Admin User for '{tenantId}' Tenant.", _currentTenant.Id);
            await _userManager.AddToRoleAsync(adminUser, TDRoles.QuanTriHeThong, null);
        }
    }

    private async Task SeedCatalogConfig(ApplicationDbContext dbContext)
    {
        if (!dbContext.Configs.Any())
        {
            dbContext.Configs.AddRange(
                new List<Domain.Catalog.Config>()
                {
                    new Domain.Catalog.Config("Form đăng nhập - Tên phần mềm", "ten-ung-dung", 1, true, "Public", "HỆ THỐNG ĐÁNH GIÁ CÁN BỘ CÔNG CHỨC VIÊN", null),
                    new Domain.Catalog.Config("Form đăng nhập - Tên đơn vị", "ten-don-vi", 1, true, "Public", "TỈNH ...", null),
                    new Domain.Catalog.Config("Form đăng nhập - Footer", "footer-dang-nhap", 1, true, "Public", "2024 © - Tỉnh ...", null),
                    new Domain.Catalog.Config("Logo đăng nhập", "logo-dang-nhap", 1, true, "Public", "/images/logo-dang-nhap.png", null),
                    new Domain.Catalog.Config("Logo quản trị", "logo-quan-tri", 1, true, "Public", "/images/logo-quan-tri.png", null)

                });

            await dbContext.SaveChangesAsync();
        }
    }

    private async Task SeedBusinessScreenAction(ApplicationDbContext dbContext)
    {
        if (!dbContext.Screens.Any() && !dbContext.Actions.Any() && !dbContext.ScreenActions.Any())
        {
            #region add Screen
            var sTiepNhanHSTrucTiep = dbContext.Screens.Add(new Domain.Business.Screen("Menu tiếp nhận hồ sơ trực tiếp", "tiep-nhan-ho-so-truc-tiep", true, true));
            var sDangXLHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu đang xử lý hồ sơ", "dang-xu-ly-ho-so", true, true));
            var sChuyenXLHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu chuyển xử lý hồ sơ", "da-chuyen-xu-ly-ho-so", true, true));
            var sDungXLHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu dừng xử lý hồ sơ", "dung-xu-ly", true, true));
            var sYCTHNghiaVuTaiChinh = dbContext.Screens.Add(new Domain.Business.Screen("Menu yêu cầu thực hiện nghĩa vụ tài chính", "yeu-cau-thuc-hien-nghia-vu-tai-chinh", true, true));
            var sDaChuyenBoSung = dbContext.Screens.Add(new Domain.Business.Screen("Menu đã chuyển bổ sung", "da-chuyen-bo-sung", true, true));
            var sDaChuyenCoKQ = dbContext.Screens.Add(new Domain.Business.Screen("Menu đã chuyển có kết quả", "da-chuyen-co-ket-qua", true, true));
            var sChoBSHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu chờ bổ sung hồ sơ", "cho-bo-sung-ho-so", true, true));
            var sDaBSHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu đã bổ sung hồ sơ", "da-bo-sung-ho-so", true, true));
            var sTiepNhanHSTrucTuyen = dbContext.Screens.Add(new Domain.Business.Screen("Menu tiếp nhận hồ sơ trực tuyến", "tiep-nhan-ho-so-truc-tuyen", true, true));
            var sTraKQTrucTuyen = dbContext.Screens.Add(new Domain.Business.Screen("Menu trả kết quả trực tuyến", "cho-tra-ket-qua-truc-tuyen", true, true));
            var sTraKQTrucTiep = dbContext.Screens.Add(new Domain.Business.Screen("Menu trả kết quả hồ sơ trực tiếp", "cho-tra-ket-qua-truc-tiep", true, true));
            var sChoTraBCCI = dbContext.Screens.Add(new Domain.Business.Screen("Menu chờ trả bcci", "cho-tra-bcci", true, true));
            var sYCBSHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu yêu cầu bổ sung hố sơ", "yeu-cau-bo-sung", true, true));
            var sTraCuuHS = dbContext.Screens.Add(new Domain.Business.Screen("Menu tra cứu hồ sơ", "tra-cuu-ho-so", true, true));

            await dbContext.SaveChangesAsync();
            #endregion
            #region Add Actions
            var aThemMoiHS = dbContext.Actions.Add(new Domain.Business.Action("Thêm mới", "them-moi", 1, null, null, "PlusOutlined", "#4b8df8", null, null));
            var aChuyenBuocXLHS = dbContext.Actions.Add(new Domain.Business.Action("Chuyển bước xử lý", "chuyen-buoc-xu-ly", 2, null, null, "StepForwardOutlined", "#35aa47", null, null));
            var aSuaHS = dbContext.Actions.Add(new Domain.Business.Action("Sửa hồ sơ", "sua-ho-so", 3, null, null, "EditOutlined", "#4b8df8", null, null));
            var aCapNhatKQXLHS = dbContext.Actions.Add(new Domain.Business.Action("Cập nhật kết quả xử lý hồ sơ", "cap-nhat-ket-qua-xu-ly-ho-so", 4, null, null, "CloudUploadOutlined", "#35aa47", null, null));
            var aThayDoiTHXL = dbContext.Actions.Add(new Domain.Business.Action("Thay đổi trường hợp xử lý", "thay-doi-truong-hop-xu-ly", 5, null, null, "SwapOutlined", "#ffb848", null, null));
            var aYCThuPhi = dbContext.Actions.Add(new Domain.Business.Action("Yêu cầu thu phí, lệ phí", "yeu-cau-thu-phi-le-phi-ho-so", 6, null, null, "DollarOutlined", "#4b8df8", null, null));
            var aXoaHS = dbContext.Actions.Add(new Domain.Business.Action("Xóa hồ sơ", "xoa-ho-so", 7, null, null, "DeleteOutlined", "#d84a38", null, null));
            var aTraLaiBuocTruoc = dbContext.Actions.Add(new Domain.Business.Action("Trả lại bước trước", "tra-lai-buoc-truoc", 8, null, null, "StepBackwardOutlined", "#16ffd4", null, null));
            var aChuyenNoiBo = dbContext.Actions.Add(new Domain.Business.Action("Chuyển nội bộ", "chuyen-noi-bo-ho-so", 9, null, null, "RetweetOutlined", "#ffee16", null, null));
            var aKetThucHS = dbContext.Actions.Add(new Domain.Business.Action("Kết thúc", "ket-thuc-ho-so", 10, null, null, "LogoutOutlined", "#d43f23", null, null));
            var aTraKQ = dbContext.Actions.Add(new Domain.Business.Action("Trả kết quả", "tra-ket-qua-ho-so", 11, null, null, "IssuesCloseOutlined", "#1668ff", null, null));
            var aThuHoiHS = dbContext.Actions.Add(new Domain.Business.Action("Thu hồi", "thu-hoi-ho-so", 12, null, null, "RetweetOutlined", "#16fff8", null, null));
            var aYCBS = dbContext.Actions.Add(new Domain.Business.Action("Yêu cầu bổ sung", "yeu-cau-mot-cua-bo-sung-ho-so", 13, null, null, "RollbackOutlined", "#ddff16", null, null));
            var aCapNhatBS = dbContext.Actions.Add(new Domain.Business.Action("Cập nhật bổ sung", "cap-nhat-bo-sung-ho-so", 14, null, null, "EditOutlined", "#46ff16", null, null));
            var aChuyenBuocNhanh = dbContext.Actions.Add(new Domain.Business.Action("Chuyển bước nhanh", "chuyen-buoc-nhanh-ho-so", 15, null, null, "FastForwardOutlined", "#35aa47", null, null));
            var aYCCongDanBS = dbContext.Actions.Add(new Domain.Business.Action("Yêu cầu công dân bổ sung", "yeu-cau-cong-dan-bo-sung-ho-so", 18, null, null, "RollbackOutlined", "#fff516", null, null));
            var aTiepNhanHSTrucTuyen = dbContext.Actions.Add(new Domain.Business.Action("Tiếp nhận", "tiep-nhan-ho-so-truc-tuyen", 1, null, null, "CheckOutlined", "#1bff16", null, null));
            var aTuChoiTiepNhanHSTrucTuyen = dbContext.Actions.Add(new Domain.Business.Action("Từ chối tiếp nhận", "tu-choi-tiep-nhan-ho-so-truc-tuyen", 21, null, null, "StopOutlined", "#da2911", null, null));
            var aTraBS = dbContext.Actions.Add(new Domain.Business.Action("Trả bổ sung", "tra-bo-sung", 1, "Permissions.NhomCanBoMotCua.View", null, "RollbackOutlined", null, null, null));
            var aHoanThanhBS = dbContext.Actions.Add(new Domain.Business.Action("Hoàn thành bổ sung", "hoan-thanh-bo-sung", 15, "Permissions.NhomCanBoMotCua.View", null, "StepForwardOutlined", null, null, null));
            var aKhongTiepNhanHSQH = dbContext.Actions.Add(new Domain.Business.Action("Không tiếp nhận hồ sơ quá hạn", "khong-tiep-nhan-ho-so-bo-sung-qua-han", 15, "Permissions.NhomCanBoMotCua.View", null, "StopOutlined", "#e15535", null, null));
            var aDatLaiHanXL = dbContext.Actions.Add(new Domain.Business.Action("Đặt lại hạn xử lý", "dat-lai-han-xu-ly", 15, "Permissions.NhomQuanTriHeThong.View", null, "RetweetOutlined", "#ffb616", null, null));

            await dbContext.SaveChangesAsync();
            #endregion
            #region Add ScreenAction
            dbContext.ScreenActions.AddRange(// tiep-nhan-ho-so-truc-tiep
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aThemMoiHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aChuyenBuocXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aSuaHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aThayDoiTHXL.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aXoaHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTiep.Entity.Id, aChuyenBuocNhanh.Entity.Id),
                });
            dbContext.ScreenActions.AddRange(// dang-xu-ly-ho-so
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aChuyenBuocXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aTraLaiBuocTruoc.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aChuyenNoiBo.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aKetThucHS.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sDangXLHS.Entity.Id, aYCBS.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// da-chuyen-xu-ly-ho-so
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sChuyenXLHS.Entity.Id, aThuHoiHS.Entity.Id),
                    new Domain.Business.ScreenAction(sChuyenXLHS.Entity.Id, aYCThuPhi.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// dung-xu-ly
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sDungXLHS.Entity.Id, aChuyenBuocXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sDungXLHS.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// yeu-cau-thuc-hien-nghia-vu-tai-chinh
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sYCTHNghiaVuTaiChinh.Entity.Id, aChuyenBuocXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sYCTHNghiaVuTaiChinh.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// cho-bo-sung-ho-so
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sChoBSHS.Entity.Id, aCapNhatBS.Entity.Id),
                    new Domain.Business.ScreenAction(sChoBSHS.Entity.Id, aKhongTiepNhanHSQH.Entity.Id),

                });

            dbContext.ScreenActions.AddRange(// da-bo-sung-ho-so
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sDaBSHS.Entity.Id, aCapNhatBS.Entity.Id),
                    new Domain.Business.ScreenAction(sDaBSHS.Entity.Id, aHoanThanhBS.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// tiep-nhan-ho-so-truc-tuyen
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTuyen.Entity.Id, aTiepNhanHSTrucTuyen.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTuyen.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTuyen.Entity.Id, aYCBS.Entity.Id),
                    new Domain.Business.ScreenAction(sTiepNhanHSTrucTuyen.Entity.Id, aTuChoiTiepNhanHSTrucTuyen.Entity.Id),

                });

            dbContext.ScreenActions.AddRange(// cho-tra-ket-qua-truc-tuyen
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sTraKQTrucTuyen.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTraKQTrucTuyen.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sTraKQTrucTuyen.Entity.Id, aTraKQ.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// cho-tra-ket-qua-truc-tiep
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sTraKQTrucTiep.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sTraKQTrucTiep.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sTraKQTrucTiep.Entity.Id, aTraKQ.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// cho-tra-bcci
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sChoTraBCCI.Entity.Id, aCapNhatKQXLHS.Entity.Id),
                    new Domain.Business.ScreenAction(sChoTraBCCI.Entity.Id, aYCThuPhi.Entity.Id),
                    new Domain.Business.ScreenAction(sChoTraBCCI.Entity.Id, aTraKQ.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// tra-cuu-ho-so
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sTraCuuHS.Entity.Id, aDatLaiHanXL.Entity.Id),
                });

            dbContext.ScreenActions.AddRange(// yeu-cau-bo-sung
                new List<Domain.Business.ScreenAction>()
                {
                    new Domain.Business.ScreenAction(sYCBSHS.Entity.Id, aTraBS.Entity.Id),
                });

            await dbContext.SaveChangesAsync();
            #endregion

        }
    }

    private async Task SeedCatalogMenu(ApplicationDbContext dbContext)
    {
        if (!dbContext.Menus.Any())
        {
            var congDVC = dbContext.Menus.Add(new Domain.Catalog.Menu("Cổng Dịch vụ công", null, 1, true, "portaldvc", "/portaldvc", null, null, true));
            var htMotCuaRoot = dbContext.Menus.Add(new Domain.Catalog.Menu("HT một cửa điện tử", null, 2, true, "dvc", "/dvc", null, "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View#Permissions.NhomQuanTriDonVi.View#Permissions.NhomQuanTriHeThong.View", true));
            var quanTriCongRoot = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị cổng DVC", null, 4, true, "portaldvc_admin", "/portaldvc_admin", null, "Permissions.NhomQuanTriHeThong.View", true));
            var quanTriRoot = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị hệ thống", null, 3, true, "admin", "/admin", null, "Permissions.NhomQuanTriHeThong.View#Permissions.NhomQuanTriDonVi.View", true));

            var pTiepNhanHS = dbContext.Menus.Add(new Domain.Catalog.Menu("Tiếp nhận hồ sơ", htMotCuaRoot.Entity.Id, 1, true, "dvc", "/dvc/tiep-nhan-ho-so", "FormOutlined", "Permissions.NhomCanBoMotCua.View"));
            var pBoSungHS = dbContext.Menus.Add(new Domain.Catalog.Menu("Bổ sung hồ sơ", htMotCuaRoot.Entity.Id, 2, true, "dvc", "/dvc/bo-sung-ho-so", "IssuesCloseOutlined", "Permissions.NhomCanBoMotCua.View"));
            var pTheoDoiHS = dbContext.Menus.Add(new Domain.Catalog.Menu("Theo dõi hồ sơ", htMotCuaRoot.Entity.Id, 3, true, "dvc", "/dvc/theo-doi-ho-so", "EyeOutlined", "Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View"));
            var pTheoDoiHSTN = dbContext.Menus.Add(new Domain.Catalog.Menu("Theo dõi hồ sơ tiếp nhận", htMotCuaRoot.Entity.Id, 10, true, "dvc", "/dvc/theo-doi-ho-so-tn", "EyeOutlined", "Permissions.NhomCanBoMotCua.View"));
            var pXuLyHS = dbContext.Menus.Add(new Domain.Catalog.Menu("Xử lý hồ sơ", htMotCuaRoot.Entity.Id, 4, true, "dvc", "/dvc/xu-ly-ho-so", "PlayCircleOutlined", "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View"));
            var pTraKetQua = dbContext.Menus.Add(new Domain.Catalog.Menu("Trả kết quả", htMotCuaRoot.Entity.Id, 5, true, "dvc", "/dvc/tra-ket-qua", "ExportOutlined", "Permissions.NhomCanBoMotCua.View"));
            var pThuPhiLePhi = dbContext.Menus.Add(new Domain.Catalog.Menu("Thu phí lệ phí", htMotCuaRoot.Entity.Id, 6, true, "dvc", "/dvc/thu-phi-le-phi", "DollarOutlined", "Permissions.NhomCanBoMotCua.View"));
            var pTraCuu = dbContext.Menus.Add(new Domain.Catalog.Menu("Tra cứu", htMotCuaRoot.Entity.Id, 7, true, "dvc", "/dvc/tra-cuu", "SearchOutlined", "Permissions.NhomQuanTriHeThong.View#Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View"));
            var pThongKeBaoCao = dbContext.Menus.Add(new Domain.Catalog.Menu("Thống kê báo cáo", htMotCuaRoot.Entity.Id, 8, true, "dvc", "/dvc/thong-ke", "FileDoneOutlined", "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View"));
            var pQuanTriCongDVC = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị", quanTriCongRoot.Entity.Id, 2, true, "portaldvc_admin", "/portaldvc_admin", "SettingOutlined", "Permissions.NhomQuanTriHeThong.View"));

            var pQuanTriNguoiDung = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị người dùng", quanTriRoot.Entity.Id, 1, true, "admin", "/admin/quan-tri-nguoi-dung", "UserOutlined", "Permissions.NhomQuanTriHeThong.View"));
            var pDanhMucDungChung = dbContext.Menus.Add(new Domain.Catalog.Menu("Danh mục dùng chung", quanTriRoot.Entity.Id, 4, true, "admin", "/admin/danh-muc-dung-chung", "MenuUnfoldOutlined", "Permissions.NhomQuanTriHeThong.View"));
            var pDanhMucDVC = dbContext.Menus.Add(new Domain.Catalog.Menu("Danh mục DVC", quanTriRoot.Entity.Id, 2, true, "admin", "/admin/danh-muc-dvc", "StarOutlined", "Permissions.NhomQuanTriHeThong.View"));
            var pQuanTriKhac = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị cấu hình", quanTriRoot.Entity.Id, 3, true, "admin", "/admin/quan-tri", "SettingOutlined", "Permissions.NhomQuanTriHeThong.View"));
            var pQuanTriDonVi = dbContext.Menus.Add(new Domain.Catalog.Menu("Quản trị đơn vị", quanTriRoot.Entity.Id, 2, true, "admin", "/admin/quan-tri-don-vi", "AlignCenterOutlined", "Permissions.NhomQuanTriDonVi.View"));

            var pHoSoTrucTuyen = dbContext.Menus.Add(new Domain.Catalog.Menu("Hồ sơ trực tuyến", pThongKeBaoCao.Entity.Id, 3, true, "dvc", "/dvc/thong-ke/tiep-nhan-ho-so-truc-tuyen", "FileDoneOutlined", "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View"));
            var pQuyetDinh766 = dbContext.Menus.Add(new Domain.Catalog.Menu("Quyết định 766", pThongKeBaoCao.Entity.Id, 4, true, "dvc", "/dvc/thong-ke/quyet-dinh-766", "FileDoneOutlined", "Permissions.NhomCanBoMotCua.View#Permissions.NhomChuyenVien.View#Permissions.NhomLanhDaoPhong.View#Permissions.NhomLanhDaoDonVi.View"));

            dbContext.Menus.AddRange(
                new List<Domain.Catalog.Menu>()
                {
                    new Domain.Catalog.Menu("Cơ cấu tổ chức",pQuanTriNguoiDung.Entity.Id,1,true,"admin","/admin/quan-tri-nguoi-dung/co-cau-to-chuc",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Danh mục vai trò",pQuanTriNguoiDung.Entity.Id,2,true,"admin","/admin/quan-tri-nguoi-dung/vai-tro",null,"Permissions.NhomQuanTriHeThong.View"),

                    new Domain.Catalog.Menu("Danh mục quốc tịch",pDanhMucDungChung.Entity.Id,3,true,"admin","/admin/danh-muc-dung-chung/danh-muc?type=quoc-tich",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Danh mục dân tộc",pDanhMucDungChung.Entity.Id,4,true,"admin","/admin/danh-muc-dung-chung/danh-muc?type=dan-toc",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Danh mục học vấn",pDanhMucDungChung.Entity.Id,5,true,"admin","/admin/danh-muc-dung-chung/danh-muc?type=hoc-van",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Danh mục chức vụ",pDanhMucDungChung.Entity.Id,6,true,"admin","/admin/danh-muc-dung-chung/danh-muc?type=chuc-vu",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Danh mục học vị",pDanhMucDungChung.Entity.Id,7,true,"admin","/admin/danh-muc-dung-chung/danh-muc?type=hoc-vi",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Danh mục lãnh đạo",pDanhMucDungChung.Entity.Id,8,true,"admin","/admin/danh-muc-dung-chung/danh-muc?type=lanh-dao",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Danh mục nghề nghiệp",pDanhMucDungChung.Entity.Id,9,true,"admin","/admin/danh-muc-dung-chung/danh-muc?type=nghe-nghiep",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Danh mục tôn giáo",pDanhMucDungChung.Entity.Id,10,true,"admin","/admin/danh-muc-dung-chung/danh-muc?type=ton-giao",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Danh mục ngày nghỉ",pDanhMucDungChung.Entity.Id,11,true,"admin","/admin/danh-muc-dung-chung/ngay-nghi",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Danh mục địa bàn",pDanhMucDungChung.Entity.Id,12,true,"admin","/admin/danh-muc-dung-chung/dia-ban",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Danh mục dân tộc Bảo trợ xã hội",pDanhMucDungChung.Entity.Id,13,true,"admin","/admin/danh-muc-dung-chung/danh-muc?type=dan-toc-bao-tro-xa-hoi",null,"Permissions.NhomQuanTriHeThong.View"),

                    new Domain.Catalog.Menu("Lĩnh vực",pDanhMucDVC.Entity.Id,1,true,"admin","/admin/danh-muc-dvc/linh-vuc",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Thủ tục",pDanhMucDVC.Entity.Id,2,true,"admin","/admin/danh-muc-dvc/thu-tuc",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Thủ tục theo đơn vị",pDanhMucDVC.Entity.Id,3,true,"admin","/admin/danh-muc-dvc/thu-tuc-don-vi",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Nhóm người dùng",pDanhMucDVC.Entity.Id,4,true,"admin","/admin/danh-muc-dvc/nhom-nguoi-dung",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Mẫu phôi",pDanhMucDVC.Entity.Id,5,true,"admin","/admin/danh-muc-dvc/mau-phoi",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Phí, lệ phí",pDanhMucDVC.Entity.Id,6,true,"admin","/admin/danh-muc-dvc/phi-lephi",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Trạng thái",pDanhMucDVC.Entity.Id,7,true,"admin","/admin/danh-muc-dvc/trang-thai",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Bước xử lý",pDanhMucDVC.Entity.Id,9,true,"admin","/admin/danh-muc-dvc/buoc-xu-ly",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Đơn vị",pDanhMucDVC.Entity.Id,10,true,"admin","/admin/danh-muc-dvc/don-vi",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Thông báo",pDanhMucDVC.Entity.Id,11,true,"admin","/admin/danh-muc-dvc/thong-bao",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Tài khoản thụ hưởng",pDanhMucDVC.Entity.Id,12,true,"admin","/admin/danh-muc-dvc/tai-khoan-thu-huong",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Quản lí danh mục ngành",pDanhMucDVC.Entity.Id,14,true,"admin","/admin/danh-muc-dvc/quanlydanhmucnganh",null,"Permissions.NhomQuanTriHeThong.View"),

                    new Domain.Catalog.Menu("Danh sách Menu",pQuanTriKhac.Entity.Id,3,true,"admin","/admin/quan-tri/danh-sach-menu",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Quản trị action",pQuanTriKhac.Entity.Id,4,true,"admin","/admin/quan-tri/action",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Quản trị screen",pQuanTriKhac.Entity.Id,5,true,"admin","/admin/quan-tri/screen",null,"Permissions.NhomQuanTriHeThong.View"),
                    new Domain.Catalog.Menu("Quản trị config",pQuanTriKhac.Entity.Id,6,true,"admin","/admin/quan-tri/config",null,"Permissions.NhomQuanTriHeThong.View"),

                    new Domain.Catalog.Menu("Danh mục người dùng",pQuanTriDonVi.Entity.Id,3,true,"admin","/admin/quan-tri-don-vi/danh-muc-nguoi-dung",null,"Permissions.NhomQuanTriDonVi.View"),
                    new Domain.Catalog.Menu("Danh mục thủ tục",pQuanTriDonVi.Entity.Id,4,true,"admin","/admin/quan-tri-don-vi/danh-muc-thu-tuc",null,"Permissions.NhomQuanTriDonVi.View"),
                }
            );
            await dbContext.SaveChangesAsync();
        }
    }
}