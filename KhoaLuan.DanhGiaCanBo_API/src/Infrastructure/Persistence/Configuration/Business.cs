using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;

namespace TD.DanhGiaCanBo.Infrastructure.Persistence.Configuration;

public class XepLoaiDanhGiaConfig : IEntityTypeConfiguration<XepLoaiDanhGia>
{
    private readonly string _name = nameof(XepLoaiDanhGia);
    public void Configure(EntityTypeBuilder<XepLoaiDanhGia> builder)
    {
        builder.ToTable("XepLoaiDanhGias", SchemaNames.Business);
    }
}
public class TrangThaiDanhGiaConfig : IEntityTypeConfiguration<TrangThaiDanhGia>
{
    private readonly string _name = nameof(TrangThaiDanhGia);
    public void Configure(EntityTypeBuilder<TrangThaiDanhGia> builder)
    {
        builder.ToTable("TrangThaiDanhGias", SchemaNames.Business);
    }
}


public class VetXuLyDanhGiaConfig : IEntityTypeConfiguration<VetXuLyDanhGia>
{
    private readonly string _name = nameof(VetXuLyDanhGia);
    public void Configure(EntityTypeBuilder<VetXuLyDanhGia> builder)
    {
        builder.ToTable("VetXuLyDanhGias", SchemaNames.Business);

        // builder.HasKey(x => x.DanhGiaId);
        builder.HasOne(x => x.BuocXuLy)
            .WithMany().HasForeignKey(x => x.BuocXuLyId).OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.User)
            .WithMany(x => x.VetXuLyDanhGias).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.DanhGia)
            .WithMany().HasForeignKey(x => x.DanhGiaId).OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.TrangThaiDanhGia)
            .WithMany().HasForeignKey(x => x.TrangThaiDanhGiaId).OnDelete(DeleteBehavior.NoAction);
    }
}
public class VetXuLyDanhGiaToChucConfig : IEntityTypeConfiguration<VetXuLyDanhGiaToChuc>
{
    private readonly string _name = nameof(VetXuLyDanhGiaToChuc);
    public void Configure(EntityTypeBuilder<VetXuLyDanhGiaToChuc> builder)
    {
        builder.ToTable("VetXuLyDanhGiaToChucs", SchemaNames.Business);

        // builder.HasKey(x => x.DanhGiaId);
        builder.HasOne(x => x.BuocXuLy)
            .WithMany().HasForeignKey(x => x.BuocXuLyId).OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.User)
       .WithMany(x => x.VetXuLyDanhGiaToChucs).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.DanhGia)
            .WithMany().HasForeignKey(x => x.DanhGiaId).OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.TrangThaiDanhGia)
            .WithMany().HasForeignKey(x => x.TrangThaiDanhGiaId).OnDelete(DeleteBehavior.NoAction);
    }
}

public class ChucDanhMauPhieuDanhGiaConfig : IEntityTypeConfiguration<ChucDanhMauPhieuDanhGia>
{
    private readonly string _name = nameof(ChucDanhMauPhieuDanhGia);
    public void Configure(EntityTypeBuilder<ChucDanhMauPhieuDanhGia> builder)
    {
        builder.ToTable("ChucDanhMauPhieuDanhGias", SchemaNames.Business);
        builder.HasKey(x => new { x.ChucDanhId, x.MauPhieuDanhGiaId });
        builder.HasOne(x => x.ChucDanh)
            .WithMany(x => x.MauPhieuDanhGias)
            .HasForeignKey(x => x.ChucDanhId);
        builder.HasOne(x => x.MauPhieuDanhGia)
            .WithMany(x => x.ChucDanhs)
            .HasForeignKey(x => x.MauPhieuDanhGiaId);
    }
}

public class TieuChiDanhGiaConfig : IEntityTypeConfiguration<TieuChiDanhGia>
{
    private readonly string _name = nameof(TieuChiDanhGia);
    public void Configure(EntityTypeBuilder<TieuChiDanhGia> builder)
    {
        builder.ToTable("TieuChiDanhGias", SchemaNames.Business);
    }
}

public class MauPhieuDanhGiaConfig : IEntityTypeConfiguration<MauPhieuDanhGia>
{
    private readonly string _name = nameof(MauPhieuDanhGia);
    public void Configure(EntityTypeBuilder<MauPhieuDanhGia> builder)
    {
        builder.ToTable("MauPhieuDanhGias", SchemaNames.Business);
    }
}

public class KhoTieuChiConfig : IEntityTypeConfiguration<KhoTieuChi>
{
    private readonly string _name = nameof(KhoTieuChi);
    public void Configure(EntityTypeBuilder<KhoTieuChi> builder)
    {
        builder.ToTable("KhoTieuChis", SchemaNames.Business);
    }
}

