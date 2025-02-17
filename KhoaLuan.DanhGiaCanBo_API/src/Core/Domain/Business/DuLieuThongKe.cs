using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace TD.DanhGiaCanBo.Domain.Business;
public class DuLieuThongKe : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(100)]
    public string? LoaiThongKe { get; set; }
    [MaxLength(100)]
    public string? TenDonVi { get; set; }
    [MaxLength(50)]
    public string? MaDonVi { get; set; }
   
    [MaxLength(15)]
    public string? LoaiThoiGian { get; set; }
    [MaxLength(15)]
    public string? ThoiGian { get; set; }
    public int? NamDanhGia { get; set; }
    public DateTime? ThoiGianTao { get; set; }
    public int? DanhGiaLoaiA { get; set; }
    public int? DanhGiaLoaiB { get; set; }
    public int? DanhGiaLoaiC { get; set; }
    public int? DanhGiaLoaiD { get; set; }
    public int? TongSoCanBo { get; set; }
    public int? TongSoKhongDanhGia { get; set; }
    public int? TongSoTuDanhGia { get; set; }
    public int? TongSoDaXepLoai { get; set; }
    public int? TongSoCongViec { get; set; }
    public int? CongViecChuaHoanThanh { get; set; }
    public int? CongViecDangXuLy { get; set; }
    public int? CongViecDaHoanThanh { get; set; }
    public int? KhenThuongDeXuat { get; set; }
    public int? KhenThuong { get; set; }
    public int? ThoiGianQuery { get; set; }
    public string? Category { get; set; }
    //
    [MaxLength(50)]
    public string? MaDonViCha { get; set; }
    [MaxLength(200)]
    public string? FullMa { get; set; }
    public DuLieuThongKe()
    {
       
    }

    public DuLieuThongKe(string loaiThongKe, string tenDonVi, string maDonVi, string loaiThoiGian, string thoiGian, int? namDanhGia, DateTime? thoiGianTao, int? danhGiaLoaiA,
       int? danhGiaLoaiB, int? danhGiaLoaiC, int? danhGiaLoaiD, int? tongSoCanBo, int? tongSoKhongDanhGia, int? tongSoTuDanhGia, int? tongSoDaXepLoai, int? tongSoCongViec, int? congViecChuaHoanThanh, int? congViecDangXuLy, int? congViecDaHoanThanh,
       int? khenThuongDeXuat, int? khenThuong, int? thoiGianQuery,string? category, string? maDonViCha, string? fullMa)
    {
        LoaiThongKe = loaiThongKe;
        TenDonVi = tenDonVi;
        MaDonVi = maDonVi;
        LoaiThoiGian = loaiThoiGian;
        ThoiGian = thoiGian;
        NamDanhGia = namDanhGia;
        ThoiGianTao = thoiGianTao;
        DanhGiaLoaiA = danhGiaLoaiA;
        DanhGiaLoaiB = danhGiaLoaiB;
        DanhGiaLoaiC = danhGiaLoaiC;
        DanhGiaLoaiD = danhGiaLoaiD;
        TongSoCanBo = tongSoCanBo;
        TongSoKhongDanhGia = tongSoKhongDanhGia;
        TongSoTuDanhGia  = tongSoTuDanhGia;
        TongSoDaXepLoai = tongSoDaXepLoai;
        TongSoCongViec = tongSoCongViec;
        CongViecChuaHoanThanh = congViecChuaHoanThanh;
        CongViecDangXuLy = congViecDangXuLy;
        CongViecDaHoanThanh = congViecDaHoanThanh;
        KhenThuongDeXuat = khenThuongDeXuat;
        KhenThuong = khenThuong;
        ThoiGianQuery = thoiGianQuery;
        Category = category;
        MaDonViCha = maDonViCha;
        FullMa = fullMa;

    }

    public static DuLieuThongKe Create(string loaiThongKe, string tenDonVi, string maDonVi, string loaiThoiGian, string thoiGian, int? namDanhGia, DateTime? thoiGianTao, int? danhGiaLoaiA,
       int? danhGiaLoaiB, int? danhGiaLoaiC, int? danhGiaLoaiD, int? tongSoCanBo, int? tongSoKhongDanhGia, int? tongSoTuDanhGia, int? tongSoDaXepLoai, int? tongSoCongViec, int? congViecChuaHoanThanh, int? congViecDangXuLy, int? congViecDaHoanThanh,
       int? khenThuongDeXuat, int? khenThuong, int? thoiGianQuery, string category, string? maDonViCha, string? fullMa)
    {
        return new(loaiThongKe, tenDonVi, maDonVi, loaiThoiGian, thoiGian, namDanhGia, thoiGianTao, danhGiaLoaiA,
      danhGiaLoaiB, danhGiaLoaiC, danhGiaLoaiD, tongSoCanBo, tongSoKhongDanhGia, tongSoTuDanhGia, tongSoDaXepLoai, tongSoCongViec, congViecChuaHoanThanh, congViecDangXuLy, congViecDaHoanThanh,
      khenThuongDeXuat, khenThuong, thoiGianQuery, category, maDonViCha, fullMa);
    }
    public DuLieuThongKe Update(string loaiThongKe, string tenDonVi, string maDonVi, string loaiThoiGian, string thoiGian, int? namDanhGia, DateTime? thoiGianTao, int? danhGiaLoaiA,
       int? danhGiaLoaiB, int? danhGiaLoaiC, int? danhGiaLoaiD, int? tongSoCanBo, int? tongSoKhongDanhGia, int? tongSoTuDanhGia, int? tongSoDaXepLoai, int? tongSoCongViec, int? congViecChuaHoanThanh, int? congViecDangXuLy, int? congViecDaHoanThanh,
       int? khenThuongDeXuat, int? khenThuong, int? thoiGianQuery, string category, string? maDonViCha, string? fullMa)
    {
        if (!string.IsNullOrEmpty(maDonViCha))
            MaDonViCha = maDonViCha;
        if (!string.IsNullOrEmpty(fullMa))
            FullMa = fullMa;
        if (!string.IsNullOrEmpty(loaiThongKe) && !LoaiThongKe.Equals(loaiThongKe))
            LoaiThongKe = loaiThongKe;
        if (!string.IsNullOrEmpty(tenDonVi) && !TenDonVi.Equals(tenDonVi))
            TenDonVi = tenDonVi;
        if (!string.IsNullOrEmpty(maDonVi) && !MaDonVi.Equals(maDonVi))
            MaDonVi = maDonVi;
        if (!string.IsNullOrEmpty(loaiThoiGian) && !LoaiThoiGian.Equals(loaiThoiGian))
            LoaiThoiGian = loaiThoiGian;
        if (!string.IsNullOrEmpty(thoiGian) && !ThoiGian.Equals(thoiGian))
            ThoiGian = thoiGian;
        if (!string.IsNullOrEmpty(category) && !Category.Equals(category))
            Category = category;
         if (namDanhGia != null)
            NamDanhGia = namDanhGia;
        if (thoiGianTao != null)
            ThoiGianTao = thoiGianTao;
        if (danhGiaLoaiA != null)
            DanhGiaLoaiA = danhGiaLoaiA;
        if (danhGiaLoaiB != null)
            DanhGiaLoaiB = danhGiaLoaiB;
        if (danhGiaLoaiC != null)
            DanhGiaLoaiC = danhGiaLoaiC;
        if (danhGiaLoaiD != null)
            DanhGiaLoaiD = danhGiaLoaiD;
        if (tongSoCanBo != null)
            TongSoCanBo = tongSoCanBo;
        if (tongSoKhongDanhGia != null)
            TongSoKhongDanhGia = tongSoKhongDanhGia;
        if (tongSoTuDanhGia != null)
            TongSoTuDanhGia = tongSoTuDanhGia;
        if (tongSoDaXepLoai != null)
            TongSoDaXepLoai = tongSoDaXepLoai;
        if (tongSoCongViec != null)
            TongSoCongViec = tongSoCongViec;
        if (congViecChuaHoanThanh != null)
            CongViecChuaHoanThanh = congViecChuaHoanThanh;
        if (congViecDangXuLy != null)
            CongViecDangXuLy = congViecDangXuLy;
        if (congViecDaHoanThanh != null)
            CongViecDaHoanThanh = congViecDaHoanThanh;
        if (khenThuongDeXuat != null)
            KhenThuongDeXuat = khenThuongDeXuat;
        if (khenThuong != null)
            KhenThuong = khenThuong;
        if (thoiGianQuery != null)
            ThoiGianQuery = thoiGianQuery;



        return this;
    }
    

    public DuLieuThongKe SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public DuLieuThongKe Restore()
    {
        DeletedOn = null;
        return this;
    }
}
