namespace TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Dtos;
public class DanhSachBuocXuLyTiepDto : IDto
{
    public DefaultIdType Id { get; set; }
    public IReadOnlyCollection<DefaultIdType>? ChucVuIds { get; set; }
    public IReadOnlyCollection<DefaultIdType>? ChucDanhIds { get; set; }
    //public IReadOnlyCollection<DefaultIdType>? NhomNguoiDungIds { get; set; }
    public IReadOnlyCollection<DefaultIdType>? NhomDonViIds { get; set; }
    public bool CungDonVi { get; set; }
    public bool CungPhongBan { get; set; }
    public bool LayNguoiQuanLy { get; set; }
    public bool LayDonViCapTren { get; set; }
    public bool KhongCoChucDanh { get; set; }
    public bool KhongCoChucVu { get; set; }
    public string TenTrangThai { get; set; }

    public DanhSachBuocXuLyTiepDto(
        DefaultIdType id,
        IReadOnlyCollection<DefaultIdType>? chucVuIds,
        IReadOnlyCollection<DefaultIdType>? chucDanhIds,
        IReadOnlyCollection<DefaultIdType>? nhomDonViIds,
        //IReadOnlyCollection<DefaultIdType>? nhomNguoiDungIds,
        bool cungDonVi,
        bool cungPhongBan,
        bool layNguoiQuanLy,
        bool layDonViCapTren,
        bool khongCoChucDanh,
        bool khongCoChucVu,
        string tenTrangThai)
    {
        Id = id;
        ChucVuIds = chucVuIds;
        ChucDanhIds = chucDanhIds;
        //NhomNguoiDungIds = nhomNguoiDungIds;
        NhomDonViIds = nhomDonViIds;
        CungPhongBan = cungPhongBan;
        CungDonVi = cungDonVi;
        LayNguoiQuanLy = layNguoiQuanLy;
        TenTrangThai = tenTrangThai;
        KhongCoChucDanh = khongCoChucDanh;
        KhongCoChucVu = khongCoChucVu;
        LayDonViCapTren = layDonViCapTren;
    }
}
