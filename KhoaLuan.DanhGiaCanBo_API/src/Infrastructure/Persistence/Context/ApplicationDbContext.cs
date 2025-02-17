using Finbuckle.MultiTenant;
using TD.DanhGiaCanBo.Application.Common.Events;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Infrastructure.Persistence.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;

namespace TD.DanhGiaCanBo.Infrastructure.Persistence.Context;

public class ApplicationDbContext : BaseDbContext
{
    public ApplicationDbContext(ITenantInfo currentTenant, DbContextOptions options, ICurrentUser currentUser, ISerializerService serializer, IOptions<DatabaseSettings> dbSettings, IEventPublisher events)
        : base(currentTenant, options, currentUser, serializer, dbSettings, events)
    {
    }
    public DbSet<Menu> Menus => Set<Menu>();
    public DbSet<Config> Configs => Set<Config>();
    public DbSet<Group> Groups => Set<Group>();
    public DbSet<Domain.Business.Action> Actions => Set<Domain.Business.Action>();
    public DbSet<Screen> Screens => Set<Screen>();
    public DbSet<ScreenAction> ScreenActions => Set<ScreenAction>();
    public DbSet<NhomNguoiDung> NhomNguoiDungs => Set<NhomNguoiDung>();
    public DbSet<TaiLieuHDSD> TaiLieuHDSDs => Set<TaiLieuHDSD>();

    public DbSet<TieuChiDanhGia> TieuChiDanhGias => Set<TieuChiDanhGia>();
    public DbSet<KhoTieuChi> KhoTieuChis => Set<KhoTieuChi>();
    public DbSet<MauPhieuDanhGia> MauPhieuDanhGias => Set<MauPhieuDanhGia>();
    public DbSet<TrangThaiDanhGia> TrangThaiDanhGias => Set<TrangThaiDanhGia>();
    public DbSet<XepLoaiDanhGia> XepLoaiDanhGias => Set<XepLoaiDanhGia>();
    public DbSet<ChucDanh> ChucDanhs => Set<ChucDanh>();
    public DbSet<DanhMucChung> DanhMucChungs => Set<DanhMucChung>();
    public DbSet<APITichHop> APITichHops => Set<APITichHop>();
    public DbSet<LogAPI> LogAPIs => Set<LogAPI>();
    public DbSet<ChucVu> ChucVus => Set<ChucVu>();
    public DbSet<DanhGia> DanhGias => Set<DanhGia>();
    public DbSet<DanhGiaDonVi> DanhGiaDonVis => Set<DanhGiaDonVi>();
    public DbSet<ChiTietDanhGia> ChiTietDanhGias => Set<ChiTietDanhGia>();
    public DbSet<ChiTietDanhGiaDonVi> ChiTietDanhGiaDonVis => Set<ChiTietDanhGiaDonVi>();
    public DbSet<VetXuLyDanhGiaDonVi> VetXuLyDanhGiaDonVis => Set<VetXuLyDanhGiaDonVi>();
    public DbSet<BuocXuLy> BuocXuLys => Set<BuocXuLy>();
    public DbSet<QuyTrinhXuLy> QuyTrinhXuLys => Set<QuyTrinhXuLy>();
    public DbSet<BuocXuLyChucDanh> BuocXuLyChucDanhs => Set<BuocXuLyChucDanh>();
    public DbSet<BuocXuLyChucVu> BuocXuLyChucVus => Set<BuocXuLyChucVu>();
    public DbSet<BuocXuLyNhomNguoiDung> BuocXuLyNhomNguoiDungs => Set<BuocXuLyNhomNguoiDung>();
    public DbSet<LienKetBuocXuLy> LienKetBuocXuLys => Set<LienKetBuocXuLy>();
    public DbSet<DonViSuDungQuyTrinhXuLy> DonViSuDungQuyTrinhXuLys => Set<DonViSuDungQuyTrinhXuLy>();
    public DbSet<BoTieuChuan> BoTieuChuans => Set<BoTieuChuan>();
    public DbSet<VetXuLyDanhGia> VetXuLyDanhGias => Set<VetXuLyDanhGia>();
    public DbSet<VetXuLyDanhGiaToChuc> VetXuLyDanhGiaToChucs => Set<VetXuLyDanhGiaToChuc>();

    public DbSet<ApplicationUserGroup> ApplicationUserGroups => Set<ApplicationUserGroup>();
    public DbSet<ApplicationUserGroupNhomNguoiDung> ApplicationUserGroupNhomNguoiDungs => Set<ApplicationUserGroupNhomNguoiDung>();
    public DbSet<DuLieuThongKe> DuLieuThongKes => Set<DuLieuThongKe>();
    public DbSet<HoSoCongTacDanhGia> HoSoCongTacDanhGias => Set<HoSoCongTacDanhGia>();
    public DbSet<KhieuNaiDanhGia> KhieuNaiDanhGias => Set<KhieuNaiDanhGia>();
    public DbSet<GiaHanDanhGia> GiaHanDanhGias => Set<GiaHanDanhGia>();
    public DbSet<ChucDanhMauPhieuDanhGia> ChucDanhMauPhieuDanhGias => Set<ChucDanhMauPhieuDanhGia>();
    public DbSet<LoaiMauPhoi> LoaiMauPhois => Set<LoaiMauPhoi>();
    public DbSet<MauPhoi> MauPhois => Set<MauPhoi>();
    public DbSet<KyDanhGia> KyDanhGias => Set<KyDanhGia>();
    public DbSet<BuocXuLyGroup> BuocXuLyGroups => Set<BuocXuLyGroup>();
    public DbSet<NhomDonVi> NhomDonVis => Set<NhomDonVi>();
    public DbSet<DanhSachNhomDonVi> DanhSachNhomDonVis => Set<DanhSachNhomDonVi>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasDefaultSchema(SchemaNames.Catalog);

        modelBuilder.Entity<LienKetBuocXuLy>().Property(e => e.Id).ValueGeneratedNever();
    }
}