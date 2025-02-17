

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.ActionApp;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;


public class TieuChiDanhGiaNooTreeDto : IDto
{
    [MaxLength(100)]
    public string? MaTieuChi { get; set; }
    public string? MaDayDu { get; set; }
    [MaxLength(400)]
    public string? TenTieuChi { get;  set; }
    public bool SuDung { get;  set; }
    public bool? DiemTru { get;  set; }
    public int? ThuTu { get;  set; }
    public int? ThuTuHienThi { get;  set; }

    public string? ThangDiem { get;  set; }
    public string? GhiChu { get;  set; }

    public string? MaMauPhieuDanhGia { get;  set; }

    public string? MaDonVi { get;  set; }
    public bool? DiemThuong { get;  set; }
    public bool? DiemLiet { get;  set; }
    public bool? TieuChiLienKet { get;  set; }
    public bool? DuocChamNhieuLan { get;  set; }
    public bool? KiemNhiem { get;  set; }
    [MaxLength(10)]
    public string? STT { get;  set; }
    [MaxLength(50)]
    public string? DonViTinh { get;  set; }
    public string? JsonLienKet { get;  set; }
    public string? JsonDiemLiet { get;  set; }
    public int? SoLan { get;  set; }
    public int? ThangDiemOfMauPhieu { get; set; }
    public int? DiemDatYeuCauOfMauPhieu { get; set; }
    public int? DiemThuongOfMauPhieu { get; set; }
    public int? DiemTruOfMauPhieu { get; set; }
    public string? ParrentId { get;  set; }
    public int? DiemTuCham { get; set; }
    public int? DiemNhanXet { get; set; }
    public int? DiemThamMuu { get; set; }
    public int? DiemDanhGia { get; set; }
    public List<TieuChiDanhGiaNooTreeDto> DanhSachTieuChiCon { get; set; }
}
