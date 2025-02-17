using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;
public class TieuChiDanhGia : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaTieuChi { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(1000)]
    public string MaDayDu { get; set; }
    [MaxLength(400)]
    public string? TenTieuChi { get; private set; }
    public bool SuDung { get; private set; }
    public bool? DiemTru { get; private set; }
    public int? ThuTu { get; private set; }
    public int? ThuTuHienThi { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(10)]
    public string? ThangDiem { get; private set; }
    public string? GhiChu { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaMauPhieuDanhGia { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaDonVi { get; private set; }
    public bool? DiemThuong { get; private set; }
    public bool? DiemLiet { get; private set; }
    public bool? TieuChiLienKet { get; private set; }
    public bool? DuocChamNhieuLan { get; private set; }
    public bool? KiemNhiem { get; private set; }
    [MaxLength(10)]
    public string? STT { get; private set; }
    [MaxLength(50)]
    public string? DonViTinh { get; private set; }
    public string? JsonLienKet { get; private set; }
    public string? JsonDiemLiet { get; private set; }
    public int? SoLan { get; private set; }

    [Column(TypeName = "VARCHAR")]
    [MaxLength(1000)]
    public string? MaKhoTieuChi { get; private set; }

    public TieuChiDanhGia() { }

    public TieuChiDanhGia(string matieuchi, string madaydu, string tentieuchi, bool sudung, bool? diemTru, int? thuTu, int? thuTuHienThi, string thangdiem, string ghichu, string mamauphieudanhgia, string madonvi, bool? diemthuong, bool? diemliet,
        bool? tieuchilienket, bool? duocchamnhieulan, bool? kiemnhiem, string stt, string donvitinh, string jsonlienket, string jsondiemliet, int? solan, string? makhotieuchi)
    {

        MaTieuChi = matieuchi;
        MaDayDu = madaydu;
        TenTieuChi = tentieuchi;
        SuDung = sudung;
        DiemTru = diemTru;
        ThuTu = thuTu;
        ThuTuHienThi = thuTuHienThi;
        ThangDiem = thangdiem;
        GhiChu = ghichu;
        MaMauPhieuDanhGia = mamauphieudanhgia;
        MaDonVi = madonvi;
        DiemThuong = diemthuong;
        DiemLiet = diemliet;
        TieuChiLienKet = tieuchilienket;
        DuocChamNhieuLan = duocchamnhieulan;
        KiemNhiem = kiemnhiem;
        STT = stt;
        DonViTinh = donvitinh;
        JsonLienKet = jsonlienket;
        JsonDiemLiet = jsondiemliet;
        SoLan = solan;
        MaKhoTieuChi = makhotieuchi;

    }

    public static TieuChiDanhGia Create(string matieuchi, string madaydu, string tentieuchi, bool sudung, bool? diemTru, int? thuTu, int? thuTuHienThi, string thangdiem, string ghichu, string mamauphieudanhgia, string madonvi, bool? diemthuong, bool? diemliet,
        bool? tieuchilienket, bool? duocchamnhieulan, bool? kiemnhiem, string stt, string donvitinh, string jsonlienket, string jsondiemliet, int? solan, string? makhotieuchi)
    {
        return new(matieuchi, madaydu, tentieuchi, sudung, diemTru, thuTu, thuTuHienThi, thangdiem, ghichu, mamauphieudanhgia, madonvi, diemthuong, diemliet,
        tieuchilienket, duocchamnhieulan, kiemnhiem, stt, donvitinh, jsonlienket, jsondiemliet, solan, makhotieuchi);
    }
    public TieuChiDanhGia UpdateThuTu(int? thuTu)
    {
        if (thuTu != null)
            ThuTu = (int)thuTu;
        return this;
    }
    public TieuChiDanhGia UpdateThangDiem(string thangdiem)
    {
        if (!string.IsNullOrEmpty(thangdiem) && !MaTieuChi.Equals(thangdiem))
            ThangDiem = thangdiem;
        return this;
    }
    public TieuChiDanhGia UpdateXoaTieuChi(bool sudung)
    {
        if (sudung != null)
            SuDung = sudung;
        return this;
    }

    public TieuChiDanhGia Update(string matieuchi, string madaydu, string tentieuchi, bool sudung, bool? diemTru, int? thuTu, int? thuTuHienThi, string thangdiem, string ghichu, string mamauphieudanhgia, string madonvi, bool? diemthuong, bool? diemliet,
        bool? tieuchilienket, bool? duocchamnhieulan, bool? kiemnhiem, string stt, string donvitinh, string jsonlienket, string jsondiemliet, int? solan, string? makhotieuchi)
    {
        if (!string.IsNullOrEmpty(matieuchi) && !MaTieuChi.Equals(matieuchi))
            MaTieuChi = matieuchi;
        if (!string.IsNullOrEmpty(madaydu) && !MaDayDu.Equals(madaydu))
            MaDayDu = madaydu;
        if (!string.IsNullOrEmpty(tentieuchi) && !TenTieuChi.Equals(tentieuchi))
            TenTieuChi = tentieuchi;
        if (sudung != null)
            SuDung = sudung;
        if (diemTru != null)
            DiemTru = (bool)diemTru;
        if (thuTu != null)
            ThuTu = (int)thuTu;
        if (thuTuHienThi != null)
            ThuTuHienThi = (int)thuTuHienThi;
        if (diemthuong != null)
            DiemThuong = (bool)diemthuong;
        if (diemliet != null)
            DiemLiet = (bool)diemliet;
        if (tieuchilienket != null)
            TieuChiLienKet = (bool)tieuchilienket;
        if (duocchamnhieulan != null)
            DuocChamNhieuLan = (bool)duocchamnhieulan;
        if (kiemnhiem != null)
            KiemNhiem = (bool)kiemnhiem;

        if (!string.IsNullOrEmpty(thangdiem))
            ThangDiem = thangdiem;
        if (!string.IsNullOrEmpty(ghichu))
            GhiChu = ghichu;

        if (!string.IsNullOrEmpty(mamauphieudanhgia))
            MaMauPhieuDanhGia = mamauphieudanhgia;
        if (!string.IsNullOrEmpty(madonvi) && !MaDonVi.Equals(madonvi))
            MaDonVi = madonvi;


        if (!string.IsNullOrEmpty(ghichu))
            GhiChu = ghichu;
        if (!string.IsNullOrEmpty(donvitinh))
            DonViTinh = donvitinh;


        if (!string.IsNullOrEmpty(stt))
            STT = stt;

        if (!string.IsNullOrEmpty(jsonlienket))
            JsonLienKet = jsonlienket;
        if (!string.IsNullOrEmpty(jsondiemliet))
            JsonDiemLiet = jsondiemliet;
        if (!string.IsNullOrEmpty(makhotieuchi) )
            MaKhoTieuChi = makhotieuchi;
        if (solan != null)
            SoLan = (int)solan;


        return this;
    }

    public TieuChiDanhGia SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public TieuChiDanhGia Restore()
    {
        DeletedOn = null;
        return this;
    }
}
