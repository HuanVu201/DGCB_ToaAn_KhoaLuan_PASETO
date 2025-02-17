using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;

public class MauPhieuDanhGia : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(1)]
    public string? LevelBoTieuChi { get; private set; }

    [MaxLength(400)]
    public string? Ten { get; private set; }

    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? Ma { get; private set; }

    public int? DiemDatYeuCau { get; private set; }
    public int? DiemThuong { get; private set; }
    public int? DiemTru { get; private set; }

    [MaxLength(100)]
    public string? XepLoai { get; private set; }

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

    [Column(TypeName = "VARCHAR")]
    [MaxLength(1000)]
    public string? MaChucVuDanhGia { get; private set; }

    [MaxLength(2000)]
    public string? TenChucVuDanhGia { get; private set; }

    [Column(TypeName = "VARCHAR")]
    [MaxLength(1000)]
    public string? MaChucDanhDanhGia { get; private set; }

    [MaxLength(2000)]
    public string? TenChucDanhDanhGia { get; private set; }

    [Column(TypeName = "VARCHAR")]
    [MaxLength(1000)]
    public string? MaCaNhanDanhGia { get; private set; }

    [MaxLength(2000)]
    public string? CaNhanDanhGia { get; private set; }

    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaBoTieuChi { get; private set; }

    [MaxLength(500)]
    public string? MauImportDanhGia { get; private set; }

    public string? DataTieuChi { get; private set; }

    public string? DinhKem { get; private set; }

    public int? ThuTu { get; private set; }

    public bool? SuDung { get; private set; }
    private readonly List<ChucDanhMauPhieuDanhGia> _ChucDanhs = [];
    public IReadOnlyCollection<ChucDanhMauPhieuDanhGia> ChucDanhs => _ChucDanhs;
    public MauPhieuDanhGia() { }

    public MauPhieuDanhGia(
        string levelBoTieuChi, string ten, string ma,
        int? diemdat, int? diemthuong, int? diemtru,
        string xeploai, string maCapDanhGia, string capDanhGia,
        string maDonViDanhGia, string donViDanhGia,
        string maChucVuDanhGia, string tenChucVuDanhGia,
        string maChucDanhDanhGia, string tenChucDanhDanhGia,
        string maCaNhanDanhGia, string tenCaNhanDanhGia,
        string maBoTieuChi, string mauImportDanhGia,
        string dataTieuChi, string dinhKem,int? thuTu,bool? suDung) 
    {
        LevelBoTieuChi = levelBoTieuChi;
        Ten = ten;
        Ma = ma;
        DiemDatYeuCau = diemdat;
        DiemThuong = diemthuong;
        DiemTru = diemtru;
        XepLoai = xeploai;
        MaCapDanhGia = maCapDanhGia;
        CapDanhGia = capDanhGia;
        MaDonViDanhGia = maDonViDanhGia;
        DonViDanhGia = donViDanhGia;
        MaChucVuDanhGia = maChucVuDanhGia;
        TenChucVuDanhGia = tenChucVuDanhGia;
        MaChucDanhDanhGia = maChucDanhDanhGia;
        TenChucDanhDanhGia = tenChucDanhDanhGia;
        MaCaNhanDanhGia = maCaNhanDanhGia;
        CaNhanDanhGia = tenCaNhanDanhGia;
        MaBoTieuChi = maBoTieuChi;
        MauImportDanhGia = mauImportDanhGia;
        DataTieuChi = dataTieuChi;
        DinhKem = dinhKem;
        ThuTu = thuTu;
        SuDung = suDung;
    }

    public static MauPhieuDanhGia Create(
        string levelBoTieuChi, string ten, string ma,
        int? diemdat, int? diemthuong, int? diemtru,
        string xeploai, string maCapDanhGia, string capDanhGia,
        string maDonViDanhGia, string donViDanhGia,
        string maChucVuDanhGia, string tenChucVuDanhGia,
        string maChucDanhDanhGia, string tenChucDanhDanhGia,
        string maCaNhanDanhGia, string tenCaNhanDanhGia,
        string maBoTieuChi, string mauImportDanhGia,
        string dataTieuChi, string dinhKem,int? thuTu , bool? suDung) // Thêm tham số
    {
        return new MauPhieuDanhGia(
            levelBoTieuChi, ten, ma, diemdat, diemthuong, diemtru,
            xeploai, maCapDanhGia, capDanhGia, maDonViDanhGia,
            donViDanhGia, maChucVuDanhGia, tenChucVuDanhGia,
            maChucDanhDanhGia, tenChucDanhDanhGia, maCaNhanDanhGia,
            tenCaNhanDanhGia, maBoTieuChi, mauImportDanhGia,
            dataTieuChi, dinhKem,thuTu,suDung); // Gọi constructor
    }

    public MauPhieuDanhGia Update(
        string levelBoTieuChi, string ten, string ma,
        int? diemdat, int? diemthuong, int? diemtru,
        string xeploai, string maCapDanhGia, string capDanhGia,
        string maDonViDanhGia, string donViDanhGia,
        string maChucVuDanhGia, string tenChucVuDanhGia,
        string maChucDanhDanhGia, string tenChucDanhDanhGia,
        string maCaNhanDanhGia, string tenCaNhanDanhGia,
        string maBoTieuChi, string mauImportDanhGia,
        string dataTieuChi, string dinhKem,int? thuTu , bool? suDung) // Thêm tham số
    {
        if (!string.IsNullOrEmpty(dinhKem))
            DinhKem = dinhKem; // Cập nhật thuộc tính DinhKem

        if (!string.IsNullOrEmpty(mauImportDanhGia))
            MauImportDanhGia = mauImportDanhGia;

        if (!string.IsNullOrEmpty(dataTieuChi))
            DataTieuChi = dataTieuChi;

        if (!string.IsNullOrEmpty(levelBoTieuChi) )
            LevelBoTieuChi = levelBoTieuChi;

        if (!string.IsNullOrEmpty(maBoTieuChi))
            MaBoTieuChi = maBoTieuChi;

        if (!string.IsNullOrEmpty(ten) )
            Ten = ten;

        if (!string.IsNullOrEmpty(ma))
            Ma = ma;

        if (diemdat.HasValue)
            DiemDatYeuCau = diemdat;

        if (diemtru.HasValue)
            DiemTru = diemtru;

        if (diemthuong.HasValue)
            DiemThuong = diemthuong;

        if (!string.IsNullOrEmpty(xeploai))
            XepLoai = xeploai;

        if (!string.IsNullOrEmpty(maCapDanhGia))
            MaCapDanhGia = maCapDanhGia;

        if (!string.IsNullOrEmpty(capDanhGia))
            CapDanhGia = capDanhGia;

        if (!string.IsNullOrEmpty(maDonViDanhGia))
            MaDonViDanhGia = maDonViDanhGia;

        if (!string.IsNullOrEmpty(donViDanhGia))
            DonViDanhGia = donViDanhGia;

        if (!string.IsNullOrEmpty(maChucVuDanhGia))
            MaChucVuDanhGia = maChucVuDanhGia;

        if (!string.IsNullOrEmpty(tenChucVuDanhGia))
            TenChucVuDanhGia = tenChucVuDanhGia;

        if (!string.IsNullOrEmpty(maChucDanhDanhGia))
            MaChucDanhDanhGia = maChucDanhDanhGia;

        if (!string.IsNullOrEmpty(tenChucDanhDanhGia))
            TenChucDanhDanhGia = tenChucDanhDanhGia;

        if (!string.IsNullOrEmpty(maCaNhanDanhGia))
            MaCaNhanDanhGia = maCaNhanDanhGia;

        if (!string.IsNullOrEmpty(tenCaNhanDanhGia))
            CaNhanDanhGia = tenCaNhanDanhGia;
        if (thuTu != null)
            ThuTu = thuTu;
        if (suDung != null)
            SuDung = suDung;
        return this; // Trả về đối tượng đã cập nhật
    }

    public MauPhieuDanhGia SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public MauPhieuDanhGia Restore()
    {
        DeletedOn = null;
        return this;
    }
}
