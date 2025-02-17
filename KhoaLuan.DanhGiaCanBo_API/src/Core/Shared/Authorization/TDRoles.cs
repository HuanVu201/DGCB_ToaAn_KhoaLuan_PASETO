using System.Collections.ObjectModel;

namespace TD.DanhGiaCanBo.Shared.Authorization;

public static class TDRoles
{
    public const string QuanTriHeThong = "Quản trị hệ thống";
    public const string QuanTriDonVi = "Quản trị đơn vị";
    public const string QuanTriNghiepVu = "Quản trị nghiệp vụ";

    public const string SupperAdmin = "SupperAdmin";


    //DGCB
    public const string TruongPhongAndChanhToa = "Trưởng phòng,Chánh tòa và tương đương (trực tiếp chấm điểm)";
   // public const string ChanhToa = "Chánh tòa";
    public const string PhoThuTruongCoQuan = "Phó thủ trưởng cơ quan, đơn vị";
    public const string ThuTruongCoQuan = "Thủ trưởng cơ quan, đơn vị";
    public const string TongHopThamMuuDanhGia = "Tổng hợp, tham mưu đánh giá";
    public const string ChanhAnToaAnTNDTC = "Chánh án Tòa án nhân dân tối cao";
    public const string PhoChanhAnToaAnTNDTC = "Phó Chánh án Tòa án nhân dân tối cao";
    public const string ThamPhanToaAnTNDTC = "Thẩm phán Tòa án nhân dân tối cao";
    public const string TroLyChanhAnToaAnTNDTC = "Trợ lý Chánh án Tòa án nhân dân tối cao";
    public const string ThuKyChanhAnToaAnTNDTC = "Thư ký Chánh án Tòa án nhân dân tối cao";
    public const string ThuKyPhoChanhAnToaAnTNDTC = "Thư ký Phó Chánh án Tòa án nhân dân tối cao";
    public const string ThuKyThamPhanToaAnTNDTC = "Thư ký Thẩm phán Tòa án nhân dân tối cao";
    public const string CongChucVienChuNguoiLD = "Công chức,viên chức,người lao động";


    public static IReadOnlyList<string> DefaultRoles { get; } = new ReadOnlyCollection<string>(new[]
    {
        QuanTriHeThong,
        QuanTriNghiepVu,
        QuanTriDonVi,
        TruongPhongAndChanhToa,
        PhoThuTruongCoQuan,
        ThuTruongCoQuan,
        TongHopThamMuuDanhGia,
        ChanhAnToaAnTNDTC,
        PhoChanhAnToaAnTNDTC,
        ThamPhanToaAnTNDTC,
        TroLyChanhAnToaAnTNDTC,
        ThuKyChanhAnToaAnTNDTC,
        ThuKyPhoChanhAnToaAnTNDTC,
        ThuKyThamPhanToaAnTNDTC,
        CongChucVienChuNguoiLD,
    });

    public static bool IsDefault(string roleName) => DefaultRoles.Any(r => r == roleName);
}