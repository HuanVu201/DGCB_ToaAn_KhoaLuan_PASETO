using Finbuckle.MultiTenant.EntityFrameworkCore;
using TD.DanhGiaCanBo.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Infrastructure.Persistence.Configuration;

public class ApplicationUserGroupNhomNguoiDungConfig : IEntityTypeConfiguration<ApplicationUserGroupNhomNguoiDung>
{
    private readonly string _name = nameof(ApplicationUserGroupNhomNguoiDung);
    public void Configure(EntityTypeBuilder<ApplicationUserGroupNhomNguoiDung> builder)
    {
        builder.ToTable("ApplicationUserGroupNhomNguoiDungs", SchemaNames.Identity);

        builder.HasOne(x => x.User)
            .WithMany(x => x.ApplicationUserGroupNhomNguoiDungs).HasForeignKey(x => x.UserGroupId);
        builder.HasOne(x => x.NhomNguoiDung)
            .WithMany().HasForeignKey(x => x.NhomNguoiDungId);

        builder.HasIndex(x => x.NhomNguoiDungId);
    }
}

public class ApplicationUserGroupConfig : IEntityTypeConfiguration<ApplicationUserGroup>
{
    private readonly string _name = nameof(ApplicationUserGroup);
    public void Configure(EntityTypeBuilder<ApplicationUserGroup> builder)
    {
        builder.ToTable("ApplicationUserGroups", SchemaNames.Identity);

        builder.HasIndex(x => new { x.UserId, x.OfficeCode, x.ChucVuId }).IsUnique();

        builder.HasOne(x => x.ChucVu)
            .WithMany().HasForeignKey(x => x.ChucVuId).OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.ChucDanh)
            .WithMany().HasForeignKey(x => x.ChucDanhId).OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.User)
            .WithMany(x => x.ApplicationUserGroups).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Group)
            .WithMany().HasForeignKey(x => x.OfficeCode).HasPrincipalKey(x => x.GroupCode).OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.PhongBan)
            .WithMany().HasForeignKey(x => x.GroupCode).HasPrincipalKey(x => x.GroupCode).OnDelete(DeleteBehavior.NoAction);
    }
}

public class ApplicationUserConfig : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder
            .ToTable("Users", SchemaNames.Identity)
           
            .IsMultiTenant();
        builder.HasIndex(x => x.TypeUser);
        builder
            .Property(u => u.ObjectId)
                .HasMaxLength(256);
        builder.HasIndex(b => b.UserName).HasDatabaseName("Idx_UserName");
    }
}

public class ApplicationRoleConfig : IEntityTypeConfiguration<ApplicationRole>
{
    public void Configure(EntityTypeBuilder<ApplicationRole> builder) =>
        builder
            .ToTable("Roles", SchemaNames.Identity)
            .IsMultiTenant()
                .AdjustUniqueIndexes();
}

public class ApplicationUserGroupRoleConfig : IEntityTypeConfiguration<ApplicationUserGroupRole>
{
    public void Configure(EntityTypeBuilder<ApplicationUserGroupRole> builder)
    {
        builder
            .ToTable("UserRoles", SchemaNames.Identity)
            .IsMultiTenant();
        builder.HasKey(x => new { x.RoleId, x.UserId });
    }
}

public class ApplicationRoleClaimConfig : IEntityTypeConfiguration<ApplicationRoleClaim>
{
    public void Configure(EntityTypeBuilder<ApplicationRoleClaim> builder) =>
        builder
            .ToTable("RoleClaims", SchemaNames.Identity)
            .IsMultiTenant();
}

public class IdentityUserClaimConfig : IEntityTypeConfiguration<IdentityUserClaim<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserClaim<string>> builder) =>
        builder
            .ToTable("UserClaims", SchemaNames.Identity)
            .IsMultiTenant();
}

public class IdentityUserLoginConfig : IEntityTypeConfiguration<IdentityUserLogin<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserLogin<string>> builder) =>
        builder
            .ToTable("UserLogins", SchemaNames.Identity)
            .IsMultiTenant();
}

public class IdentityUserTokenConfig : IEntityTypeConfiguration<IdentityUserToken<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserToken<string>> builder) =>
        builder
            .ToTable("UserTokens", SchemaNames.Identity)
            .IsMultiTenant();
}