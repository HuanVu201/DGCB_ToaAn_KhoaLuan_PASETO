namespace TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
public class SearchUserByChucDanhChucVuRequest
{
    public IReadOnlyList<DefaultIdType>? ChucDanhIds { get; set; }
    public IReadOnlyList<DefaultIdType>? ChucVuIds { get; set; }
    //public IReadOnlyList<DefaultIdType>? NhomNguoiDungs { get; set; }
    public IReadOnlyList<string>? DonViIds { get; set; }
    public bool? LayNguoiQuanLy { get; set; }
    public bool? CungDonVi { get; set; }
    public bool? CungPhongBan { get; set; }
    public bool? KhongCoChucDanh { get; set; }
    public bool? KhongCoChucVu { get; set; }
    public bool? LayDonViCapTren { get; set; }
    public string? GroupCode { get; set; }
    public string? OfficeCode { get; set; }
    public bool? LaQuyTrinhDonVi { get; set; } = false;
}

public class SearchUserByBuocXuLyHienTaiRequest
{
    public string? GroupCode { get; set; }
    public string? OfficeCode { get; set; }
    public bool? LaQuyTrinhDonVi { get; set; } = false;
    public DefaultIdType SourceId { get; set; }
    public DefaultIdType QuyTrinhXuLyId { get; set; }
}