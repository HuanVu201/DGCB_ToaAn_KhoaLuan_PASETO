using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;
public class GiaHanDanhGia : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(2000)]
    public string? NoiDung { get; set; }
    [MaxLength(1000)]
    public string? YKien { get; set; } // Kết quả
    [MaxLength(30)]
    public string? TrangThai { get; set; }
    [MaxLength(500)]
    public string? DinhKem { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string? MaDonVi { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string? MaDonViCha { get; set; }
    //AddBo
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaBoTieuChi { get; set; }
    [MaxLength(200)]
    public string? TenBoTieuChi { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }

    public GiaHanDanhGia() { }

    public GiaHanDanhGia(string? noiDung, string? yKien, string? trangThai, string? dinhKem, string? maDonVi, string? maDonViCha, string? maBoTieuChi, string? tenBoTieuChi, DateTime? tungay, DateTime? denngay)
    {
        NoiDung = noiDung;
        YKien = yKien;
        TrangThai = trangThai;
        DinhKem = dinhKem;
        MaDonVi = maDonVi;
        MaDonViCha = maDonViCha;
        MaBoTieuChi = maBoTieuChi;
        TenBoTieuChi = tenBoTieuChi;
        TuNgay = tungay;
        DenNgay = denngay;
    }

    public static GiaHanDanhGia Create(string? noiDung, string? yKien, string? trangThai, string? dinhKem, string? maDonVi, string? maDonViCha, string? maBoTieuChi, string? tenBoTieuChi, DateTime? tungay, DateTime? denngay)
    {
        return new(noiDung, yKien, trangThai, dinhKem, maDonVi, maDonViCha, maBoTieuChi, tenBoTieuChi, tungay, denngay);
    }

    public GiaHanDanhGia Update(string? noiDung, string? yKien, string? trangThai, string? dinhKem, string? maDonVi, string? maDonViCha, string? maBoTieuChi, string? tenBoTieuChi, DateTime? tungay, DateTime? denngay)
    {
        if (!string.IsNullOrEmpty(maBoTieuChi)) MaBoTieuChi = maBoTieuChi;
        if (!string.IsNullOrEmpty(tenBoTieuChi)) TenBoTieuChi = tenBoTieuChi;
        if (!string.IsNullOrEmpty(noiDung)) NoiDung = noiDung;
        if (!string.IsNullOrEmpty(yKien)) YKien = yKien;
        if (!string.IsNullOrEmpty(trangThai)) TrangThai = trangThai;
        if (!string.IsNullOrEmpty(dinhKem)) DinhKem = dinhKem;
        if (!string.IsNullOrEmpty(maDonVi)) MaDonVi = maDonVi;
        if (!string.IsNullOrEmpty(maDonViCha)) MaDonViCha = maDonViCha;
        // Kiểm tra và gán giá trị cho TuNgay (DateTime?)
        if (tungay.HasValue)
            TuNgay = tungay.Value;

        // Kiểm tra và gán giá trị cho DenNgay (DateTime?)
        if (denngay.HasValue)
            DenNgay = denngay.Value;
        return this;
    }

    public GiaHanDanhGia SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public GiaHanDanhGia Restore()
    {
        DeletedOn = null;
        return this;
    }
}
