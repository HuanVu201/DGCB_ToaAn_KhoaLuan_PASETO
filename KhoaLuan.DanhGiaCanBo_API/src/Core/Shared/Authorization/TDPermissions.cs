using System.Collections.ObjectModel;
using System.Security.Cryptography.X509Certificates;

namespace TD.DanhGiaCanBo.Shared.Authorization;

public static class TDAction
{
    public const string View = nameof(View);
    public const string Search = nameof(Search);
    public const string Create = nameof(Create);
    public const string Update = nameof(Update);
    public const string Delete = nameof(Delete);
    public const string Export = nameof(Export);
    public const string Generate = nameof(Generate);
    public const string Clean = nameof(Clean);
    public const string UpgradeSubscription = nameof(UpgradeSubscription);
    public const string Report = nameof(Report);
    public const string Full = nameof(Full);

    //public const string TuDanhGia= nameof(TuDanhGia);
    //public const string NhanXetDanhGia = nameof(NhanXetDanhGia);
    //public const string DanhGiaCanBo = nameof(DanhGiaCanBo);
    //public const string TongHopDanhGia= nameof(TongHopDanhGia);
    //public const string HoiDongDanhGia = nameof(HoiDongDanhGia);
    //public const string QuanLyBoTieuChi = nameof(QuanLyBoTieuChi);
    //public const string ThongKeBaoCao = nameof(ThongKeBaoCao);
    //public const string QuanTriDanhMuc = nameof(QuanTriDanhMuc);
    //public const string NhomQuanTriDonVi = nameof(NhomQuanTriDonVi);
    //public const string NhomTruongCoQuan = nameof(NhomTruongCoQuan);
    //public const string NhomPhoCoQuan = nameof(NhomPhoCoQuan);
    //public const string NhomTruongPhongBanDonVi = nameof(NhomTruongPhongBanDonVi);
    //public const string NhomPhoPhongBanDonVi = nameof(NhomPhoPhongBanDonVi);
    //public const string NhomCongChuVienChucLDHD = nameof(NhomCongChuVienChucLDHD);
    //public const string NhomQuanTriHeThong= nameof(NhomQuanTriHeThong);
    //public const string QuanLyBoTieuChiDonVi = nameof(QuanLyBoTieuChiDonVi);
    //public const string NhapDanhGiaDonVi = nameof(NhapDanhGiaDonVi);
}

public static class TDResource
{
    public const string Tenants = nameof(Tenants);
    public const string Dashboard = nameof(Dashboard);
    public const string Hangfire = nameof(Hangfire);
    public const string Users = nameof(Users);
    public const string UserRoles = nameof(UserRoles);
    public const string Roles = nameof(Roles);
    public const string RoleClaims = nameof(RoleClaims);
    //public const string NhomQuanTriDonVi = nameof(NhomQuanTriDonVi);
    // public const string NhomQuanTriHeThong = nameof(NhomQuanTriHeThong);
    public const string DanhGia = nameof(DanhGia);
    public const string ThongKe = nameof(ThongKe);


    // Tài nguyên nhóm
    //public const string TruongCoQuan = nameof(TruongCoQuan); // Nhóm trưởng cơ quan
    //public const string PhoCoQuan = nameof(PhoCoQuan); // Nhóm phó cơ quan
    //public const string TruongPhongBan = nameof(TruongPhongBan); // Nhóm trưởng phòng ban, đơn vị
    //public const string PhoPhongBan = nameof(PhoPhongBan); // Nhóm phó phòng ban, đơn vị
    //public const string CongChucVienChuc = nameof(CongChucVienChuc); // Nhóm công chức, viên chức, LĐHĐ
    //public const string QuanTriNghiepVu = nameof(QuanTriNghiepVu);


