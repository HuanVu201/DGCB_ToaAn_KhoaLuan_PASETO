using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Commands;
public sealed class UpdateChiTietDanhGiaCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    [MaxLength(200)]
    public string? TenMauPhieu { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaMauPhieu { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaPhieu { get; set; }
    [MaxLength(50)]
    public string? ChiTietDiemLanhDaoDanhGia { get; set; }
    public string? ChiTietDiemTuDanhGia { get; set; }

    [MaxLength(50)]
    public string? ChiTietDiemThamMuu { get; set; }
    [MaxLength(50)]
    public string? ChiTietDiemNhanXet { get; set; }
    [MaxLength(50)]
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
    public bool? HasDiemLietTuDanhGia { get; set; }
    public bool? HasDiemLietNhanXet { get; set; }
    public bool? HasDiemLietThamMuu { get; set; }
    public bool? HasDiemLietLanhDaoDanhGia { get; set; }
    public string? DataKhieuNai { get; set; }
    public string? DataXuLyKhieuNai { get; set; }
    public int? SoLuongKhieuNai { get; set; }

}
