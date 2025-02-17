using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.NetworkInformation;

namespace TD.DanhGiaCanBo.Domain.Business;
public class KhoTieuChi : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string MaTieuChi { get; private set; }
    [MaxLength(1000)]
    public string TenTieuChi { get; private set; }
    public bool SuDung { get; private set; }
    public bool? DiemTru { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(10)]
    public string? ThangDiem { get; private set; }
    public string? GhiChu { get; private set; }
    public bool? DiemThuong { get; private set; }
    public bool? DiemLiet { get; private set; }
    public bool? DuocChamNhieuLan { get; private set; }
    public bool? KiemNhiem { get; private set; }
    [MaxLength(50)]
    public string? DonViTinh { get; private set; }
    public int? SoLan { get; private set; }

    public string? LoaiDiem { get; private set; }
    public string? FullCode { get; private set; }
    public string? ParrentCode { get; private set; }
    public string? ParrentName { get; private set; }
    public string? JsonLienKet { get; private set; }
    public string? JsonDiemLiet { get; private set; }
    public bool? TieuChiLienKet { get; private set; }
    public string?   STT { get; set; }
    public int? ThuTu { get; set; }

    public KhoTieuChi() { }

    public KhoTieuChi(string matieuchi, string tentieuchi, bool sudung, bool? diemTru, string thangdiem, string ghichu, bool? diemthuong, bool? diemliet, bool? duocchamnhieulan, bool? kiemnhiem, string donvitinh, int? solan,int? thuTu)
    {
        MaTieuChi = matieuchi;
        TenTieuChi = tentieuchi;
        SuDung = sudung;
        DiemTru = diemTru;
        ThangDiem = thangdiem;
        GhiChu = ghichu;
        DiemThuong = diemthuong;
        DiemLiet = diemliet;
        DuocChamNhieuLan = duocchamnhieulan;
        KiemNhiem = kiemnhiem;
        DonViTinh = donvitinh;
        SoLan = solan;
        ThuTu = thuTu;
    }

    public KhoTieuChi(string maTieuChi, string tenTieuChi, bool suDung, bool? diemTru, string thangDiem, string ghiChu, bool? diemThuong, bool? diemLiet, bool? duocChamNhieuLan, bool? kiemNhiem, string donViTinh, int? soLan, string? loaiDiem, string? fullCode, string? parrentCode, string? parrentName, string? jsonLienKet, string? jsonDiemLiet, bool? tieuChiLienKet,string stt, int? thuTu)
    {
        MaTieuChi = maTieuChi;
        TenTieuChi = tenTieuChi;
        SuDung = suDung;
        DiemTru = diemTru;
        ThangDiem = thangDiem;
        GhiChu = ghiChu;
        DiemThuong = diemThuong;
        DiemLiet = diemLiet;
        DuocChamNhieuLan = duocChamNhieuLan;
        KiemNhiem = kiemNhiem;
        DonViTinh = donViTinh;
        SoLan = soLan;
        LoaiDiem = loaiDiem;
        FullCode = fullCode;
        ParrentCode = parrentCode;
        ParrentName = parrentName;
        JsonLienKet = jsonLienKet;
        JsonDiemLiet = jsonDiemLiet;
        TieuChiLienKet = tieuChiLienKet;
        STT = stt;
        ThuTu = thuTu;
    }

    public static KhoTieuChi Create(string matieuchi, string tentieuchi, bool sudung, bool? diemTru, string thangdiem, string ghichu, bool? diemthuong, bool? diemliet, bool? duocchamnhieulan, bool? kiemnhiem, string donvitinh, int? solan,string loaiDiem,string fullCode,string parrentCode,string parrentName , string jsonLienKet, string jsonDiemLiet,bool? tieuChiLienKet,string stt, int? thuTu)
    {
        return new(matieuchi, tentieuchi, sudung, diemTru, thangdiem, ghichu, diemthuong, diemliet, duocchamnhieulan, kiemnhiem, donvitinh, solan,loaiDiem,fullCode,parrentCode,parrentName,jsonLienKet,jsonDiemLiet,tieuChiLienKet,stt,thuTu);
    }
    public KhoTieuChi Update(string matieuchi, string tentieuchi, bool sudung, bool? diemTru, string thangdiem, string ghichu, bool? diemthuong, bool? diemliet, bool? duocchamnhieulan, bool? kiemnhiem, string donvitinh, int? solan, string loaiDiem, string fullCode, string parrentCode, string parrentName, string jsonLienKet, string jsonDiemLiet,bool? tieuChiLienKet,string stt,int? thuTu)
    {

        if (!string.IsNullOrEmpty(matieuchi) && !MaTieuChi.Equals(matieuchi))
            MaTieuChi = matieuchi;
        if (!string.IsNullOrEmpty(tentieuchi) && !TenTieuChi.Equals(tentieuchi))
            TenTieuChi = tentieuchi;
        if (sudung != null)
            SuDung = sudung;
        if (diemTru != null)
            DiemTru = (bool)diemTru;
        if (diemthuong != null)
            DiemThuong = (bool)diemthuong;
        if (diemliet != null)
            DiemLiet = (bool)diemliet;
        if (duocchamnhieulan != null)
            DuocChamNhieuLan = (bool)duocchamnhieulan;
        if (kiemnhiem != null)
            KiemNhiem = (bool)kiemnhiem;

        if (!string.IsNullOrEmpty(thangdiem))
            ThangDiem = thangdiem;
        if (!string.IsNullOrEmpty(ghichu))
            GhiChu = ghichu;
        if (!string.IsNullOrEmpty(donvitinh))
            DonViTinh = donvitinh;
        if (solan != null)
            SoLan = (int)solan;
        if (!string.IsNullOrEmpty(loaiDiem))
            LoaiDiem = loaiDiem;
        if (!string.IsNullOrEmpty(fullCode))
            FullCode = fullCode;
        if (!string.IsNullOrEmpty(parrentCode))
            ParrentCode = parrentCode;
        if (!string.IsNullOrEmpty(parrentName))
            ParrentName = thangdiem;
        if (!string.IsNullOrEmpty(jsonLienKet))
            JsonDiemLiet = jsonLienKet;
        if (!string.IsNullOrEmpty(jsonDiemLiet))
            JsonDiemLiet = jsonDiemLiet;
        if (tieuChiLienKet != null)
            TieuChiLienKet = (bool)tieuChiLienKet;

        if (!string.IsNullOrEmpty(stt))
            STT = stt;
            ThuTu = thuTu;
        return this;
    }
    public KhoTieuChi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public KhoTieuChi Restore()
    {
        DeletedOn = null;
        return this;
    }
}