    public const string TuDanhGia = nameof(TuDanhGia);
    public const string NhanXetDanhGia = nameof(NhanXetDanhGia);
    public const string DanhGiaCanBo = nameof(DanhGiaCanBo);
    public const string TongHopDanhGia = nameof(TongHopDanhGia);
    public const string HoiDongDanhGia = nameof(HoiDongDanhGia);
    public const string QuanLyBoTieuChi = nameof(QuanLyBoTieuChi);
    public const string ThongKeBaoCao = nameof(ThongKeBaoCao);
    public const string QuanTriDanhMuc = nameof(QuanTriDanhMuc);
    public const string NhomQuanTriDonVi = nameof(NhomQuanTriDonVi);
    public const string NhomTruongCoQuan = nameof(NhomTruongCoQuan);
    public const string NhomPhoCoQuan = nameof(NhomPhoCoQuan);
    public const string NhomTruongPhongBanDonVi = nameof(NhomTruongPhongBanDonVi);
    public const string NhomPhoPhongBanDonVi = nameof(NhomPhoPhongBanDonVi);
    public const string NhomCongChuVienChucLDHD = nameof(NhomCongChuVienChucLDHD);
    public const string NhomQuanTriHeThong = nameof(NhomQuanTriHeThong);
    public const string QuanLyBoTieuChiDonVi = nameof(QuanLyBoTieuChiDonVi);
    public const string NhapDanhGiaDonVi = nameof(NhapDanhGiaDonVi);
    public const string NhomQuanTriNghiepVu = nameof(NhomQuanTriNghiepVu);
}