public class DanhGiaConfig : IEntityTypeConfiguration<DanhGia>
{
    private readonly string _name = nameof(DanhGia);
    public void Configure(EntityTypeBuilder<DanhGia> builder)
    {
        builder.ToTable("DanhGias", SchemaNames.Business);
        builder
           .HasOne(d => d.BuocHienTai)
           .WithMany(b => b.DanhGias)
           .HasForeignKey(d => d.BuocHienTaiId)
           .OnDelete(DeleteBehavior.Restrict);
        builder
            .HasOne(d => d.BuocTruoc)
            .WithMany()
            .HasForeignKey(d => d.BuocTruocId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}

public class ChucVuConfig : IEntityTypeConfiguration<ChucVu>
{
    private readonly string _name = nameof(ChucVu);
    public void Configure(EntityTypeBuilder<ChucVu> builder)
    {
        builder.ToTable("ChucVus", SchemaNames.Business);
    }
}

public class ChucDanhConfig : IEntityTypeConfiguration<ChucDanh>
{
    private readonly string _name = nameof(ChucDanh);
    public void Configure(EntityTypeBuilder<ChucDanh> builder)
    {
        builder.ToTable("ChucDanhs", SchemaNames.Business);
    }
}
public class ChiTietDanhGiaConfig : IEntityTypeConfiguration<ChiTietDanhGia>
{
    private readonly string _name = nameof(ChiTietDanhGia);
    public void Configure(EntityTypeBuilder<ChiTietDanhGia> builder)
    {
        builder.ToTable("ChiTietDanhGias", SchemaNames.Business);
    }
}
public class BoTieuChuanConfig : IEntityTypeConfiguration<BoTieuChuan>
{
    private readonly string _name = nameof(BoTieuChuan);
    public void Configure(EntityTypeBuilder<BoTieuChuan> builder)
    {
        builder.ToTable("BoTieuChuans", SchemaNames.Business);
    }
}

public class ScreenActionConfig : IEntityTypeConfiguration<ScreenAction>
{
    private readonly string _name = nameof(ScreenAction);
    public void Configure(EntityTypeBuilder<ScreenAction> builder)
    {
        builder.ToTable("ScreenActions", SchemaNames.Business);
        builder
         .HasIndex(b => b.ScreenId)
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class ScreenConfig : IEntityTypeConfiguration<Screen>
{
    private readonly string _name = nameof(Screen);
    public void Configure(EntityTypeBuilder<Screen> builder)
    {
        builder.ToTable("Screens", SchemaNames.Business);
        builder
         .HasIndex(b => b.Ma)
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class ActionConfig : IEntityTypeConfiguration<Domain.Business.Action>
{
    private readonly string _name = nameof(Domain.Business.Action);
    public void Configure(EntityTypeBuilder<Domain.Business.Action> builder)
    {
        builder.ToTable("Actions", SchemaNames.Business);
        builder
         .HasIndex(b => b.Ten)
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class BuocXuLyConfig : IEntityTypeConfiguration<BuocXuLy>
{
    private readonly string _name = nameof(BuocXuLy);
    public void Configure(EntityTypeBuilder<BuocXuLy> builder)
    {
        builder.ToTable("BuocXuLys", SchemaNames.Business);
        builder
         .HasIndex(b => new
         {
             b.LaBuocCuoiCung,
             b.QuyTrinhXuLyId
         });
        builder
         .HasIndex(b => new
         {
             b.LaBuocDauTien,
             b.QuyTrinhXuLyId
         });
        builder.HasIndex(x => x.TrangThaiDanhGiaId);
    }
}

public class QuyTrinhXuLyConfig : IEntityTypeConfiguration<QuyTrinhXuLy>
{
    private readonly string _name = nameof(QuyTrinhXuLy);
    public void Configure(EntityTypeBuilder<QuyTrinhXuLy> builder)
    {
        builder.ToTable("QuyTrinhXuLys", SchemaNames.Business);
        builder.HasMany(x => x.BuocXuLys)
            .WithOne(x => x.QuyTrinhXuLy)
            .HasForeignKey(x => x.QuyTrinhXuLyId);
        builder.HasIndex(x => x.LaQuyTrinhDonVi);
    }
}

public class DonViSuDungQuyTrinhXuLyConfig : IEntityTypeConfiguration<DonViSuDungQuyTrinhXuLy>
{
    private readonly string _name = nameof(DonViSuDungQuyTrinhXuLy);
    public void Configure(EntityTypeBuilder<DonViSuDungQuyTrinhXuLy> builder)
    {
        builder.ToTable("DonViSuDungQuyTrinhXuLys", SchemaNames.Business);
        builder.HasKey(x => new { x.QuyTrinhXuLyId, x.OfficeCode });
        builder.HasOne(x => x.DonVi)
            .WithMany(x => x.QuyTrinhXuLys).HasForeignKey(x => x.OfficeCode).HasPrincipalKey(x => x.GroupCode);
        builder.HasOne(x => x.QuyTrinhXuLy)
            .WithMany(x => x.DonVis).HasForeignKey(x => x.QuyTrinhXuLyId);
    }
}

public class BuocXuLyChucDanhConfig : IEntityTypeConfiguration<BuocXuLyChucDanh>
{
    private readonly string _name = nameof(BuocXuLyChucDanh);
    public void Configure(EntityTypeBuilder<BuocXuLyChucDanh> builder)
    {
        builder.ToTable("BuocXuLyChucDanhs", SchemaNames.Business);
        builder.HasKey(x => new { x.ChucDanhId, x.BuocXuLyId });
        builder.HasOne(x => x.BuocXuLy)
            .WithMany(x => x.BuocXuLyChucDanhs).HasForeignKey(x => x.BuocXuLyId);
        builder.HasOne(x => x.ChucDanh)
            .WithMany(x => x.BuocXuLys).HasForeignKey(x => x.ChucDanhId);
    }
}

public class LienKetBuocXuLyConfig : IEntityTypeConfiguration<LienKetBuocXuLy>
{
    private readonly string _name = nameof(LienKetBuocXuLy);
    public void Configure(EntityTypeBuilder<LienKetBuocXuLy> builder)
    {
        builder.ToTable("LienKetBuocXuLys", SchemaNames.Business);
        builder.HasKey(x => x.Id);
        builder.HasOne(x => x.BuocXuLySource)
            .WithMany(x => x.Sources).HasForeignKey(x => x.Source).OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.BuocXuLyTarget)
            .WithMany(x => x.Targets).HasForeignKey(x => x.Target).OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.QuyTrinhXuLy)
            .WithMany(x => x.LienKetBuocXuLys).HasForeignKey(x => x.QuyTrinhXuLyId).OnDelete(DeleteBehavior.NoAction);
    }
}

public class BuocXuLyChucVuConfig : IEntityTypeConfiguration<BuocXuLyChucVu>
{
    private readonly string _name = nameof(BuocXuLyChucVu);
    public void Configure(EntityTypeBuilder<BuocXuLyChucVu> builder)
    {
        builder.ToTable("BuocXuLyChucVus", SchemaNames.Business);
        builder.HasKey(x => new { x.ChucVuId, x.BuocXuLyId });
        builder.HasOne(x => x.BuocXuLy)
            .WithMany(x => x.BuocXuLyChucVus).HasForeignKey(x => x.BuocXuLyId);
        builder.HasOne(x => x.ChucVu)
            .WithMany(x => x.BuocXuLys).HasForeignKey(x => x.ChucVuId);
    }
}

public class BuocXuLyGroupConfig : IEntityTypeConfiguration<BuocXuLyGroup>
{
    private readonly string _name = nameof(BuocXuLyGroup);
    public void Configure(EntityTypeBuilder<BuocXuLyGroup> builder)
    {
        builder.ToTable("BuocXuLyGroups", SchemaNames.Business);
        builder.HasKey(x => new { x.NhomDonViId, x.BuocXuLyId });
        builder.HasOne(x => x.BuocXuLy)
            .WithMany(x => x.DonVis).HasForeignKey(x => x.BuocXuLyId);
        builder.HasOne(x => x.NhomDonVi)
            .WithMany().HasForeignKey(x => x.NhomDonViId);
    }
}

public class DanhSachNhomDonViConfig : IEntityTypeConfiguration<DanhSachNhomDonVi>
{
    private readonly string _name = nameof(DanhSachNhomDonVi);
    public void Configure(EntityTypeBuilder<DanhSachNhomDonVi> builder)
    {
        builder.ToTable("DanhSachNhomDonVis", SchemaNames.Business);
        builder.HasKey(x => new { x.GroupCode, x.NhomDonViId });
        builder.HasOne(x => x.NhomDonVi)
            .WithMany(x => x.danhSachNhomDonVis).HasForeignKey(x => x.NhomDonViId);
        builder.HasOne(x => x.Group)
            .WithMany().HasForeignKey(x => x.GroupCode).HasPrincipalKey(x => x.GroupCode);
    }
}

public class NhomDonViConfig : IEntityTypeConfiguration<NhomDonVi>
{
    private readonly string _name = nameof(NhomDonVi);
    public void Configure(EntityTypeBuilder<NhomDonVi> builder)
    {
        builder.ToTable("NhomDonVis", SchemaNames.Business);
    }
}

public class BuocXuLyNhomNguoiDungConfig : IEntityTypeConfiguration<BuocXuLyNhomNguoiDung>
{
    private readonly string _name = nameof(BuocXuLyNhomNguoiDung);
    public void Configure(EntityTypeBuilder<BuocXuLyNhomNguoiDung> builder)
    {
        builder.ToTable("BuocXuLyNhomNguoiDungs", SchemaNames.Business);
        builder.HasKey(x => new { x.BuocXuLyId, x.NhomNguoiDungId });
        builder.HasOne(x => x.NhomNguoiDung)
            .WithMany(x => x.BuocXuLyNhomNguoiDungs).HasForeignKey(x => x.NhomNguoiDungId);
        builder.HasOne(x => x.BuocXuLy)
            .WithMany(x => x.BuocXuLyNhomNguoiDungs).HasForeignKey(x => x.BuocXuLyId);
    }
}

public class DuLieuThongKeConfig : IEntityTypeConfiguration<DuLieuThongKe>
{
    private readonly string _name = nameof(DuLieuThongKe);
    public void Configure(EntityTypeBuilder<DuLieuThongKe> builder)
    {
        builder.ToTable("DuLieuThongKes", SchemaNames.Business);
    }
}

public class GiaHanDanhGiaConfig : IEntityTypeConfiguration<GiaHanDanhGia>
{
    private readonly string _name = nameof(GiaHanDanhGia);
    public void Configure(EntityTypeBuilder<GiaHanDanhGia> builder)
    {
        builder.ToTable("GiaHanDanhGias", SchemaNames.Business);
    }
}

public class KhieuNaiDanhGiaConfig : IEntityTypeConfiguration<KhieuNaiDanhGia>
{
    private readonly string _name = nameof(KhieuNaiDanhGia);
    public void Configure(EntityTypeBuilder<KhieuNaiDanhGia> builder)
    {
        builder.ToTable("KhieuNaiDanhGias", SchemaNames.Business);
    }
}

public class HoSoCongTacDanhGiaConfig : IEntityTypeConfiguration<HoSoCongTacDanhGia>
{
    private readonly string _name = nameof(HoSoCongTacDanhGia);
    public void Configure(EntityTypeBuilder<HoSoCongTacDanhGia> builder)
    {
        builder.ToTable("HoSoCongTacDanhGias", SchemaNames.Business);
    }
}

public class DanhGiaDonViConfig : IEntityTypeConfiguration<DanhGiaDonVi>
{
    private readonly string _name = nameof(DanhGiaDonVi);
    public void Configure(EntityTypeBuilder<DanhGiaDonVi> builder)
    {
        builder.ToTable("DanhGiaDonVis", SchemaNames.Business);
    }
}

public class ChiTietDanhGiaDonViConfig : IEntityTypeConfiguration<ChiTietDanhGiaDonVi>
{
    private readonly string _name = nameof(ChiTietDanhGiaDonVi);
    public void Configure(EntityTypeBuilder<ChiTietDanhGiaDonVi> builder)
    {
        builder.ToTable("ChiTietDanhGiaDonVis", SchemaNames.Business);
    }
}

public class VetXuLyDanhGiaDonViConfig : IEntityTypeConfiguration<Domain.Business.VetXuLyDanhGiaDonVi>
{
    private readonly string _name = nameof(Domain.Business.VetXuLyDanhGiaDonVi);
    public void Configure(EntityTypeBuilder<Domain.Business.VetXuLyDanhGiaDonVi> builder)
    {
        builder.ToTable("VetXuLyDanhGiaDonVis", SchemaNames.Business);
    }
}

public class LoaiMauPhoiConfig : IEntityTypeConfiguration<LoaiMauPhoi>
{
    private readonly string _name = nameof(LoaiMauPhoi);
    public void Configure(EntityTypeBuilder<LoaiMauPhoi> builder)
    {
        builder.ToTable("LoaiMauPhois", SchemaNames.Business);
    }
}

public class MauPhoiConfig : IEntityTypeConfiguration<MauPhoi>
{
    private readonly string _name = nameof(MauPhoi);
    public void Configure(EntityTypeBuilder<MauPhoi> builder)
    {
        builder.ToTable("MauPhois", SchemaNames.Business);
    }
}

public class KyDanhGiaConfig : IEntityTypeConfiguration<KyDanhGia>
{
    private readonly string _name = nameof(KyDanhGia);
    public void Configure(EntityTypeBuilder<KyDanhGia> builder)
    {
        builder.ToTable("KyDanhGias", SchemaNames.Business);
    }
}
