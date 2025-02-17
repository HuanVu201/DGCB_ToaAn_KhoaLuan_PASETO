using Mapster;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Identity.UserGroups.Dtos;
public class DanhSachUserGroupTruongDonViDto : IDto
{
    public string Id { get; set; }
    public string MaNguoiDung { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string OfficeCode { get; set; }
    public string OfficeName { get; set; }
    public string GroupName { get; set; }
    public string GroupCode { get; set; }
    public string? NoiDungKiemNhiem { get; set; }
    public string TypeUser { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string? MaDonViFull { get; set; }
    public int ThuTu { get; set; }
    public bool? ThamQuyenXepLoai { get; set; }
    public bool? KiemNhiem { get; set; }
    public bool? KhongDanhGia { get; set; }
    public UserChucDanh ChucDanh { get; set; }
    public UserChucVu ChucVu { get; set; }
    public DanhSachUserGroupTruongDonViDto() { }
    public DanhSachUserGroupTruongDonViDto(string id, string maNguoiDung, string userName, string fullName, string donVi, string tenDonVi, string fullCode, string phongBan, string tenPhongBan, string? noiDungKiemNhiem,
        string typeUser, string phone, string email, int thuTu, bool? thamQuyenXepLoai, bool? kiemNhiem,
        bool? khongDanhGia, UserChucDanh? chucDanhs, UserChucVu? chucVus)
    {
        Id = id;
        MaNguoiDung = maNguoiDung;
        UserName = userName;
        FullName = fullName;
        OfficeCode = donVi;
        OfficeName = tenDonVi;
        GroupName = tenPhongBan;
        GroupCode = phongBan;
        NoiDungKiemNhiem = noiDungKiemNhiem;
        ThamQuyenXepLoai = thamQuyenXepLoai;
        TypeUser = typeUser;
        KiemNhiem = kiemNhiem;
        KhongDanhGia = khongDanhGia;
        Phone = phone;
        Email = email;
        ThuTu = thuTu;
        ChucDanh = chucDanhs;
        ChucVu = chucVus;
        MaDonViFull = fullCode;
    }

    public class UserChucDanh
    {
        public DefaultIdType Id { get; set; }
        public string Ten { get; set; }
        public string Ma { get; set; }
        public UserChucDanh(DefaultIdType id, string ten, string ma)
        {
            Ten = ten;
            Ma = ma;
            Id = id;
        }
    }
    public class UserChucVu
    {
        public DefaultIdType Id { get; set; }
        public string Ten { get; set; }
        public string Ma { get; set; }
        public UserChucVu(DefaultIdType id, string ten, string ma)
        {
            Ten = ten;
            Ma = ma;
            Id = id;
        }
    }
    public class UserNhomNguoiDung
    {
        public string Id { get; set; }
        public string Ten { get; set; }
        public string Ma { get; set; }
    }
}