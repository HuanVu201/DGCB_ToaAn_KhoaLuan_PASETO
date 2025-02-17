using Finbuckle.MultiTenant.EntityFrameworkCore;
using TD.DanhGiaCanBo.Infrastructure.Auditing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TD.DanhGiaCanBo.Infrastructure.Persistence.Configuration;

public class AuditTrailConfig : IEntityTypeConfiguration<Trail>
{
    //public void Configure(EntityTypeBuilder<Trail> builder) =>
    //    builder
    //        .ToTable("AuditTrails", SchemaNames.Auditing)
    //        .IsMultiTenant();

    public void Configure(EntityTypeBuilder<Trail> builder)
    {
        builder
            .ToTable("AuditTrails", SchemaNames.Auditing)
            .IsMultiTenant();

        // Thêm chỉ mục cho cột UserId
        builder
            .HasIndex(t => t.UserId)
            .HasName("IX_AuditTrails_UserId"); // Đặt tên cho chỉ mục nếu cần
        builder
          .HasIndex(t => t.DateTime)
          .HasName("IX_AuditTrails_DateTime"); // Đặt tên cho chỉ mục nếu cần
    }

}