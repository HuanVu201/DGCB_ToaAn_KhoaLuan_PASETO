using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace TD.DanhGiaCanBo.Domain.Business;
public class DanhGia : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string? MaPhieu { get; set; }
    [MaxLength(20)]
    public string? LoaiDanhGia { get; set; }//Đơn vị, cá nhân
    [MaxLength(50)]
    public string? ChiTietDiemDanhGia { get; set; }
    [MaxLength(255)]
    public string? HoVaTen { get; set; }
    [MaxLength(255)]
    public string? TaiKhoan { get; set; }
    [MaxLength(255)]
    public string? MaNguoiDung { get; set; }
    [MaxLength(255)]
    public string? ChucVu { get; set; }
    [MaxLength(255)]
    public string? ChucDanh { get; set; }
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
    public string? PhanLoaiLanhDaoDanhGia { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiTuDanhGia { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiDanhGia { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiNhanXet { get; set; }
    public double? DiemDanhGia { get; set; }
    public double? DiemTuDanhGia { get; set; }
    public double? DiemNhanXet { get; set; }
    public double? DiemThamMuu { get; set; }
    public double? DiemLanhDaoDanhGia { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiThamMuu { get; set; }
    public int? NamDanhGia { get; set; }

    public DateTime? ThoiGianTao { get; set; }
    public DateTime? ThoiGianNhanXet { get; set; }
    public DateTime? ThoiGianDanhGia { get; set; }
    public DateTime? ThoiGianHDDanhGia { get; set; }
    public DateTime? ThoiGianThamMuu { get; set; }
    public int? TruongDonVi { get; set; }
    public bool? SuDung { get; set; }
    [MaxLength(255)]
    public string? MaDonViCha { get; set; }
    [MaxLength(3000)]
    public string? LyDoThayDoiXepLoai { get; set; }
    [MaxLength(3000)]
    public string? YKienLanhDao { get; set; }
    [MaxLength(3000)]
    public string? YKienTuDanhGia { get; set; }
    [MaxLength(3000)]
    public string? YKienNhanXet { get; set; }
    [MaxLength(3000)]
    public string? YKienThamMuu { get; set; }
    [MaxLength(3000)]
    public string? YKienDanhGia { get; set; }
    public string? FileDinhKem { get; set; }
    public string? FileDinhKemNX { get; set; }
    public string? FileDinhKemTM { get; set; }
    public string? FileDinhKemDG { get; set; }
    public bool? KhongDanhGia { get; set; }
    public bool? KiemNhiem { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string? Phone { get; set; }
    [MaxLength(255)]
    public string? Email { get; set; }
    [MaxLength(255)]
    public string? NguoiTaoUser { get; set; }
    [MaxLength(255)]
    public string? NguoiSuaUser { get; set; }
    public DateTime? NgaySuaUser { get; set; }
    public DateTime? NgayTaoUser { get; set; }
    public string? MaBoTieuChuan { get; set; }
    [MaxLength(200)]
    public string? TenBoTieuChuan { get; set; }
    public int? ThuTu { get; set; }
    [MaxLength(1500)]
    public string? TenMauPhieuDanhGia { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(200)]
    public string? MaMauPhieuDanhGia { get; set; }
    [MaxLength(100)]
    public string? NguoiTuDanhGia { get; set; }
    [MaxLength(50)]
    public string? NguoiTuDanhGiaId { get; set; }
    [MaxLength(100)]
    public string? NguoiNhanXet { get; set; }
    [MaxLength(50)]
    public string? NguoiNhanXetId { get; set; }
    [MaxLength(100)]
    public string? NguoiThamMuu { get; set; }
    [MaxLength(50)]
    public string? NguoiThamMuuId { get; set; }
    [MaxLength(100)]
    public string? NguoiDanhGia { get; set; }
    [MaxLength(50)]
    public string? NguoiDanhGiaId { get; set; }
    [MaxLength(1)]
    public string? ThamQuyenXepLoai { get; set; }
    public DefaultIdType? BuocHienTaiId { get; set; }
    public DefaultIdType? BuocTruocId { get; set; }
    public BuocXuLy? BuocHienTai { get; set; }
    public BuocXuLy? BuocTruoc { get; set; }
    [Column(TypeName = "varchar")]
    [MaxLength(36)]
    public string? NguoiDangXuLyId { get; set; }
    //UpdateDanhGia
    [Column(TypeName = "VARCHAR")]
    [MaxLength(1)]
    public string? DaXem { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaHoSo { get; set; }
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
    public bool? IsKySoCaNhan { get; set; }
    public bool? IsKySoNhanXet { get; set; }
    public bool? IsKySoThamMuu { get; set; }
    public bool? IsKySoLanhDao { get; set; }
    [MaxLength(255)]
    public string? MaDonViFull { get; set; }

    public DanhGia()
    {
        KhongDanhGia = false;
        KiemNhiem = false;
    }

    public DanhGia(string? maPhieu, string? loaiDanhGia, string? chiTietDiemDanhGia, string? hoVaTen, string? taiKhoan, string? maNguoiDung, string? chucVu, string? chucDanh,
        string? tenPhongBan, string? maPhongBan, string? tenDonVi, string? maDonVi, string? trangThai, string? phanLoaiLanhDaoDanhGia, string? phanLoaiTuDanhGia, string? phanLoaiDanhGia, string? phanloaiNhanXet,
        double? diemDanhGia, double? diemTuDanhGia, double? diemNhanXet, double? diemThamMuu, double? diemLanhDaoDanhGia, string? phanLoaiThamMuu, int? namDanhGia,
        DateTime? thoiGianTao, DateTime? thoiGianNhanXet, DateTime? thoiGianDanhGia, DateTime? thoiGianHDDanhGia, DateTime? thoiGianThamMuu,
        int? truongDonVi, bool? suDung, string? maDonViCha, string? lyDoThayDoiXepLoai, string? yKienLanhDao, string? yKienTuDanhGia, string? yKienNhanXet, string? yKienThamMuu, string? yKienDanhGia,
        string? fileDinhKem, string? fileDinhKemNX, string? fileDinhKemTM, string? fileDinhKemDG, bool? khongDanhGia, bool? kiemNhiem, string? phone, string? email,
        string? nguoiTaoUser, string? nguoiSuaUser, DateTime? ngaySuaUser, DateTime? ngayTaoUser, int? thuTu,
        string? tenMauPhieuDanhGia, string? maMauPhieuDanhGia, string? nguoiTuDanhGia, string? nguoiTuDanhGiaId, string? nguoiNhanXet, string? nguoiNhanXetId, string? nguoiThamMuu, string? nguoiThamMuuId,
        string? nguoiDanhGia, string? nguoiDanhGiaId, string? thamQuyenXepLoai, DefaultIdType? buocHienTaiId, DefaultIdType? buocTruocId, string? nguoiDangXuLyId, string? daXem, string? maHoSo, int? thoiGianQuery,
        string? loaiThoiGian, string? thoiGian, string? maBoTieuChuan, string? tenBoTieuChuan, string? danhSachPhanLoaiDanhGia, string? quyTrinhXuLyId, string? urlPdf, string? urlDocx,
        bool? isKySoCaNhan, bool? isKySoNhanXet, bool? isKySoThamMuu, bool? isKySoLanhDao, string? maDonViFull)
    {
        MaPhieu = maPhieu;
        LoaiDanhGia = loaiDanhGia;
        ChiTietDiemDanhGia = chiTietDiemDanhGia;
        HoVaTen = hoVaTen;
        TaiKhoan = taiKhoan;
        MaNguoiDung = maNguoiDung;
        ChucVu = chucVu;
        ChucDanh = chucDanh;
        TenPhongBan = tenPhongBan;
        MaPhongBan = maPhongBan;
        TenDonVi = tenDonVi;
        MaDonVi = maDonVi;
        TrangThai = trangThai;
        PhanLoaiLanhDaoDanhGia = phanLoaiLanhDaoDanhGia;
        PhanLoaiTuDanhGia = phanLoaiTuDanhGia;
        PhanLoaiDanhGia = phanLoaiDanhGia;
        PhanLoaiNhanXet = phanloaiNhanXet;
        DiemDanhGia = diemDanhGia;
        DiemTuDanhGia = diemTuDanhGia;
        DiemNhanXet = diemNhanXet;
        DiemThamMuu = diemThamMuu;
        DiemLanhDaoDanhGia = diemLanhDaoDanhGia;
        PhanLoaiThamMuu = phanLoaiThamMuu;
        NamDanhGia = namDanhGia;
        DaXem = daXem;
        MaHoSo = maHoSo;
        ThoiGianTao = thoiGianTao;
        ThoiGianNhanXet = thoiGianNhanXet;
        ThoiGianDanhGia = thoiGianDanhGia;
        ThoiGianHDDanhGia = thoiGianHDDanhGia;
        ThoiGianThamMuu = thoiGianThamMuu;
        ThoiGianQuery = thoiGianQuery;
        TruongDonVi = truongDonVi;
        SuDung = suDung;
        MaDonViCha = maDonViCha;
        LyDoThayDoiXepLoai = lyDoThayDoiXepLoai;
        YKienLanhDao = yKienLanhDao;
        YKienTuDanhGia = yKienTuDanhGia;
        YKienNhanXet = yKienNhanXet;
        YKienThamMuu = yKienThamMuu;
        YKienDanhGia = yKienDanhGia;
        FileDinhKem = fileDinhKem;
        FileDinhKemNX = fileDinhKemNX;
        FileDinhKemTM = fileDinhKemTM;
        FileDinhKemDG = fileDinhKemDG;
        KhongDanhGia = khongDanhGia;
        KiemNhiem = kiemNhiem;
        Phone = phone;
        Email = email;
        NguoiTaoUser = nguoiTaoUser;
        NguoiSuaUser = nguoiSuaUser;
        NgaySuaUser = ngaySuaUser;
        NgayTaoUser = ngayTaoUser;
        ThuTu = thuTu;
        LoaiDanhGia = loaiDanhGia;
        ThoiGian = thoiGian;
        TenMauPhieuDanhGia = tenMauPhieuDanhGia;
        MaMauPhieuDanhGia = maMauPhieuDanhGia;
        NguoiTuDanhGia = nguoiTuDanhGia;
        NguoiTuDanhGiaId = nguoiTuDanhGiaId;
        NguoiNhanXet = nguoiNhanXet;
        NguoiNhanXetId = nguoiNhanXetId;
        NguoiThamMuu = nguoiThamMuu;
        NguoiThamMuuId = nguoiThamMuuId;
        NguoiDanhGia = nguoiDanhGia;
        NguoiDanhGiaId = nguoiDanhGiaId;
        ThamQuyenXepLoai = thamQuyenXepLoai;
        BuocHienTaiId = buocHienTaiId;
        BuocTruocId = buocTruocId;
        NguoiDangXuLyId = nguoiDangXuLyId;
        LoaiThoiGian = loaiThoiGian;
        MaBoTieuChuan = maBoTieuChuan;
        TenBoTieuChuan = tenBoTieuChuan;
        DanhSachPhanLoaiDanhGia = danhSachPhanLoaiDanhGia;
        QuyTrinhXuLyId = quyTrinhXuLyId;
        UrlPdf = urlPdf;
        UrlDocx = urlDocx;
        IsKySoCaNhan = isKySoCaNhan;
        IsKySoNhanXet = isKySoNhanXet;
        IsKySoThamMuu = isKySoThamMuu;
        IsKySoLanhDao = isKySoLanhDao;
        MaDonViFull = maDonViFull;
    }

    public static DanhGia Create(string? maPhieu, string? loaiDanhGia, string? chiTietDiemDanhGia, string? hoVaTen, string? taiKhoan, string? maNguoiDung, string? chucVu, string? chucDanh,
        string? tenPhongBan, string? maPhongBan, string? tenDonVi, string? maDonVi, string? trangThai, string? phanLoaiLanhDaoDanhGia, string? phanLoaiTuDanhGia, string? phanLoaiDanhGia, string? phanloaiNhanXet,
        double? diemDanhGia, double? diemTuDanhGia, double? diemNhanXet, double? diemThamMuu, double? diemLanhDaoDanhGia, string? phanLoaiThamMuu, int? namDanhGia,
        DateTime? thoiGianTao, DateTime? thoiGianNhanXet, DateTime? thoiGianDanhGia, DateTime? thoiGianHDDanhGia, DateTime? thoiGianThamMuu,
        int? truongDonVi, bool? suDung, string? maDonViCha, string? lyDoThayDoiXepLoai, string? yKienLanhDao, string? yKienTuDanhGia, string? yKienNhanXet, string? yKienThamMuu, string? yKienDanhGia,
        string? fileDinhKem, string? fileDinhKemNX, string? fileDinhKemTM, string? fileDinhKemDG, bool? khongDanhGia, bool? kiemNhiem, string? phone, string? email,
        string? nguoiTaoUser, string? nguoiSuaUser, DateTime? ngaySuaUser, DateTime? ngayTaoUser, int? thuTu,
        string? tenMauPhieuDanhGia, string? maMauPhieuDanhGia, string? nguoiTuDanhGia, string? nguoiTuDanhGiaId, string? nguoiNhanXet, string? nguoiNhanXetId, string? nguoiThamMuu, string? nguoiThamMuuId,
        string? nguoiDanhGia, string? nguoiDanhGiaId, string? thamQuyenXepLoai, DefaultIdType? buocHienTaiId, DefaultIdType? buocTruocId, string? nguoiDangXuLyId, string? daXem, string? maHoSo, int? thoiGianQuery,
        string? loaiThoiGian, string? thoiGian, string? maBoTieuChuan, string? tenBoTieuChuan, string? danhSachPhanLoaiDanhGia, string? quyTrinhXuLyId, string? urlPdf, string? urlDocx,
        bool? isKySoCaNhan, bool? isKySoNhanXet, bool? isKySoThamMuu, bool? isKySoLanhDao, string? maDonViFull)
    {
        return new(maPhieu, loaiDanhGia, chiTietDiemDanhGia, hoVaTen, taiKhoan, maNguoiDung, chucVu, chucDanh,
        tenPhongBan, maPhongBan, tenDonVi, maDonVi, trangThai, phanLoaiLanhDaoDanhGia, phanLoaiTuDanhGia, phanLoaiDanhGia, phanloaiNhanXet,
        diemDanhGia, diemTuDanhGia, diemNhanXet, diemThamMuu, diemLanhDaoDanhGia, phanLoaiThamMuu, namDanhGia,
        thoiGianTao, thoiGianNhanXet, thoiGianDanhGia, thoiGianHDDanhGia, thoiGianThamMuu,
        truongDonVi, suDung, maDonViCha, lyDoThayDoiXepLoai, yKienLanhDao, yKienTuDanhGia, yKienNhanXet, yKienThamMuu, yKienDanhGia,
        fileDinhKem, fileDinhKemNX, fileDinhKemTM, fileDinhKemDG, khongDanhGia, kiemNhiem, phone, email,
        nguoiTaoUser, nguoiSuaUser, ngaySuaUser, ngayTaoUser, thuTu,
        tenMauPhieuDanhGia, maMauPhieuDanhGia, nguoiTuDanhGia, nguoiTuDanhGiaId, nguoiNhanXet, nguoiNhanXetId, nguoiThamMuu, nguoiThamMuuId,
        nguoiDanhGia, nguoiDanhGiaId, thamQuyenXepLoai, buocHienTaiId, buocTruocId, nguoiDangXuLyId, daXem, maHoSo, thoiGianQuery, loaiThoiGian,
        thoiGian, maBoTieuChuan, tenBoTieuChuan, danhSachPhanLoaiDanhGia, quyTrinhXuLyId, urlPdf, urlDocx, isKySoCaNhan, isKySoNhanXet, isKySoThamMuu, isKySoLanhDao, maDonViFull);
    }

    public DanhGia Update(string? maPhieu, string? loaiDanhGia, string? chiTietDiemDanhGia, string? hoVaTen, string? taiKhoan, string? maNguoiDung, string? chucVu, string? chucDanh,
        string? tenPhongBan, string? maPhongBan, string? tenDonVi, string? maDonVi, string? trangThai, string? phanLoaiLanhDaoDanhGia, string? phanLoaiTuDanhGia, string? phanLoaiDanhGia, string? phanloaiNhanXet,
        double? diemDanhGia, double? diemTuDanhGia, double? diemNhanXet, double? diemThamMuu, double? diemLanhDaoDanhGia, string? phanLoaiThamMuu, int? namDanhGia,
        DateTime? thoiGianTao, DateTime? thoiGianNhanXet, DateTime? thoiGianDanhGia, DateTime? thoiGianHDDanhGia, DateTime? thoiGianThamMuu,
        int? truongDonVi, bool? suDung, string? maDonViCha, string? lyDoThayDoiXepLoai, string? yKienLanhDao, string? yKienTuDanhGia, string? yKienNhanXet, string? yKienThamMuu, string? yKienDanhGia,
        string? fileDinhKem, string? fileDinhKemNX, string? fileDinhKemTM, string? fileDinhKemDG, bool? khongDanhGia, bool? kiemNhiem, string? phone, string? email,
        string? nguoiTaoUser, string? nguoiSuaUser, DateTime? ngaySuaUser, DateTime? ngayTaoUser, int? thuTu,
        string? tenMauPhieuDanhGia, string? maMauPhieuDanhGia, string? nguoiTuDanhGia, string? nguoiTuDanhGiaId, string? nguoiNhanXet, string? nguoiNhanXetId, string? nguoiThamMuu, string? nguoiThamMuuId,
        string? nguoiDanhGia, string? nguoiDanhGiaId, string? thamQuyenXepLoai, DefaultIdType? buocHienTaiId, DefaultIdType? buocTruocId, string? nguoiDangXuLyId, string? daXem,
        string? maHoSo, int? thoiGianQuery, string? loaiThoiGian, string? thoiGian, string? maBoTieuChuan, string? quyTrinhXuLyId, string? urlPdf, string? urlDocx, bool? isKySoCaNhan, bool? isKySoNhanXet, bool? isKySoThamMuu, bool? isKySoLanhDao, bool? resetUrlPhieu, string? maDonViFull)
    {
        if (!string.IsNullOrEmpty(nguoiDangXuLyId) && !NguoiDangXuLyId.Equals(nguoiDangXuLyId))
            NguoiDangXuLyId = nguoiDangXuLyId;
        if (buocHienTaiId != null)
            BuocHienTaiId = buocHienTaiId;
        if (buocTruocId != null)
            BuocTruocId = buocTruocId;

        if (!string.IsNullOrEmpty(maPhieu))
            MaPhieu = maPhieu;
        if (!string.IsNullOrEmpty(loaiDanhGia))
            LoaiDanhGia = loaiDanhGia;
        if (!string.IsNullOrEmpty(chiTietDiemDanhGia))
            ChiTietDiemDanhGia = chiTietDiemDanhGia;
        if (!string.IsNullOrEmpty(hoVaTen))
            HoVaTen = hoVaTen;
        if (!string.IsNullOrEmpty(taiKhoan))
            TaiKhoan = taiKhoan;
        if (!string.IsNullOrEmpty(maNguoiDung))
            MaNguoiDung = maNguoiDung;
        if (!string.IsNullOrEmpty(chucVu))
            ChucVu = chucVu;
        if (!string.IsNullOrEmpty(chucDanh))
            ChucDanh = chucDanh;
        if (!string.IsNullOrEmpty(tenPhongBan))
            TenPhongBan = tenPhongBan;
        if (!string.IsNullOrEmpty(maPhongBan))
            MaPhongBan = maPhongBan;
        if (!string.IsNullOrEmpty(tenDonVi))
            TenDonVi = tenDonVi;
        if (!string.IsNullOrEmpty(maDonVi))
            MaDonVi = maDonVi;
        if (!string.IsNullOrEmpty(maDonViFull))
            MaDonViFull = maDonViFull;
        
        if (!string.IsNullOrEmpty(trangThai))
            TrangThai = trangThai;
        if (!string.IsNullOrEmpty(phanLoaiLanhDaoDanhGia))
            PhanLoaiLanhDaoDanhGia = phanLoaiLanhDaoDanhGia;
        if (!string.IsNullOrEmpty(phanLoaiTuDanhGia))
            PhanLoaiTuDanhGia = phanLoaiTuDanhGia;
        if (!string.IsNullOrEmpty(phanLoaiDanhGia))
            PhanLoaiDanhGia = phanLoaiDanhGia;
        if (!string.IsNullOrEmpty(phanloaiNhanXet))
            PhanLoaiNhanXet = phanloaiNhanXet;
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
        if (!string.IsNullOrEmpty(phanLoaiThamMuu))
            PhanLoaiThamMuu = phanLoaiThamMuu;
        if (namDanhGia.HasValue)
            NamDanhGia = namDanhGia;
        if (!string.IsNullOrEmpty(maHoSo))
            MaHoSo = maHoSo;
        if (!string.IsNullOrEmpty(daXem))
            DaXem = daXem;
        if (thoiGianTao != null)
            ThoiGianTao = (DateTime)thoiGianTao;
        if (thoiGianNhanXet != null)
            ThoiGianNhanXet = (DateTime)thoiGianNhanXet;
        if (thoiGianDanhGia != null)
            ThoiGianDanhGia = (DateTime)thoiGianDanhGia;
        if (thoiGianHDDanhGia != null)
            ThoiGianHDDanhGia = (DateTime)thoiGianHDDanhGia;
        if (thoiGianThamMuu != null)
            ThoiGianThamMuu = (DateTime)thoiGianThamMuu;
        if (!string.IsNullOrEmpty(loaiThoiGian))
            LoaiThoiGian = loaiThoiGian;
        if (truongDonVi != null)
            TruongDonVi = (int)truongDonVi;
        if (suDung.HasValue)
            SuDung = suDung;
        if (!string.IsNullOrEmpty(maDonViCha))
            MaDonViCha = maDonViCha;
        if (!string.IsNullOrEmpty(lyDoThayDoiXepLoai))
            LyDoThayDoiXepLoai = lyDoThayDoiXepLoai;
        if (!string.IsNullOrEmpty(yKienLanhDao))
            YKienLanhDao = yKienLanhDao;
        if (!string.IsNullOrEmpty(yKienTuDanhGia))
            YKienTuDanhGia = yKienTuDanhGia;
        if (!string.IsNullOrEmpty(yKienNhanXet))
            YKienNhanXet = yKienNhanXet;
        if (!string.IsNullOrEmpty(yKienThamMuu))
            YKienThamMuu = yKienThamMuu;
        if (!string.IsNullOrEmpty(yKienDanhGia))
            YKienDanhGia = yKienDanhGia;
        if (!string.IsNullOrEmpty(fileDinhKem))
            FileDinhKem = fileDinhKem;
        if (!string.IsNullOrEmpty(fileDinhKemNX))
            FileDinhKemNX = fileDinhKemNX;
        if (!string.IsNullOrEmpty(fileDinhKemTM))
            FileDinhKemTM = fileDinhKemTM;
        if (!string.IsNullOrEmpty(fileDinhKemDG))
            FileDinhKemDG = fileDinhKemDG;
        if (khongDanhGia != null)
            KhongDanhGia = (bool)khongDanhGia;
        if (kiemNhiem != null)
            KiemNhiem = (bool)kiemNhiem;
        if (!string.IsNullOrEmpty(phone))
            Phone = phone;
        if (!string.IsNullOrEmpty(email))
            Email = email;
        if (!string.IsNullOrEmpty(nguoiTaoUser))
            NguoiTaoUser = nguoiTaoUser;
        if (!string.IsNullOrEmpty(nguoiSuaUser))
            NguoiSuaUser = nguoiSuaUser;
        if (ngaySuaUser != null)
            NgaySuaUser = (DateTime)ngaySuaUser;
        if (ngayTaoUser != null)
            NgayTaoUser = (DateTime)ngayTaoUser;
        if (thuTu != null)
            ThuTu = (int)thuTu;
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

        if (!string.IsNullOrEmpty(nguoiTuDanhGia))
            NguoiTuDanhGia = nguoiTuDanhGia;
        if (!string.IsNullOrEmpty(nguoiTuDanhGiaId))
            NguoiTuDanhGiaId = nguoiTuDanhGiaId;

        if (!string.IsNullOrEmpty(nguoiNhanXet))
            NguoiNhanXet = nguoiNhanXet;
        if (!string.IsNullOrEmpty(nguoiNhanXetId))
            NguoiNhanXetId = nguoiNhanXetId;

        if (!string.IsNullOrEmpty(nguoiThamMuu))
            NguoiThamMuu = nguoiThamMuu;
        if (!string.IsNullOrEmpty(nguoiThamMuuId))
            NguoiThamMuuId = nguoiThamMuuId;

        if (!string.IsNullOrEmpty(nguoiDanhGia))
            NguoiDanhGia = nguoiDanhGia;
        if (!string.IsNullOrEmpty(nguoiDanhGiaId))
            NguoiDanhGiaId = nguoiDanhGiaId;

        if (!string.IsNullOrEmpty(thamQuyenXepLoai))
            ThamQuyenXepLoai = thamQuyenXepLoai;

        if (!string.IsNullOrEmpty(quyTrinhXuLyId))
            QuyTrinhXuLyId = quyTrinhXuLyId;

        if (!string.IsNullOrEmpty(urlPdf))
            UrlPdf = urlPdf;

        if (!string.IsNullOrEmpty(urlDocx))
            UrlDocx = urlDocx;

        if (isKySoCaNhan.HasValue) IsKySoCaNhan = isKySoCaNhan;
        if (isKySoNhanXet.HasValue) IsKySoNhanXet = isKySoNhanXet;
        if (isKySoThamMuu.HasValue) IsKySoThamMuu = isKySoThamMuu;
        if (isKySoLanhDao.HasValue) IsKySoLanhDao = isKySoLanhDao;

        if (resetUrlPhieu == true)
        {
            UrlPdf = string.Empty;
            UrlDocx = string.Empty;
        }

        return this;
    }

    public DanhGia UpdateUrlPhieu(string? urlPdf, string? urlDocx, bool? isKySoCaNhan, bool? isKySoNhanXet, bool? isKySoThamMuu, bool? isKySoLanhDao)
    {
        if (!string.IsNullOrEmpty(urlPdf))
            UrlPdf = urlPdf;

        if (!string.IsNullOrEmpty(urlDocx))
            UrlDocx = urlDocx;

        if (isKySoCaNhan.HasValue) IsKySoCaNhan = isKySoCaNhan;
        if (isKySoNhanXet.HasValue) IsKySoNhanXet = isKySoNhanXet;
        if (isKySoThamMuu.HasValue) IsKySoThamMuu = isKySoThamMuu;
        if (isKySoLanhDao.HasValue) IsKySoLanhDao = isKySoLanhDao;


        return this;
    }

    public DanhGia ChuyenBuoc(DefaultIdType buocHienTaiId, DefaultIdType? buocTruocId)
    {
        if (buocHienTaiId != Guid.Empty && BuocHienTaiId.Equals(buocHienTaiId) is not true) BuocHienTaiId = buocHienTaiId;
        if (buocTruocId != Guid.Empty && BuocTruocId.Equals(buocTruocId) is not true) BuocTruocId = buocTruocId;
        return this;
    }

    public DanhGia XoaDiemLanhDaoCham(string? loaiDiem, string? nguoiNhanXet, string? nguoiThamMuu)
    {
        if (loaiDiem == "NhanXet")
        {
            DiemNhanXet = null;
            PhanLoaiNhanXet = null;
            YKienNhanXet = null;
            NguoiNhanXet = null;
            FileDinhKemNX = null;
            NguoiNhanXetId = null;
            DaXem = "0";
        }

        if (loaiDiem == "ThamMuu")
        {
            DiemThamMuu = null;
            PhanLoaiThamMuu = null;
            YKienThamMuu = null;
            NguoiThamMuu = null;
            NguoiThamMuuId = null;
            FileDinhKemTM = null;
            if (!string.IsNullOrEmpty(nguoiNhanXet))
            {
                DaXem = "1";
            }
            else
            {
                DaXem = "0";
            }
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
            else if (!string.IsNullOrEmpty(nguoiNhanXet))
            {
                DaXem = "1";
            }
            else
            {
                DaXem = "0";
            }
        }

        return this;
    }

    public DanhGia DuyetPhieuNhanXet(string? loaiDiem, string? nguoiNhanXet, string? idUser)
    {
        var ngayHT = DateTime.Now;

        if (loaiDiem == "NhanXet")
        {

            TrangThai = "Chờ đánh giá";
            ThoiGianNhanXet = ngayHT;
        }

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

    public DanhGia SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public DanhGia Restore()
    {
        DeletedOn = null;
        return this;
    }
}
