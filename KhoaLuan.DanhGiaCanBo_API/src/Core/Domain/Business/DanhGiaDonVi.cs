using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace TD.DanhGiaCanBo.Domain.Business;
public class DanhGiaDonVi : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string? MaPhieu { get; set; }
    [MaxLength(50)]
    public string? ChiTietDiemDanhGia { get; set; }
    [MaxLength(255)]
    public string? TenPhongBan { get; set; }
    [MaxLength(255)]
    public string? MaPhongBan { get; set; }
    [MaxLength(255)]
    public string? TenDonVi { get; set; }
    [MaxLength(255)]
    public string? MaDonVi { get; set; }
    [MaxLength(30)]
    public string? TrangThai { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiTuDanhGia { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiDanhGia { get; set; }
    public double? DiemDanhGia { get; set; }
    public double? DiemTuDanhGia { get; set; }
    public int? NamDanhGia { get; set; }

    public DateTime? ThoiGianTao { get; set; }
    public DateTime? ThoiGianDanhGia { get; set; }
    public bool? SuDung { get; set; }
    [MaxLength(255)]
    public string? MaDonViCha { get; set; }
    [MaxLength(3000)]
    public string? YKienTuDanhGia { get; set; }
    [MaxLength(3000)]
    public string? YKienDanhGia { get; set; }
    public string? FileDinhKem { get; set; }
    public string? FileDinhKemDG { get; set; }
    public string? MaBoTieuChuan { get; set; }
    [MaxLength(200)]
    public string? TenBoTieuChuan { get; set; }
    public int? ThuTu { get; set; }
    [MaxLength(1500)]
    public string? TenMauPhieuDanhGia { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(200)]
    public string? MaMauPhieuDanhGia { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(1)]
    public string? DaXem { get; set; }
    public int? ThoiGianQuery { get; set; }
    [MaxLength(15)]
    public string? LoaiThoiGian { get; set; }
    [MaxLength(15)]
    public string? ThoiGian { get; set; }
    public string? DanhSachPhanLoaiDanhGia { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "VARCHAR")]
    public string? QuyTrinhXuLyId { get; set; }
    [MaxLength(200)]
    public string? UrlPdf { get; set; }
    [MaxLength(200)]
    public string? UrlDocx { get; set; }
    //UpdatePhucVuQuytrinhDonVi


    public double? DiemThamMuu { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiThamMuu { get; set; }
    public DateTime? ThoiGianThamMuu { get; set; }
    [MaxLength(100)]
    public string? NguoiTuDanhGia { get; set; }
    [MaxLength(50)]
    public string? NguoiTuDanhGiaId { get; set; }
    [MaxLength(100)]
    public string? NguoiThamMuu { get; set; }
    [MaxLength(50)]
    public string? NguoiThamMuuId { get; set; }
    [MaxLength(100)]
    public string? NguoiDanhGia { get; set; }
    [MaxLength(50)]
    public string? NguoiDanhGiaId { get; set; }
    public DefaultIdType? BuocHienTaiId { get; set; }
    public DefaultIdType? BuocTruocId { get; set; }
    public BuocXuLy? BuocHienTai { get; set; }
    public BuocXuLy? BuocTruoc { get; set; }
    [Column(TypeName = "varchar")]
    [MaxLength(36)]
    public string? NguoiDangXuLyId { get; set; }
    [MaxLength(3000)]
    public string? YKienLanhDao { get; set; }
    [MaxLength(3000)]
    public string? YKienThamMuu { get; set; }
    public string? FileDinhKemTM { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiLanhDaoDanhGia { get; set; }
    public double? DiemLanhDaoDanhGia { get; set; }
    public bool? IsKySoDonVi { get; set; }
    public bool? IsKySoThamMuu { get; set; }
    public bool? IsKySoLanhDao { get; set; }
    public DanhGiaDonVi()
    {

    }

    public DanhGiaDonVi(string? maPhieu, string? chiTietDiemDanhGia, string? tenPhongBan, string? maPhongBan, string? tenDonVi, string? maDonVi, string? trangThai, string? phanLoaiTuDanhGia, string? phanLoaiDanhGia,
        double? diemDanhGia, double? diemTuDanhGia, int? namDanhGia,
        DateTime? thoiGianTao, DateTime? thoiGianDanhGia, bool? suDung, string? maDonViCha, string? yKienTuDanhGia, string? yKienDanhGia,
        string? fileDinhKem, string? fileDinhKemDG,
        string? tenMauPhieuDanhGia, string? maMauPhieuDanhGia, string? daXem, int? thoiGianQuery, string? loaiThoiGian, string? thoiGian, string? maBoTieuChuan, string? tenBoTieuChuan, string? danhSachPhanLoaiDanhGia,
        string? quyTrinhXuLyId, string? urlPdf, string? urlDocx, double? diemThamMuu, string? phanLoaiThamMuu, DateTime? thoiGianThamMuu, string? nguoiTuDanhGia, string? nguoiTuDanhGiaId, string? nguoiThamMuu,
        string? nguoiThamMuuId, string? nguoiDanhGia, string? nguoiDanhGiaId, DefaultIdType? buocHienTaiId, DefaultIdType? buocTruocId, string? nguoiDangXuLyId, string? yKienLanhDao, string? yKienThamMuu,
        string? fileDinhKemTM, string? phanLoaiLanhDaoDanhGia, double? diemLanhDaoDanhGia, bool? isKySoDonVi, bool? isKySoThamMuu, bool? isKySoLanhDao)
    {
        MaPhieu = maPhieu;
        ChiTietDiemDanhGia = chiTietDiemDanhGia;
        TenPhongBan = tenPhongBan;
        MaPhongBan = maPhongBan;
        TenDonVi = tenDonVi;
        MaDonVi = maDonVi;
        TrangThai = trangThai;
        PhanLoaiTuDanhGia = phanLoaiTuDanhGia;
        PhanLoaiDanhGia = phanLoaiDanhGia;
        DiemDanhGia = diemDanhGia;
        DiemTuDanhGia = diemTuDanhGia;
        NamDanhGia = namDanhGia;
        DaXem = daXem;
        ThoiGianTao = thoiGianTao;
        ThoiGianDanhGia = thoiGianDanhGia;
        ThoiGianQuery = thoiGianQuery;
        SuDung = suDung;
        MaDonViCha = maDonViCha;
        YKienTuDanhGia = yKienTuDanhGia;
        YKienDanhGia = yKienDanhGia;
        FileDinhKem = fileDinhKem;
        FileDinhKemDG = fileDinhKemDG;

        ThoiGian = thoiGian;
        TenMauPhieuDanhGia = tenMauPhieuDanhGia;
        MaMauPhieuDanhGia = maMauPhieuDanhGia;

        LoaiThoiGian = loaiThoiGian;
        MaBoTieuChuan = maBoTieuChuan;
        TenBoTieuChuan = tenBoTieuChuan;
        DanhSachPhanLoaiDanhGia = danhSachPhanLoaiDanhGia;
        QuyTrinhXuLyId = quyTrinhXuLyId;
        UrlPdf = urlPdf;
        UrlDocx = urlDocx;
        ThoiGianThamMuu = thoiGianThamMuu;
        //Update
        DiemThamMuu = diemThamMuu;
        PhanLoaiThamMuu = phanLoaiThamMuu;
        ThoiGianThamMuu = thoiGianThamMuu;
        NguoiTuDanhGia = nguoiTuDanhGia;
        NguoiTuDanhGiaId = nguoiTuDanhGiaId;
        NguoiThamMuu = nguoiThamMuu;
        NguoiThamMuuId = nguoiThamMuuId;
        NguoiDanhGia = nguoiDanhGia;
        NguoiDanhGiaId = nguoiDanhGiaId;
        BuocHienTaiId = buocHienTaiId;
        BuocTruocId = buocTruocId;
        NguoiDangXuLyId = nguoiDangXuLyId;
        PhanLoaiLanhDaoDanhGia = phanLoaiLanhDaoDanhGia;
        DiemLanhDaoDanhGia = diemLanhDaoDanhGia;
        IsKySoDonVi = isKySoDonVi;
        IsKySoThamMuu = isKySoThamMuu;
        IsKySoLanhDao = isKySoLanhDao;
    }

    public static DanhGiaDonVi Create(string? maPhieu, string? chiTietDiemDanhGia, string? tenPhongBan, string? maPhongBan, string? tenDonVi, string? maDonVi, string? trangThai, string? phanLoaiTuDanhGia, string? phanLoaiDanhGia,
        double? diemDanhGia, double? diemTuDanhGia, int? namDanhGia,
        DateTime? thoiGianTao, DateTime? thoiGianDanhGia, bool? suDung, string? maDonViCha, string? yKienTuDanhGia, string? yKienDanhGia,
        string? fileDinhKem, string? fileDinhKemDG,
        string? tenMauPhieuDanhGia, string? maMauPhieuDanhGia, string? daXem, int? thoiGianQuery, string? loaiThoiGian, string? thoiGian, string? maBoTieuChuan, string? tenBoTieuChuan, string? danhSachPhanLoaiDanhGia, string? quyTrinhXuLyId, string? urlPdf, string? urlDocx,
        double? diemThamMuu, string? phanLoaiThamMuu, DateTime? thoiGianThamMuu, string? nguoiTuDanhGia, string? nguoiTuDanhGiaId, string? nguoiThamMuu, string? nguoiThamMuuId,
        string? nguoiDanhGia, string? nguoiDanhGiaId, DefaultIdType? buocHienTaiId, DefaultIdType? buocTruocId, string? nguoiDangXuLyId, string? yKienLanhDao, string? yKienThamMuu, string? fileDinhKemTM, string? phanLoaiLanhDaoDanhGia, double? diemLanhDaoDanhGia,
        bool? isKySoDonVi, bool? isKySoThamMuu, bool? isKySoLanhDao
)
    {
        return new(maPhieu, chiTietDiemDanhGia, tenPhongBan, maPhongBan, tenDonVi, maDonVi, trangThai, phanLoaiTuDanhGia, phanLoaiDanhGia,
        diemDanhGia, diemTuDanhGia, namDanhGia, thoiGianTao, thoiGianDanhGia, suDung, maDonViCha, yKienTuDanhGia, yKienDanhGia,
        fileDinhKem, fileDinhKemDG, tenMauPhieuDanhGia, maMauPhieuDanhGia, daXem, thoiGianQuery, loaiThoiGian, thoiGian, maBoTieuChuan, tenBoTieuChuan, danhSachPhanLoaiDanhGia, quyTrinhXuLyId, urlPdf, urlDocx, diemThamMuu, phanLoaiThamMuu, thoiGianThamMuu, nguoiTuDanhGia, nguoiTuDanhGiaId, nguoiThamMuu, nguoiThamMuuId,
        nguoiDanhGia, nguoiDanhGiaId, buocHienTaiId, buocTruocId, nguoiDangXuLyId, yKienLanhDao, yKienThamMuu, fileDinhKemTM, phanLoaiLanhDaoDanhGia, diemLanhDaoDanhGia, isKySoDonVi, isKySoThamMuu, isKySoLanhDao);
    }

    public DanhGiaDonVi Update(string? maPhieu, string? chiTietDiemDanhGia, string? tenPhongBan, string? maPhongBan, string? tenDonVi, string? maDonVi, string? trangThai, string? phanLoaiTuDanhGia, string? phanLoaiDanhGia,
        double? diemDanhGia, double? diemTuDanhGia, int? namDanhGia,
        DateTime? thoiGianTao, DateTime? thoiGianDanhGia, bool? suDung, string? maDonViCha, string? yKienTuDanhGia, string? yKienDanhGia,
        string? fileDinhKem, string? fileDinhKemDG,
        string? tenMauPhieuDanhGia, string? maMauPhieuDanhGia, string? daXem, int? thoiGianQuery, string? loaiThoiGian, string? thoiGian, string? maBoTieuChuan, string? quyTrinhXuLyId, string? urlPdf, string? urlDocx,
        double? diemThamMuu, string? phanLoaiThamMuu, DateTime? thoiGianThamMuu, string? nguoiTuDanhGia, string? nguoiTuDanhGiaId, string? nguoiThamMuu, string? nguoiThamMuuId,
        string? nguoiDanhGia, string? nguoiDanhGiaId, DefaultIdType? buocHienTaiId, DefaultIdType? buocTruocId, string? nguoiDangXuLyId, string? yKienLanhDao, string? yKienThamMuu, string? fileDinhKemTM, string? phanLoaiLanhDaoDanhGia, double? diemLanhDaoDanhGia,
        bool? isKySoDonVi, bool? isKySoThamMuu, bool? isKySoLanhDao, bool? resetUrlPhieu)
    {
        if (!string.IsNullOrEmpty(phanLoaiLanhDaoDanhGia))
            PhanLoaiLanhDaoDanhGia = phanLoaiLanhDaoDanhGia;
        if (diemLanhDaoDanhGia != null)
            DiemLanhDaoDanhGia = (double)diemLanhDaoDanhGia;
        if (!string.IsNullOrEmpty(yKienLanhDao))
            YKienLanhDao = yKienLanhDao;
        if (!string.IsNullOrEmpty(yKienThamMuu))
            YKienThamMuu = yKienThamMuu;

        if (!string.IsNullOrEmpty(fileDinhKemTM))
            FileDinhKemTM = fileDinhKemTM;

        if (!string.IsNullOrEmpty(maPhieu))
            MaPhieu = maPhieu;
        if (!string.IsNullOrEmpty(chiTietDiemDanhGia))
            ChiTietDiemDanhGia = chiTietDiemDanhGia;

        if (!string.IsNullOrEmpty(tenPhongBan))
            TenPhongBan = tenPhongBan;
        if (!string.IsNullOrEmpty(maPhongBan))
            MaPhongBan = maPhongBan;
        if (!string.IsNullOrEmpty(tenDonVi))
            TenDonVi = tenDonVi;
        if (!string.IsNullOrEmpty(maDonVi))
            MaDonVi = maDonVi;
        if (!string.IsNullOrEmpty(trangThai))
            TrangThai = trangThai;
        if (!string.IsNullOrEmpty(phanLoaiTuDanhGia))
            PhanLoaiTuDanhGia = phanLoaiTuDanhGia;
        if (!string.IsNullOrEmpty(phanLoaiDanhGia))
            PhanLoaiDanhGia = phanLoaiDanhGia;

        if (diemDanhGia != null)
            DiemDanhGia = (double)diemDanhGia;
        if (diemTuDanhGia != null)
            DiemTuDanhGia = (double)diemTuDanhGia;

        if (namDanhGia != 0)
            NamDanhGia = namDanhGia;
        if (!string.IsNullOrEmpty(daXem))
            DaXem = daXem;
        if (thoiGianTao != null)
            ThoiGianTao = (DateTime)thoiGianTao;

        if (thoiGianDanhGia != null)
            ThoiGianDanhGia = (DateTime)thoiGianDanhGia;

        if (!string.IsNullOrEmpty(loaiThoiGian))
            LoaiThoiGian = loaiThoiGian;

        if (suDung != null)
            SuDung = suDung;
        if (!string.IsNullOrEmpty(maDonViCha))
            MaDonViCha = maDonViCha;

        if (!string.IsNullOrEmpty(yKienTuDanhGia))
            YKienTuDanhGia = yKienTuDanhGia;

        if (!string.IsNullOrEmpty(yKienDanhGia))
            YKienDanhGia = yKienDanhGia;
        if (!string.IsNullOrEmpty(fileDinhKem))
            FileDinhKem = fileDinhKem;

        if (!string.IsNullOrEmpty(fileDinhKemDG))
            FileDinhKemDG = fileDinhKemDG;

        if (!string.IsNullOrEmpty(thoiGian))
            ThoiGian = thoiGian;
        if (thoiGianQuery != null)
            ThoiGianQuery = (int)thoiGianQuery;
        if (MaBoTieuChuan != null)
            MaBoTieuChuan = MaBoTieuChuan;

        if (!string.IsNullOrEmpty(tenMauPhieuDanhGia))
            TenMauPhieuDanhGia = tenMauPhieuDanhGia;
        if (!string.IsNullOrEmpty(maMauPhieuDanhGia))
            MaMauPhieuDanhGia = maMauPhieuDanhGia;

        if (!string.IsNullOrEmpty(quyTrinhXuLyId))
            QuyTrinhXuLyId = quyTrinhXuLyId;

        if (!string.IsNullOrEmpty(urlPdf))
            UrlPdf = urlPdf;

        if (!string.IsNullOrEmpty(urlDocx))
            UrlDocx = urlDocx;
        //Update
        if (diemThamMuu != null)
            DiemThamMuu = (double)diemThamMuu;
        if (!string.IsNullOrEmpty(phanLoaiThamMuu))
            PhanLoaiThamMuu = phanLoaiThamMuu;
        if (thoiGianThamMuu != null)
            ThoiGianThamMuu = (DateTime)thoiGianThamMuu;

        if (!string.IsNullOrEmpty(nguoiTuDanhGia))
            NguoiTuDanhGia = nguoiTuDanhGia;
        if (!string.IsNullOrEmpty(nguoiTuDanhGiaId))
            NguoiTuDanhGiaId = nguoiTuDanhGiaId;
        if (!string.IsNullOrEmpty(nguoiThamMuu))
            NguoiThamMuu = nguoiThamMuu;
        if (!string.IsNullOrEmpty(nguoiThamMuuId))
            NguoiThamMuuId = nguoiThamMuuId;

        if (!string.IsNullOrEmpty(nguoiDanhGia))
            NguoiDanhGia = nguoiDanhGia;
        if (!string.IsNullOrEmpty(nguoiDanhGiaId))
            NguoiDanhGiaId = nguoiDanhGiaId;

        if (!string.IsNullOrEmpty(nguoiDangXuLyId) && !NguoiDangXuLyId.Equals(nguoiDangXuLyId))
            NguoiDangXuLyId = nguoiDangXuLyId;
        if (buocHienTaiId != null)
            BuocHienTaiId = buocHienTaiId;
        if (buocTruocId != null)
            BuocTruocId = buocTruocId;

        if (isKySoDonVi.HasValue) IsKySoDonVi = isKySoDonVi;
        if (isKySoThamMuu.HasValue) IsKySoThamMuu = isKySoThamMuu;
        if (isKySoLanhDao.HasValue) IsKySoLanhDao = isKySoLanhDao;

        if (resetUrlPhieu == true)
        {
            UrlPdf = string.Empty;
            UrlDocx = string.Empty;
        }

        return this;
    }

    public DanhGiaDonVi UpdateUrlPhieu(string? urlPdf, string? urlDocx, bool? isKySoDonVi, bool? isKySoThamMuu, bool? isKySoLanhDao)
    {
        if (!string.IsNullOrEmpty(urlPdf))
            UrlPdf = urlPdf;

        if (!string.IsNullOrEmpty(urlDocx))
            UrlDocx = urlDocx;

        if (isKySoDonVi.HasValue) IsKySoDonVi = isKySoDonVi;
        if (isKySoThamMuu.HasValue) IsKySoThamMuu = isKySoThamMuu;
        if (isKySoLanhDao.HasValue) IsKySoLanhDao = isKySoLanhDao;

        return this;
    }

    public DanhGiaDonVi ChuyenBuoc(DefaultIdType buocHienTaiId, DefaultIdType? buocTruocId)
    {
        if (buocHienTaiId != Guid.Empty && BuocHienTaiId.Equals(buocHienTaiId) is not true) BuocHienTaiId = buocHienTaiId;
        if (buocTruocId != Guid.Empty && BuocTruocId.Equals(buocTruocId) is not true) BuocTruocId = buocTruocId;
        return this;
    }

    public DanhGiaDonVi XoaDiemLanhDaoCham(string? loaiDiem, string? nguoiThamMuu)
    {
        if (loaiDiem == "ThamMuu")
        {
            DiemThamMuu = null;
            PhanLoaiThamMuu = null;
            YKienThamMuu = null;
            NguoiThamMuu = null;
            NguoiThamMuuId = null;
            FileDinhKemTM = null;
            DaXem = "0";

        }

        if (loaiDiem == "DanhGia")
        {
            DiemLanhDaoDanhGia = null;
            PhanLoaiLanhDaoDanhGia = null;
            YKienLanhDao = null;
            NguoiDanhGia = null;
            NguoiDanhGiaId = null;
            FileDinhKemDG = null;
            if (!string.IsNullOrEmpty(nguoiThamMuu))
            {
                DaXem = "2";
            }
            else
            {
                DaXem = "0";
            }
        }

        return this;
    }

    public DanhGiaDonVi DuyetPhieuNhanXet(string? loaiDiem, string? idUser)
    {
        var ngayHT = DateTime.Now;
        if (loaiDiem == "ThamMuu")
        {
            TrangThai = "Chờ đánh giá";
            ThoiGianThamMuu = ngayHT;
        }

        if (loaiDiem == "DanhGia")
        {
            TrangThai = "Đã đánh giá";
            ThoiGianDanhGia = ngayHT;
        }

        LastModifiedOn = ngayHT;
        LastModifiedBy = Guid.Parse(idUser);
        return this;
    }


    public DanhGiaDonVi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public DanhGiaDonVi Restore()
    {
        DeletedOn = null;
        return this;
    }
}