public static class TDPermissions
{
    private static readonly TDPermission[] _all = new TDPermission[]
    {
        new("View Dashboard", TDAction.View, TDResource.Dashboard, IsBasic: true),
        new("View Hangfire", TDAction.View, TDResource.Hangfire),
        new("View Users", TDAction.View, TDResource.Users, IsQuanTriDonVi: true),
        new("Search Users", TDAction.Search, TDResource.Users),
        new("Create Users", TDAction.Create, TDResource.Users, IsQuanTriDonVi: true),
        new("Update Users", TDAction.Update, TDResource.Users, IsQuanTriDonVi: true),
        new("Delete Users", TDAction.Delete, TDResource.Users, IsQuanTriDonVi: true),
        new("Export Users", TDAction.Export, TDResource.Users, IsQuanTriDonVi: true),
        new("View UserRoles", TDAction.View, TDResource.UserRoles, IsQuanTriDonVi: true),
        new("Update UserRoles", TDAction.Update, TDResource.UserRoles),
        new("View Roles", TDAction.View, TDResource.Roles, IsQuanTriDonVi: true),
        new("Create Roles", TDAction.Create, TDResource.Roles),
        new("Update Roles", TDAction.Update, TDResource.Roles),
        new("Delete Roles", TDAction.Delete, TDResource.Roles),
        new("View RoleClaims", TDAction.View, TDResource.RoleClaims),
        new("Toàn quyền hệ thống", TDAction.Full, TDResource.Tenants, IsRoot: true),
        new("Nhóm quản trị hệ thống", TDAction.Full, TDResource.NhomQuanTriHeThong),
        new("Nhóm quản trị nghiệp vụ", TDAction.Full, TDResource.NhomQuanTriNghiepVu,IsQuanTriNghiepVu:true),

        //new("Nhóm quản trị đơn vị", TDAction.Full, TDResource.NhomQuanTriDonVi, IsQuanTriDonVi: true),
        //new ("Quản trị nghiệp vụ ",TDAction.Full,TDResource.QuanTriNghiepVu,IsQuanTriNghiepVu : true),
        //new("Tự đánh giá", TDAction.Full, TDResource.DanhGia,IsBasic: true,IsTruongPhong:true,IsPhoThuTruongCQ:true,IsChanhAnTANDTC: true,IsPhoChanhAnTANDTC: true,IsThamPhanTANDTC: true,IsTroLyCATANDTC: true,IsThuKyChanhAnTANDTC: true,IsThuKyThamPhanTANDTC: true),
        //new("Quản lý bộ chỉ tiêu", TDAction.Full, TDResource.BoChiTieu, IsBasic: true),
        //new("Quản trị danh mục", TDAction.Full, TDResource.DanhMuc, IsBasic: true),
        //new("Nhóm quản trị đơn vị", TDAction.Full, TDResource.TruongCoQuan, IsBasic: true,IsTruongPhong:true,ISQuanTriDonVi: true,IsChanhAnTANDTC: true),
        //new("Nhóm trưởng cơ quan", TDAction.Full, TDResource.TruongCoQuan, IsBasic: true),
        //new("Nhóm phó cơ quan", TDAction.Full, TDResource.PhoCoQuan, IsBasic: true,IsPhoThuTruongCQ:true,IsPhoChanhAnTANDTC: true),
        //new("Nhóm trưởng phòng ban, đơn vị", TDAction.Full, TDResource.TruongPhongBan, IsBasic: true),
        //new("Nhóm phó phòng ban, đơn vị", TDAction.Full, TDResource.PhoPhongBan, IsBasic: true),
        //new("Nhóm công chức, viên chức, LĐHĐ", TDAction.Full, TDResource.CongChucVienChuc, IsBasic: true),
        //new("Xem báo cáo thống kê", TDAction.View, TDResource.ThongKe, IsQuanTriDonVi: true,ISQuanTriDonVi: true),
        //new("Xuất báo cáo thống kê",TDAction.Report,TDResource.ThongKe,ISQuanTriDonVi: true),
        //new("Full thống kê ",TDAction.Full,TDResource.ThongKe,IsQuanTriDonVi: true),
        //new("Full DanhGia",TDAction.Full,TDResource.DanhGia,IsQuanTriDonVi:true),


        // Phân quyền mới

   new("Tự đánh giá", TDAction.Full, TDResource.TuDanhGia,IsCongChuVienChuc:true,IsTruongPhong:true,IsChanhToa:true,IsPhoThuTruongCQ:true,IsThuTruongCQ:true,IsChanhAnTANDTC: true,IsPhoChanhAnTANDTC:true,IsThamPhanTANDTC:true,IsTroLyCATANDTC:true,IsThuKyChanhAnTANDTC: true,IsThuKyPhoChanhAnTANDTC:true,IsThuKyThamPhanTANDTC: true),
   new("Nhận xét đánh giá", TDAction.Full, TDResource.NhanXetDanhGia,IsTruongPhong:true,IsChanhToa:true),
   new("Đánh giá cán bộ", TDAction.Full, TDResource.DanhGiaCanBo,IsPhoThuTruongCQ:true,IsThuTruongCQ:true),
   new("Tổng hợp đánh giá", TDAction.Full, TDResource.TongHopDanhGia),
   new("Hội đồng đánh giá", TDAction.Full, TDResource.HoiDongDanhGia,IsThuTruongCQ:true),
   new("Quản lý bộ chỉ tiêu", TDAction.Full, TDResource.QuanLyBoTieuChi),
   new("Thống kê báo cáo", TDAction.Full, TDResource.ThongKeBaoCao,IsThuTruongCQ:true,IsQuanTriDonVi:true,IsChanhAnTANDTC: true,IsPhoChanhAnTANDTC:true),
   new("Quản trị danh mục", TDAction.Full, TDResource.QuanTriDanhMuc),
   new("Nhóm quản trị đơn vị", TDAction.Full, TDResource.NhomQuanTriDonVi,IsQuanTriDonVi:true),
   new("Nhóm trưởng cơ quan", TDAction.Full, TDResource.NhomTruongCoQuan,IsThuTruongCQ:true,IsChanhAnTANDTC: true),
   new("Nhóm phó cơ quan", TDAction.Full, TDResource.NhomPhoCoQuan,IsPhoThuTruongCQ:true,IsPhoChanhAnTANDTC:true),
   new("Nhóm trưởng phòng ban đơn vị", TDAction.Full, TDResource.NhomTruongPhongBanDonVi,IsTruongPhong:true,IsChanhToa:true),
   new("Nhóm phó phòng ban đơn vị", TDAction.Full, TDResource.NhomPhoPhongBanDonVi),
   new("Nhóm công chức viên chức người lao động", TDAction.Full, TDResource.NhomCongChuVienChucLDHD,IsCongChuVienChuc:true),
   new("Nhóm quản lý bộ chỉ tiêu đơn vị", TDAction.Full, TDResource.QuanLyBoTieuChiDonVi,IsQuanTriDonVi:true),
   new("Nhập đánh giá đơn vị", TDAction.Full, TDResource.NhapDanhGiaDonVi,IsQuanTriDonVi:true),

    };

