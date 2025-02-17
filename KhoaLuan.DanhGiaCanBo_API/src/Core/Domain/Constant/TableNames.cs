using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Domain.Constant;
public class TableNames
{
    public const string Groups = SchemaNames.Catalog + "." + nameof(Groups);
    public const string Users = SchemaNames.Identity + "." + nameof(Users);
    public const string QuyTrinhXuLys = SchemaNames.Business + "." + nameof(QuyTrinhXuLys);
    public const string BuocXuLys = SchemaNames.Business + "." + nameof(BuocXuLys);
    public const string BuocXuLyChucDanhs = SchemaNames.Business + "." + nameof(BuocXuLyChucDanhs);
    public const string BuocXuLyChucVus = SchemaNames.Business + "." + nameof(BuocXuLyChucVus);
    public const string ApplicationUserGroups = SchemaNames.Identity + "." + nameof(ApplicationUserGroups);
    public const string ApplicationUserGroupNhomNguoiDungs = SchemaNames.Identity + "." + nameof(ApplicationUserGroupNhomNguoiDungs);
    public const string XepLoaiDanhGias = SchemaNames.Business + "." + nameof(XepLoaiDanhGias);
    public const string TieuChiDanhGias = SchemaNames.Business + "." + nameof(TieuChiDanhGias);
    public const string MauPhieuDanhGias = SchemaNames.Business + "." + nameof(MauPhieuDanhGias);
    public const string KhoTieuChis = SchemaNames.Business + "." + nameof(KhoTieuChis);
    public const string DanhGias = SchemaNames.Business + "." + nameof(DanhGias);
    public const string DanhGiaDonVis = SchemaNames.Business + "." + nameof(DanhGiaDonVis);
    public const string ChucVus = SchemaNames.Business + "." + nameof(ChucVus);
    public const string ChucDanhs = SchemaNames.Business + "." + nameof(ChucDanhs);
    public const string ChiTietDanhGias = SchemaNames.Business + "." + nameof(ChiTietDanhGias);
    public const string ChiTietDanhGiaDonVis = SchemaNames.Business + "." + nameof(ChiTietDanhGiaDonVis);
    public const string BoTieuChuans = SchemaNames.Business + "." + nameof(BoTieuChuans);
    public const string TrangThaiDanhGias = SchemaNames.Business + "." + nameof(TrangThaiDanhGias);
    public const string VetXuLyDanhGias = SchemaNames.Business + "." + nameof(VetXuLyDanhGias);
    public const string VetXuLyDanhGiaDonVis = SchemaNames.Business + "." + nameof(VetXuLyDanhGiaDonVis);
    public const string VetXuLyDanhGiaToChucs = SchemaNames.Business + "." + nameof(VetXuLyDanhGiaToChucs);
    public const string DonViSuDungQuyTrinhXuLys = SchemaNames.Business + "." + nameof(DonViSuDungQuyTrinhXuLys);
    public const string DuLieuThongKes = SchemaNames.Business + "." + nameof(DuLieuThongKes);
    public const string NhomDonVis = SchemaNames.Business + "." + nameof(NhomDonVis);
    public const string KyDanhGias = SchemaNames.Business + "." + nameof(KyDanhGias);
}
