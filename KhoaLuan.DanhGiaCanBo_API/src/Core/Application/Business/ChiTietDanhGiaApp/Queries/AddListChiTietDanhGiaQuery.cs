using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Queries;
public class AddListChiTietDanhGiaQuery : IQuery<string>
{
    public List<ItemChiTietDanhGia>? Data { get; set; }
}

public class ItemChiTietDanhGia
{
    public string? TenMauPhieu { get; set; }
    public string? MaMauPhieu { get; set; }
    public string? MaPhieu { get; set; }
    public string? ChiTietDiemLanhDaoDanhGia { get; set; }
    public string? ChiTietDiemTuDanhGia { get; set; }
    public string? ChiTietDiemThamMuu { get; set; }
    public string? ChiTietDiemNhanXet { get; set; }
    public string? ChiTietDiemDanhGia { get; set; }
    public string? DataTuDanhGia { get; set; }
    public string? DataNhanXet { get; set; }
    public string? DataThamMuu { get; set; }
    public string? DataLanhDaoDanhGia { get; set; }
    public double? DiemDanhGia { get; set; }
    public double? DiemTuDanhGia { get; set; }
    public double? DiemNhanXet { get; set; }
    public double? DiemThamMuu { get; set; }
    public double? DiemLanhDaoDanhGia { get; set; }
    public int? ThuTu { get; set; }
    public string? ScorePoint { get; set; }
    public bool? HasDiemLietTuDanhGia { get; set; }
    public bool? HasDiemLietNhanXet { get; set; }
    public bool? HasDiemLietThamMuu { get; set; }
    public bool? HasDiemLietLanhDaoDanhGia { get; set; }
    public string? DataKhieuNai { get; set; }
    public string? DataXuLyKhieuNai { get; set; }
    public int? SoLuongKhieuNai { get; set; }
}