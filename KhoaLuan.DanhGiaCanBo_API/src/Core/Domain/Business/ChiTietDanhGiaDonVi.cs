using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace TD.DanhGiaCanBo.Domain.Business;
public class ChiTietDanhGiaDonVi : AuditableEntity<DefaultIdType>, IAggregateRoot
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
    public string? ChiTietDiemDanhGia { get; private set; }

    public string? DataTuDanhGia { get; private set; }
   public string? DataThamMuu { get; private set; }
    public string? DataLanhDaoDanhGia { get; private set; }
    public double? DiemDanhGia { get; private set; }
    public double? DiemTuDanhGia { get; private set; }
    public double? DiemThamMuu { get; private set; }
    public double? DiemLanhDaoDanhGia { get; private set; }
    public bool? HasDiemLietTuDanhGia { get; private set; }
    public bool? HasDiemLietThamMuu { get; private set; }
    public bool? HasDiemLietLanhDaoDanhGia { get; private set; }
    public int? ThuTu { get; private set; }

    public ChiTietDanhGiaDonVi()
    {

    }
    public ChiTietDanhGiaDonVi(string? tenMauPhieu, string? maMauPhieu, string? maPhieu, string? chiTietDiemLanhDaoDanhGia, string? chiTietDiemTuDanhGia, string? chiTietDiemThamMuu, string? chiTietDiemDanhGia,
        string? dataTuDanhGia, string? dataThamMuu, string? dataLanhDaoDanhGia, double? diemDanhGia, double? diemTuDanhGia,  double? diemThamMuu, double? diemLanhDaoDanhGia, int? thutu, string? scorePoint,
        bool? hasDiemLietTuDanhGia, bool? hasDiemLietThamMuu, bool? hasDiemLietLanhDaoDanhGia)
    {
        TenMauPhieu = tenMauPhieu;
        MaMauPhieu = maMauPhieu;
        MaPhieu = maPhieu;
        ChiTietDiemTuDanhGia = chiTietDiemTuDanhGia;
        ChiTietDiemLanhDaoDanhGia = chiTietDiemLanhDaoDanhGia;
        ChiTietDiemThamMuu = chiTietDiemThamMuu;
        ChiTietDiemDanhGia = chiTietDiemDanhGia;
        DataTuDanhGia = dataTuDanhGia;
        DataThamMuu = dataThamMuu;
        DataLanhDaoDanhGia = dataLanhDaoDanhGia;
        DiemDanhGia = diemDanhGia;
        DiemTuDanhGia = diemTuDanhGia;
         DiemThamMuu = diemThamMuu;
        DiemLanhDaoDanhGia = diemLanhDaoDanhGia;
        ThuTu = thutu;
        ScorePoint = scorePoint;
        HasDiemLietTuDanhGia = hasDiemLietTuDanhGia;
       HasDiemLietThamMuu = hasDiemLietThamMuu;
        HasDiemLietLanhDaoDanhGia = hasDiemLietLanhDaoDanhGia;
    }

    public static ChiTietDanhGiaDonVi Create(string? tenMauPhieu, string? maMauPhieu, string? maPhieu, string? chiTietDiemLanhDaoDanhGia, string? chiTietDiemTuDanhGia, string? chiTietDiemThamMuu, string? chiTietDiemDanhGia,
        string? dataTuDanhGia, string? dataThamMuu, string? dataLanhDaoDanhGia, double? diemDanhGia, double? diemTuDanhGia, double? diemThamMuu, double? diemLanhDaoDanhGia, int? thutu, string? scorePoint,
        bool? hasDiemLietTuDanhGia, bool? hasDiemLietThamMuu, bool? hasDiemLietLanhDaoDanhGia)
    {
        return new(tenMauPhieu, maMauPhieu, maPhieu, chiTietDiemLanhDaoDanhGia, chiTietDiemTuDanhGia, chiTietDiemThamMuu, chiTietDiemDanhGia,
         dataTuDanhGia, dataThamMuu, dataLanhDaoDanhGia, diemDanhGia, diemTuDanhGia, diemThamMuu, diemLanhDaoDanhGia, thutu, scorePoint,
        hasDiemLietTuDanhGia, hasDiemLietThamMuu, hasDiemLietLanhDaoDanhGia);
    }
    public ChiTietDanhGiaDonVi Update(string? tenMauPhieu, string? maMauPhieu, string? maPhieu, string? chiTietDiemLanhDaoDanhGia, string? chiTietDiemTuDanhGia, string? chiTietDiemThamMuu,  string? chiTietDiemDanhGia,
        string? dataTuDanhGia,string? dataThamMuu, string? dataLanhDaoDanhGia, double? diemDanhGia, double? diemTuDanhGia,  double? diemThamMuu, double? diemLanhDaoDanhGia, int? thuTu,
        bool? hasDiemLietTuDanhGia, bool? hasDiemLietThamMuu, bool? hasDiemLietLanhDaoDanhGia)
    {
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
       
        if (!string.IsNullOrEmpty(chiTietDiemDanhGia))
            ChiTietDiemDanhGia = chiTietDiemDanhGia;
        if (!string.IsNullOrEmpty(dataTuDanhGia))
            DataTuDanhGia = dataTuDanhGia;
          if (!string.IsNullOrEmpty(dataThamMuu))
            DataThamMuu = dataThamMuu;
        if (!string.IsNullOrEmpty(dataLanhDaoDanhGia))
            DataLanhDaoDanhGia = dataLanhDaoDanhGia;
        if (diemDanhGia != null)
            DiemDanhGia = (double)diemDanhGia;
        if (diemTuDanhGia != null)
            DiemTuDanhGia = (double)diemTuDanhGia;
        if (diemThamMuu != null)
            DiemThamMuu = (double)diemThamMuu;
        if (diemLanhDaoDanhGia != null)
            DiemLanhDaoDanhGia = (double)diemLanhDaoDanhGia;
        if (hasDiemLietTuDanhGia.HasValue)
            HasDiemLietTuDanhGia = hasDiemLietTuDanhGia;
        if (hasDiemLietThamMuu.HasValue)
            HasDiemLietThamMuu = hasDiemLietThamMuu;
        if (hasDiemLietLanhDaoDanhGia.HasValue)
            HasDiemLietLanhDaoDanhGia = hasDiemLietLanhDaoDanhGia;
        if (thuTu != null)
            ThuTu = (int)thuTu;
        return this;
    }
    public ChiTietDanhGiaDonVi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ChiTietDanhGiaDonVi Restore()
    {
        DeletedOn = null;
        return this;
    }
}
