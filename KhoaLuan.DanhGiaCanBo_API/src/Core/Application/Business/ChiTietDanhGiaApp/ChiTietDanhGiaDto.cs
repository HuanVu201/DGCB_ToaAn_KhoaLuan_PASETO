
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp;


public class ChiTietDanhGia2Dto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public Guid Id { get; set; }
    public string TenChiTietDanhGia { get; set; }
    public Guid? ParentId { get; set; }
    public int ThuTuChiTietDanhGia { get; set; }
    public string IconName { get; set; }
    public string Module { get; set; }
    public string FullPath { get; set; }
    public string? Permission { get; set; }
    public bool? IsTopChiTietDanhGia { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}

public class ChiTietDanhGiaDto
{
    public DefaultIdType? Id { get; set; }
    public string? TenMauPhieu { get; set; }
    public string? MaMauPhieu { get; set; }
    public string? ChiTietDiemTuDanhGia { get; set; }
    public string? ChiTietDiemLanhDaoDanhGia { get; set; }
    public string? ChiTietDiemThamMuu { get; set; }
    public string? ChiTietDiemNhanXet { get; set; }
    public string? ChiTietDiemDanhGia { get; set; }
    public string? DataTuDanhGia { get; set; }
    public string? DataNhanXet { get; set; }
    public string? DataThamMuu { get; set; }
    public string? DataLanhDaoDanhGia { get; set; }
    public string? DiemDanhGia { get; set; }
    public string? DiemTuDanhGia { get; set; }
    public string? DiemNhanXet { get; set; }
    public string? DiemThamMuu { get; set; }
    public string? DiemLanhDaoDanhGia { get; set; }
    public int? ThuTu { get; set; }
    public string? ScorePoint { get; set; }
    public bool? HasDiemLietTuDanhGia { get; set; }
    public bool? HasDiemLietNhanXet { get; set; }
    public bool? HasDiemLietThamMuu { get; set; }
    public bool? HasDiemLietLanhDaoDanhGia { get; set; }
    public string? DataKhieuNai { get; set; }
    public string? DataXuLyKhieuNai { get; set; }
    public int? SoLuongKhieuNai { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}