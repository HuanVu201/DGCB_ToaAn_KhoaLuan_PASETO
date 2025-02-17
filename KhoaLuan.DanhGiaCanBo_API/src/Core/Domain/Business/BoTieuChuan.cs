using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;

public class BoTieuChuan : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaBoTieuChi { get; private set; }
    [MaxLength(200)]
    public string? TenBoTieuChi { get; private set; }
    public bool SuDung { get; private set; }
    [MaxLength(500)]
    public string? DinhKem { get; private set; }
    [MaxLength(50)]
    public string? SoKyHieu { get; private set; }
    [MaxLength(20)]
    public string? NgayBanHanh { get; private set; }
    [MaxLength(200)]
    public string? CoQuanBanHanh { get; private set; }
    [MaxLength(15)]
    public string? LoaiThoiGian { get; private set; }
    [MaxLength(15)]
    public string? ThoiGian { get; private set; }
    [MaxLength(255)]
    public string? DonVi { get; private set; }
    public DateTime? TuNgay { get; private set; }
    public DateTime? DenNgay { get; private set; }
    public int? CauHinhThoiGianGiaHan { get; private set; }

    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaCapDanhGia { get; private set; }

    [MaxLength(200)]
    public string? CapDanhGia { get; private set; }

    [Column(TypeName = "VARCHAR")]
    [MaxLength(1000)]
    public string? MaDonViDanhGia { get; private set; }

    [MaxLength(2000)]
    public string? DonViDanhGia { get; private set; }
    public bool? LaDonVi { get; private set; }

    public BoTieuChuan() { }

    public BoTieuChuan(string mabotieuchi, string tenbotieuchi, bool sudung, string dinhkem, string sokyhieu, string ngaybanhanh, string coquanbanhanh, string loaithoigian, string thoigian, string donvi, DateTime? tungay, DateTime? denngay, int? cauHinhThoiGianGiaHan, string maCapDanhGia, string capDanhGia,
        string maDonViDanhGia, string donViDanhGia, bool? laDonVi)
    {
        MaBoTieuChi = mabotieuchi;
        TenBoTieuChi = tenbotieuchi;
        SuDung = sudung;
        DinhKem = dinhkem;
        SoKyHieu = sokyhieu;
        NgayBanHanh = ngaybanhanh;
        CoQuanBanHanh = coquanbanhanh;
        LoaiThoiGian = loaithoigian;
        ThoiGian = thoigian;
        DonVi = donvi;
        TuNgay = tungay;
        DenNgay = denngay;
        CauHinhThoiGianGiaHan = cauHinhThoiGianGiaHan;
        MaCapDanhGia = maCapDanhGia;
        CapDanhGia = capDanhGia;
        MaDonViDanhGia = maDonViDanhGia;
        DonViDanhGia = donViDanhGia;
        LaDonVi = laDonVi;
    }

    public static BoTieuChuan Create(string mabotieuchi, string tenbotieuchi, bool sudung, string dinhkem, string sokyhieu, string ngaybanhanh, string coquanbanhanh, string loaithoigian, string thoigian, string donvi, DateTime? tungay, DateTime? denngay, int? cauHinhThoiGianGiaHan, string maCapDanhGia, string capDanhGia,
        string maDonViDanhGia, string donViDanhGia, bool? laDonVi)
    {
        return new(mabotieuchi, tenbotieuchi, sudung, dinhkem, sokyhieu, ngaybanhanh, coquanbanhanh, loaithoigian, thoigian, donvi, tungay, denngay, cauHinhThoiGianGiaHan, maCapDanhGia, capDanhGia, maDonViDanhGia,
            donViDanhGia, laDonVi);
    }
    public BoTieuChuan Update(string mabotieuchi, string tenbotieuchi, bool sudung, string dinhkem, string sokyhieu, string ngaybanhanh, string coquanbanhanh, string loaithoigian, string thoigian, string donvi, DateTime? tungay, DateTime? denngay, int? cauHinhThoiGianGiaHan, string maCapDanhGia, string capDanhGia,
        string maDonViDanhGia, string donViDanhGia, bool? laDonVi)
    {
        if (laDonVi != null)
            LaDonVi = laDonVi;
        if (!string.IsNullOrEmpty(maCapDanhGia))
            MaCapDanhGia = maCapDanhGia;

        if (!string.IsNullOrEmpty(capDanhGia))
            CapDanhGia = capDanhGia;

        if (!string.IsNullOrEmpty(maDonViDanhGia))
            MaDonViDanhGia = maDonViDanhGia;

        if (!string.IsNullOrEmpty(donViDanhGia))
            DonViDanhGia = donViDanhGia;

        if (cauHinhThoiGianGiaHan.HasValue)
            CauHinhThoiGianGiaHan = cauHinhThoiGianGiaHan.Value;
        // Kiểm tra và gán giá trị cho MaBoTieuChi
        if (!string.IsNullOrEmpty(mabotieuchi) && (MaBoTieuChi == null || !MaBoTieuChi.Equals(mabotieuchi, StringComparison.OrdinalIgnoreCase)))
            MaBoTieuChi = mabotieuchi;

        // Kiểm tra và gán giá trị cho TenBoTieuChi
        if (!string.IsNullOrEmpty(tenbotieuchi) && (TenBoTieuChi == null || !TenBoTieuChi.Equals(tenbotieuchi, StringComparison.OrdinalIgnoreCase)))
            TenBoTieuChi = tenbotieuchi;

        // Kiểm tra và gán giá trị cho DinhKem
        if (!string.IsNullOrEmpty(dinhkem) && (DinhKem == null || !DinhKem.Equals(dinhkem, StringComparison.OrdinalIgnoreCase)))
            DinhKem = dinhkem;

        // Kiểm tra và gán giá trị cho SoKyHieu
        if (!string.IsNullOrEmpty(sokyhieu) && (SoKyHieu == null || !SoKyHieu.Equals(sokyhieu, StringComparison.OrdinalIgnoreCase)))
            SoKyHieu = sokyhieu;

        // Kiểm tra và gán giá trị cho NgayBanHanh
        if (!string.IsNullOrEmpty(ngaybanhanh) && (NgayBanHanh == null || !NgayBanHanh.Equals(ngaybanhanh, StringComparison.OrdinalIgnoreCase)))
            NgayBanHanh = ngaybanhanh;

        // Kiểm tra và gán giá trị cho CoQuanBanHanh
        if (!string.IsNullOrEmpty(coquanbanhanh) && (CoQuanBanHanh == null || !CoQuanBanHanh.Equals(coquanbanhanh, StringComparison.OrdinalIgnoreCase)))
            CoQuanBanHanh = coquanbanhanh;

        // Kiểm tra và gán giá trị cho LoaiThoiGian
        if (!string.IsNullOrEmpty(loaithoigian) && (LoaiThoiGian == null || !LoaiThoiGian.Equals(loaithoigian, StringComparison.OrdinalIgnoreCase)))
            LoaiThoiGian = loaithoigian;

        // Kiểm tra và gán giá trị cho ThoiGian
        if (!string.IsNullOrEmpty(thoigian) && (ThoiGian == null || !ThoiGian.Equals(thoigian, StringComparison.OrdinalIgnoreCase)))
            ThoiGian = thoigian;

        // Kiểm tra và gán giá trị cho DonVi
        if (!string.IsNullOrEmpty(donvi) && (DonVi == null || !DonVi.Equals(donvi, StringComparison.OrdinalIgnoreCase)))
            DonVi = donvi;

        // Kiểm tra và gán giá trị cho TuNgay (DateTime?)
        if (tungay.HasValue)
            TuNgay = tungay.Value;

        // Kiểm tra và gán giá trị cho DenNgay (DateTime?)
        if (denngay.HasValue)
            DenNgay = denngay.Value;

        // Kiểm tra và gán giá trị cho SuDung (bool)
        SuDung = sudung;

        return this;
    }

    public BoTieuChuan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public BoTieuChuan Restore()
    {
        DeletedOn = null;
        return this;
    }
}
