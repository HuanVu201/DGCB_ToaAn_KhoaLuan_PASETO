

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.ActionApp;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;


public class TieuChiTheoMaNhomDoiTuongDto : IDto
{
    public DefaultIdType? Id { get; set; }
    public string MaBoTieuChi { get; set; }
    public string TenBoTieuChi { get; set; }
    public string LoaiThoiGian { get; set; }
    public string ThoiGian { get; set; }

    public List<PhanLoaiDanhGiaViewModel> DanhSachPhanLoaiDanhGia { get; set; }
    public List<NhomDoiTuongViewModel> DanhSachTieuChi { get; set; }
    public string CanhBao { get; set; }
}
public class PhanLoaiDanhGiaViewModel
{
    public DefaultIdType? Id { get; set; }
    public string Ma { get; set; }
    public string Ten { get; set; }
    public double DiemToiThieu { get; set; }
    public double DiemToiDa { get; set; }
    public string MaBoTieuChi { get; set; }
}
public class NhomDoiTuongViewModel
{
    public DefaultIdType? Id { get; set; }
    public string TenTieuChi { get; set; }
    public string MaTieuChi { get; set; }
    public string MaDayDu { get; set; }
    public string ThangDiem { get; set; }
    public string DiemDatYeuCau { get; set; }
    public string DiemThuong { get; set; }
    public string DiemTru { get; set; }
    public string KiemNhiem { get; set; }
    public string Level { get; set; }

    public List<TieuChiViewModel> DanhSachTieuChiCon { get; set; }
}
public class TieuChiViewModel
{
    public DefaultIdType? Id { get; set; }
    public string TenTieuChi { get; set; }
    public string MaTieuChi { get; set; }
    public string Level { get; set; }
    public string MaDayDu { get; set; }
    public string ThangDiem { get; set; }
    public string GhiChu { get; set; }
    public string CreatedBy { get; set; }
    public bool? DiemTru { get; set; }
    public string MaDonVi { get; set; }
    public bool? DiemThuong { get; set; }
    public bool? DiemLiet { get; set; }
    public bool? KiemNhiem { get; set; }
    public bool? TieuChiLienKet { get; set; }
    public bool? DuocChamNhieuLan { get; set; }
    public string STT { get; set; }
    public string JsonDiemLiet { get; set; }
    public string JsonLienKet { get; set; }
    public string DonViTinh { get; set; }
    public int? SoLan { get; set; }
    public List<TieuChiViewModel> DanhSachTieuChiCon { get; set; }
    public int? ThuTu { get; set; }
}


