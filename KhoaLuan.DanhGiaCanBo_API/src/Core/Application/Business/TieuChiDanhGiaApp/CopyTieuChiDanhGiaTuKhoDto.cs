

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.ActionApp;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;


public class CopyTieuChiDanhGiaTuKhoDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string MaTieuChi { get; set; }
    public string MaTieuChiNew { get; set; }
    public string MaKhoTieuChi { get; set; }
    public string FullCodeNew { get; set; }
    public string TenTieuChi { get; set; }
    public bool SuDung { get; set; }
    public bool DiemTru { get; set; }
    public string ThangDiem { get; set; }
    public string GhiChu { get; set; }
    public bool DiemThuong { get; set; }
    public bool DiemLiet { get; set; }
    public bool DuocChamNhieuLan { get; set; }
    public bool KiemNhiem { get; set; }
    public string DonViTinh { get; set; }
    public int SoLan { get; set; }
    public string FullCode { get; set; }
    public string JsonDiemLiet { get; set; }
    public string JsonLienKet { get; set; }
    public string LoaiDiem { get; set; }
    public string ParrentCode { get; set; }
    public string ParrentName { get; set; }
    public bool TieuChiLienKet { get; set; }
    public string STT { get; set; }
    public int ThuTu { get; set; }

    [JsonIgnore] 
    public int TotalCount { get; set; }
}

public class JsonDiemLietItem
{
    public string Ma { get; set; }
    public string Ten { get; set; }
    public string TenCha { get; set; }
    public string DSTCCon { get; set; } // Là chuỗi JSON chứa danh sách con nếu có
}