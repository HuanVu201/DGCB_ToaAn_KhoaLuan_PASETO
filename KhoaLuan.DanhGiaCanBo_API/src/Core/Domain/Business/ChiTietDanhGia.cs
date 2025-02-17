using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace TD.DanhGiaCanBo.Domain.Business;
public class ChiTietDanhGia : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(200)]
    public string? TenMauPhieu { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaMauPhieu { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaPhieu { get; private set; }
    [MaxLength(15)]
    public string? ScorePoint { get; private set; }

    [MaxLength(50)]
    public string? ChiTietDiemLanhDaoDanhGia { get; private set; }
    [MaxLength(50)]
    public string? ChiTietDiemTuDanhGia { get; private set; }
    [MaxLength(50)]
    public string? ChiTietDiemThamMuu { get; private set; }
    [MaxLength(50)]
    public string? ChiTietDiemNhanXet { get; private set; }
    [MaxLength(50)]
    public string? ChiTietDiemDanhGia { get; private set; }

    public string? DataTuDanhGia { get; private set; }
    public string? DataNhanXet { get; private set; }
    public string? DataThamMuu { get; private set; }
    public string? DataLanhDaoDanhGia { get; private set; }
    public string? DataKhieuNai { get; private set; }
    public string? DataXuLyKhieuNai { get; private set; }
    public double? DiemDanhGia { get; private set; }
    public double? DiemTuDanhGia { get; private set; }
    public double? DiemNhanXet { get; private set; }
    public double? DiemThamMuu { get; private set; }
    public double? DiemLanhDaoDanhGia { get; private set; }
    public bool? HasDiemLietTuDanhGia { get; private set; }
    public bool? HasDiemLietNhanXet { get; private set; }
    public bool? HasDiemLietThamMuu { get; private set; }
    public bool? HasDiemLietLanhDaoDanhGia { get; private set; }
    public int? ThuTu { get; private set; }
    public int? SoLuongKhieuNai { get; private set; }

    public ChiTietDanhGia()
    {

    }
    public ChiTietDanhGia(string? tenMauPhieu, string? maMauPhieu, string? maPhieu, string? chiTietDiemLanhDaoDanhGia, string? chiTietDiemTuDanhGia, string? chiTietDiemThamMuu, string? chiTietDiemNhanXet, string? chiTietDiemDanhGia,
        string? dataTuDanhGia, string? dataNhanXet, string? dataThamMuu, string? dataLanhDaoDanhGia, double? diemDanhGia, double? diemTuDanhGia, double? diemNhanXet, double? diemThamMuu, double? diemLanhDaoDanhGia, int? thutu, string? scorePoint,
        bool? hasDiemLietTuDanhGia, bool? hasDiemLietNhanXet, bool? hasDiemLietThamMuu, bool? hasDiemLietLanhDaoDanhGia, string? dataKhieuNai, string? dataXuLyKhieuNai, int? soLuongKhieuNai)
    {
        TenMauPhieu = tenMauPhieu;
        MaMauPhieu = maMauPhieu;
        MaPhieu = maPhieu;
        ChiTietDiemTuDanhGia = chiTietDiemTuDanhGia;
        ChiTietDiemLanhDaoDanhGia = chiTietDiemLanhDaoDanhGia;
        ChiTietDiemThamMuu = chiTietDiemThamMuu;
        ChiTietDiemNhanXet = chiTietDiemNhanXet;
        ChiTietDiemDanhGia = chiTietDiemDanhGia;
        DataTuDanhGia = dataTuDanhGia;
        DataNhanXet = dataNhanXet;
        DataThamMuu = dataThamMuu;
        DataLanhDaoDanhGia = dataLanhDaoDanhGia;
        DiemDanhGia = diemDanhGia;
        DiemTuDanhGia = diemTuDanhGia;
        DiemNhanXet = diemNhanXet;
        DiemThamMuu = diemThamMuu;
        DiemLanhDaoDanhGia = diemLanhDaoDanhGia;
        ThuTu = thutu;
        ScorePoint = scorePoint;
        HasDiemLietTuDanhGia = hasDiemLietTuDanhGia;
        HasDiemLietNhanXet = hasDiemLietNhanXet;
        HasDiemLietThamMuu = hasDiemLietThamMuu;
        HasDiemLietLanhDaoDanhGia = hasDiemLietLanhDaoDanhGia;
        DataKhieuNai = dataKhieuNai;
        DataXuLyKhieuNai = dataXuLyKhieuNai;
        SoLuongKhieuNai = soLuongKhieuNai;
    }

    public static ChiTietDanhGia Create(string? tenMauPhieu, string? maMauPhieu, string? maPhieu, string? chiTietDiemLanhDaoDanhGia, string? chiTietDiemTuDanhGia, string? chiTietDiemThamMuu, string? chiTietDiemNhanXet, string? chiTietDiemDanhGia,
        string? dataTuDanhGia, string? dataNhanXet, string? dataThamMuu, string? dataLanhDaoDanhGia, double? diemDanhGia, double? diemTuDanhGia, double? diemNhanXet, double? diemThamMuu, double? diemLanhDaoDanhGia, int? thuTu, string? scorePoint,
        bool? hasDiemLietTuDanhGia, bool? hasDiemLietNhanXet, bool? hasDiemLietThamMuu, bool? hasDiemLietLanhDaoDanhGia, string? dataKhieuNai, string? dataXuLyKhieuNai, int? soLuongKhieuNai)
    {
        return new(tenMauPhieu, maMauPhieu, maPhieu, chiTietDiemLanhDaoDanhGia, chiTietDiemTuDanhGia, chiTietDiemThamMuu, chiTietDiemNhanXet, chiTietDiemDanhGia,
         dataTuDanhGia, dataNhanXet, dataThamMuu, dataLanhDaoDanhGia, diemDanhGia, diemTuDanhGia, diemNhanXet, diemThamMuu, diemLanhDaoDanhGia, thuTu, scorePoint,
         hasDiemLietTuDanhGia, hasDiemLietNhanXet, hasDiemLietThamMuu, hasDiemLietLanhDaoDanhGia, dataKhieuNai, dataXuLyKhieuNai, soLuongKhieuNai);
    }

    public ChiTietDanhGia Update(string? tenMauPhieu, string? maMauPhieu, string? maPhieu, string? chiTietDiemLanhDaoDanhGia, string? chiTietDiemTuDanhGia, string? chiTietDiemThamMuu, string? chiTietDiemNhanXet, string? chiTietDiemDanhGia,
        string? dataTuDanhGia, string? dataNhanXet, string? dataThamMuu, string? dataLanhDaoDanhGia, double? diemDanhGia, double? diemTuDanhGia, double? diemNhanXet, double? diemThamMuu, double? diemLanhDaoDanhGia, int? thuTu,
        bool? hasDiemLietTuDanhGia, bool? hasDiemLietNhanXet, bool? hasDiemLietThamMuu, bool? hasDiemLietLanhDaoDanhGia, string? dataKhieuNai, string? dataXuLyKhieuNai, int? soLuongKhieuNai)
    {
        if (soLuongKhieuNai != null) SoLuongKhieuNai = (int)soLuongKhieuNai;
        if (!string.IsNullOrEmpty(maPhieu) && !MaPhieu.Equals(maPhieu))
            MaPhieu = maPhieu;
        if (!string.IsNullOrEmpty(tenMauPhieu) && !TenMauPhieu.Equals(tenMauPhieu))
            TenMauPhieu = tenMauPhieu;
        if (!string.IsNullOrEmpty(maMauPhieu) && !MaMauPhieu.Equals(maMauPhieu))
            MaMauPhieu = maMauPhieu;
        if (!string.IsNullOrEmpty(chiTietDiemLanhDaoDanhGia))
            ChiTietDiemLanhDaoDanhGia = chiTietDiemLanhDaoDanhGia;
        if (!string.IsNullOrEmpty(chiTietDiemTuDanhGia))
            ChiTietDiemTuDanhGia = chiTietDiemTuDanhGia;
        if (!string.IsNullOrEmpty(chiTietDiemThamMuu))
            ChiTietDiemThamMuu = chiTietDiemThamMuu;
        if (!string.IsNullOrEmpty(chiTietDiemNhanXet))
            ChiTietDiemNhanXet = chiTietDiemNhanXet;
        if (!string.IsNullOrEmpty(chiTietDiemDanhGia))
            ChiTietDiemDanhGia = chiTietDiemDanhGia;
        if (!string.IsNullOrEmpty(dataTuDanhGia))
            DataTuDanhGia = dataTuDanhGia;
        if (!string.IsNullOrEmpty(dataNhanXet))
            DataNhanXet = dataNhanXet;
        if (!string.IsNullOrEmpty(dataThamMuu))
            DataThamMuu = dataThamMuu;
        if (!string.IsNullOrEmpty(dataLanhDaoDanhGia))
            DataLanhDaoDanhGia = dataLanhDaoDanhGia;
        if (diemDanhGia != null)
            DiemDanhGia = (double)diemDanhGia;
        if (diemTuDanhGia != null)
            DiemTuDanhGia = (double)diemTuDanhGia;
        if (diemNhanXet != null)
            DiemNhanXet = (double)diemNhanXet;
        if (diemThamMuu != null)
            DiemThamMuu = (double)diemThamMuu;
        if (diemLanhDaoDanhGia != null)
            DiemLanhDaoDanhGia = (double)diemLanhDaoDanhGia;
        if (hasDiemLietTuDanhGia.HasValue)
            HasDiemLietTuDanhGia = hasDiemLietTuDanhGia;
        if (hasDiemLietNhanXet.HasValue)
            HasDiemLietNhanXet = hasDiemLietNhanXet;
        if (hasDiemLietThamMuu.HasValue)
            HasDiemLietThamMuu = hasDiemLietThamMuu;
        if (hasDiemLietLanhDaoDanhGia.HasValue)
            HasDiemLietLanhDaoDanhGia = hasDiemLietLanhDaoDanhGia;
        if (thuTu != null)
            ThuTu = (int)thuTu;
        if (!string.IsNullOrEmpty(dataKhieuNai))
            DataKhieuNai = dataKhieuNai;
        if (!string.IsNullOrEmpty(dataXuLyKhieuNai))
            DataXuLyKhieuNai = dataXuLyKhieuNai;
        return this;
    }
    public ChiTietDanhGia SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ChiTietDanhGia Restore()
    {
        DeletedOn = null;
        return this;
    }
}
