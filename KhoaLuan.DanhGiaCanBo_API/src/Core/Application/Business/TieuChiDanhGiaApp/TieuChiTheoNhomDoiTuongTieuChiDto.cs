

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.ActionApp;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;


public class TieuChiTheoNhomDoiTuongTieuChiDto : IDto
{
    public Guid Id { get; set; }
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
    public List<TieuChiTheoNhomDoiTuongTieuChiDto> DanhSachTieuChiCon { get; set; }
    public int? ThuTu { get; set; }
}