    public static IReadOnlyList<TDPermission> All { get; } = new ReadOnlyCollection<TDPermission>(_all);
    public static IReadOnlyList<TDPermission> Root { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsRoot).ToArray());
    public static IReadOnlyList<TDPermission> Admin { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => !p.IsRoot).ToArray());
    public static IReadOnlyList<TDPermission> NhomQuanTriDonVi { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsQuanTriDonVi || p.IsBasic).ToArray());
    public static IReadOnlyList<TDPermission> NhomTruongPhong { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsTruongPhong).ToArray());
    public static IReadOnlyList<TDPermission> NhomChanhToa { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsTruongPhong).ToArray());
    public static IReadOnlyList<TDPermission> NhomPhoThuTruongCoQuan { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsPhoThuTruongCQ).ToArray());
    public static IReadOnlyList<TDPermission> NhomThuTruongCoQuan { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsThuTruongCQ).ToArray());
    public static IReadOnlyList<TDPermission> NhomTongHopThamMuuDanhGia { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsTongHopTMDG).ToArray());
    public static IReadOnlyList<TDPermission> NhomChanhAnTANDTC { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsChanhAnTANDTC).ToArray());
    public static IReadOnlyList<TDPermission> NhomPhoChanhAnTANDTC { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsPhoChanhAnTANDTC).ToArray());
    public static IReadOnlyList<TDPermission> NhomThamPhanTANDTC { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsThamPhanTANDTC).ToArray());
    public static IReadOnlyList<TDPermission> NhomTroLyChanhAnTANDTC { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsTroLyCATANDTC).ToArray());
    public static IReadOnlyList<TDPermission> NhomThuKyChanhAnTANDTC { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsThuKyChanhAnTANDTC).ToArray());
    public static IReadOnlyList<TDPermission> NhomThuKyPhoChanhAnTANDTC { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsPhoChanhAnTANDTC).ToArray());
    public static IReadOnlyList<TDPermission> NhomThuKyThamPhanTANDTC { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsThuKyThamPhanTANDTC).ToArray());

    public static IReadOnlyList<TDPermission> NhomCongChucVienChucNguoiLD { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsCongChuVienChuc).ToArray());
    public static IReadOnlyList<TDPermission> NhomQuanTriNghiepVu { get; } = new ReadOnlyCollection<TDPermission>(_all.Where(p => p.IsQuanTriNghiepVu).ToArray());

}

public record TDPermission(string Description, string Action, string Resource, bool IsBasic = false, bool IsQuanTriDonVi = false, bool IsRoot = false, bool IsTruongPhong = false, bool IsChanhToa = false, bool IsThuTruongCQ = false, bool IsPhoThuTruongCQ = false, bool IsChanhAnTANDTC = false, bool IsPhoChanhAnTANDTC = false, bool IsThamPhanTANDTC = false, bool IsTroLyCATANDTC = false, bool IsTongHopTMDG = false, bool ISQuanTriDonVi = false, bool IsThuKyThamPhanTANDTC = false, bool IsThuKyChanhAnTANDTC = false, bool IsThuKyPhoChanhAnTANDTC = false, bool IsQuanTriNghiepVu = false, bool IsCongChuVienChuc = false)
{
    public string Name => NameFor(Action, Resource);
    public static string NameFor(string action, string resource) => $"Permissions.{resource}.{action}";
}
