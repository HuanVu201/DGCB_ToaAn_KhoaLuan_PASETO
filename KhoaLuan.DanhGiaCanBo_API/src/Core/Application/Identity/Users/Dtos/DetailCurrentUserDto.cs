using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;
using Mapster;

namespace TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
public class DetailCurrentUserDto : IDto
{
    public string Id { get;set; }
    public string UserName { get;set; }
    public string FullName { get;set; }
    public string OfficeCode { get;set; }
    public string OfficeName { get;set; }
    public string GroupName { get;set; }
    public string GroupCode { get;set; }
    public string? NoiDungKiemNhiem { get;set; }
    public string TypeUser { get;set; }
    public bool? ThamQuyenXepLoai { get; set; }
    public bool? KiemNhiem { get; set; }
    public bool? TruongDonVi { get; set; }
    public bool? KhongDanhGia { get; set; }
    public bool? IsDefault { get; set; }
    public bool ForcePasswordChange { get; set; }

    public bool? IsKySo { get; set; }
    public string? UserGroupId { get; set; }
    public UserChucDanh ChucDanh { get; set; }
    public UserChucVu ChucVu { get; set; }
    public List<UserNhomNguoiDung> NhomNguoiDungs { get; set; }
    public string? MaPhieuDanhGia { get; set; }
    public DetailCurrentUserDto() { }
    public DetailCurrentUserDto(string id, string userName, string fullName, string donVi, string tenDonVi, string phongBan, string tenPhongBan, string? noiDungKiemNhiem, string typeUser, bool? thamQuyenXepLoai, bool? kiemNhiem,
        bool? truongDonVi, bool? khongDanhGia, bool? isDefault, string? maPhieuDanhGia, ChucDanh? chucDanhs, ChucVu? chucVus, List<NhomNguoiDung>? nhomNguoiDungs,bool forcePasswordChange,string? userGroupId,bool? isKySo)
    {
        Id = id;
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
        TruongDonVi = truongDonVi;
        KhongDanhGia = khongDanhGia;
        IsDefault = isDefault;
        ChucDanh = chucDanhs.Adapt<UserChucDanh>();
        ChucVu = chucVus.Adapt<UserChucVu>();
        NhomNguoiDungs = nhomNguoiDungs.Adapt<List<UserNhomNguoiDung>>() ?? [];
        ForcePasswordChange = forcePasswordChange;
        UserGroupId = userGroupId;
        MaPhieuDanhGia = maPhieuDanhGia;
        IsKySo = isKySo;
    }
    public class UserChucDanh
    {
        public string Id { get; set; }
        public string Ten { get; set; }
        public string Ma { get; set; }
    }
    public class UserChucVu
    {
        public string Id { get; set; }
        public string Ten { get; set; }
        public string Ma { get; set; }
    }
    public class UserNhomNguoiDung
    {
        public string Id { get; set; }
        public string Ten { get; set; }
        public string Ma { get; set; }
    }
}
