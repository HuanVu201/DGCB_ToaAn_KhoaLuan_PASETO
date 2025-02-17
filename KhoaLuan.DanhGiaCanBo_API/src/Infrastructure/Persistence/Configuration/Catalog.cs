using DocumentFormat.OpenXml.Wordprocessing;
using Finbuckle.MultiTenant.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TD.DanhGiaCanBo.Infrastructure.Persistence.Configuration;
public class NhomNguoiDungConfig : IEntityTypeConfiguration<NhomNguoiDung>
{
    private readonly string _name = nameof(NhomNguoiDung);
    public void Configure(EntityTypeBuilder<NhomNguoiDung> builder)
    {
        builder
         .HasIndex(b => b.Ten)
         .HasName($"Idx_{_name}");
    }
}

public class TaiLieuHDSDConfig : IEntityTypeConfiguration<TaiLieuHDSD>
{
    private readonly string _name = nameof(TaiLieuHDSD);
    public void Configure(EntityTypeBuilder<TaiLieuHDSD> builder)
    {
        builder
         .HasIndex(b => b.DeletedOn)
         .HasName($"Idx_{_name}_TaiLieuHDSD");
    }
}
public class MenuConfig : IEntityTypeConfiguration<Menu>
{
    private readonly string _name = nameof(Menu);
    public void Configure(EntityTypeBuilder<Menu> builder)
    {
        builder
         .HasIndex(b => b.Active)
         .HasName($"Idx_{_name}_Menu_Active");
    }
}
public class ConfigConfig : IEntityTypeConfiguration<Config>
{
    private readonly string _name = nameof(Config);
    public void Configure(EntityTypeBuilder<Config> builder)
    {
        builder
         .HasIndex(b => new
         {
             b.Ten,
             b.Code,
             b.Module,
             b.Active
         })
         .HasName($"Idx_{_name}_Config");
    }
}

public class GroupConfig : IEntityTypeConfiguration<Group>
{
    private readonly string _name = nameof(Group);
    public void Configure(EntityTypeBuilder<Group> builder)
    {
        builder.HasIndex(b => b.GroupCode).HasDatabaseName("Idx_GroupCode");
        builder.HasIndex(b => b.GroupName).HasDatabaseName("Idx_GroupName");
        builder.HasIndex(b => b.OfGroupCode).HasDatabaseName("Idx_OfGroupCode");
        builder
         .HasIndex(b => new
         {
             b.GroupCode,
             b.GroupName,
             b.OfGroupCode,
         })
         .HasName($"Idx_{_name}_Search");
    }
}

public class DanhMucChungConfig : IEntityTypeConfiguration<DanhMucChung>
{
    private readonly string _name = nameof(DanhMucChung);
    public void Configure(EntityTypeBuilder<DanhMucChung> builder)
    {

        builder
        .HasIndex(b => new
        {
            b.TenDanhMuc,
            b.Code
        })
        .HasName($"Idx_{_name}_DanhMucChung_Name");
    }
}
