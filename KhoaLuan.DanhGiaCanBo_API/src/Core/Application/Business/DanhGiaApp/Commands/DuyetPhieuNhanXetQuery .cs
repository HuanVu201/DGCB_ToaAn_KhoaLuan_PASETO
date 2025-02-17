using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class DuyetPhieuNhanXetQuery : IRequest<Result>
{
    public List<DefaultIdType> Ids { get; set; } = new List<DefaultIdType>();
    public string? LoaiDiem { get; set; } = string.Empty;
    public string? TenThaoTac { get; set; } = string.Empty;
}

public class IDanhGiaColumn
{
    public string? ID { get; set; }
    public string? TenTieuChi { get; set; }
    public string? MaTieuChi { get; set; }
    public string? Level { get; set; }
    public string? MaDayDu { get; set; }
    public double? ThangDiem { get; set; }
    public string? GhiChu { get; set; }
    public string? CreatedBy { get; set; }
    public bool? DiemTru { get; set; }
    public string? MaDonVi { get; set; }
    public bool? DiemThuong { get; set; }
    public bool? DiemLiet { get; set; }
    public bool? KiemNhiem { get; set; }
    public bool? TieuChiLienKet { get; set; }
    public bool? DuocChamNhieuLan { get; set; }
    public string? STT { get; set; }
    public string? JsonDiemLiet { get; set; }
    public string? JsonLienKet { get; set; }
    public string? SoLuong { get; set; }
    public string? DonViTinh { get; set; }
    public string? SoLan { get; set; }
    public string? ThuTu { get; set; }
    public List<IDanhGiaColumn> DanhSachTieuChiCon { get; set; }
    public double? DiemTuCham { get; set; }
    public double? DiemNhanXet { get; set; }
    public double? DiemThamMuu { get; set; }
    public double? DiemDanhGia { get; set; }
    public bool? isDisabled { get; set; }
    public bool? isDisabledNX { get; set; }
    public bool? isDisabledTM { get; set; }
    public bool? isDisabledDG { get; set; }
    public bool? isChecked { get; set; }
    public bool? isCheckedNX { get; set; }
    public bool? isCheckedTM { get; set; }
    public bool? isCheckedDG { get; set; }
    public bool? isGiaiTrinh { get; set; }
    public bool? isGiaiTrinhNX { get; set; }
    public bool? isGiaiTrinhTM { get; set; }
    public bool? isGiaiTrinhDG { get; set; }
    public string? NoiDungGiaiTrinh { get; set; }
    public string? NoiDungGiaiTrinhNX { get; set; }
    public string? NoiDungGiaiTrinhTM { get; set; }
    public string? NoiDungGiaiTrinhDG { get; set; }
    public string? DinhKem { get; set; }
    public string? DinhKemNX { get; set; }
    public string? DinhKemTM { get; set; }
    public string? DinhKemDG { get; set; }
}