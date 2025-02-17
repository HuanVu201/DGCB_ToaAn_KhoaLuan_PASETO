using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;
public class VetXuLyDanhGiaDonVi : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string? MaPhieu { get; set; }
    [MaxLength(50)]
    public string? MaPhongBan { get; set; }
    [MaxLength(255)]
    public string TenThaoTac { get; private set; }
    [MaxLength(150)]
    public string TenNguoiXuLy { get; private set; }
    [MaxLength(256)]
    public string TaiKhoanXuLy { get; private set; }

    public VetXuLyDanhGiaDonVi() { }

    public VetXuLyDanhGiaDonVi(string? maPhieu, string? maPhongBan, string? tenThaoTac, string? tenNguoiXuLy, string? taiKhoanXuLy)
    {
        MaPhieu = maPhieu;
        MaPhongBan = maPhongBan;
        TenThaoTac = tenThaoTac;
        TenNguoiXuLy = tenNguoiXuLy;
        TaiKhoanXuLy = taiKhoanXuLy;      
    }

    public static VetXuLyDanhGiaDonVi Create(string? maPhieu, string? maPhongBan, string? tenThaoTac, string? tenNguoiXuLy, string? taiKhoanXuLy)
    {
        return new(maPhieu, maPhongBan, tenThaoTac, tenNguoiXuLy, taiKhoanXuLy);

    }

    public VetXuLyDanhGiaDonVi Update(string? maPhieu, string? maPhongBan, string? tenThaoTac, string? tenNguoiXuLy, string? taiKhoanXuLy)
    {
        if (!string.IsNullOrEmpty(maPhieu)) MaPhieu = maPhieu;
        if (!string.IsNullOrEmpty(maPhongBan)) MaPhongBan = maPhongBan;
        if (!string.IsNullOrEmpty(tenThaoTac)) TenThaoTac = tenThaoTac;
        if (!string.IsNullOrEmpty(tenNguoiXuLy)) TenNguoiXuLy = tenNguoiXuLy;
        if (!string.IsNullOrEmpty(taiKhoanXuLy)) TaiKhoanXuLy = taiKhoanXuLy;
        return this;
    }

    public VetXuLyDanhGiaDonVi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public VetXuLyDanhGiaDonVi Restore()
    {
        DeletedOn = null;
        return this;
    }
}
