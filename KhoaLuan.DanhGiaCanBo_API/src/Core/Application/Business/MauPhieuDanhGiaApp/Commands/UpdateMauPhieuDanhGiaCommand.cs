using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Commands;
public sealed class UpdateMauPhieuDanhGiaCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? LevelBoTieuChi { get; set; }
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public int? DiemDatYeuCau { get; set; }
    public int? DiemThuong { get; set; }
    public int? DiemTru { get; set; }
    public string? XepLoai { get; set; }
    public string? MaCapDanhGia { get; set; }
    public string? CapDanhGia { get; set; }
    public string? MaDonViDanhGia { get; set; }
    public string? DonViDanhGia { get; set; }

    public string? MaChucVuDanhGia { get; set; }

    public string? TenChucVuDanhGia { get; set; }

    public string? MaChucDanhDanhGia { get; set; }

    public string? TenChucDanhDanhGia { get; set; }

    public string? MaCaNhanDanhGia { get; set; }
    public string? CaNhanDanhGia { get; set; }
    public string? MaBoTieuChi { get; set; }
    public string? MauImportDanhGia { get; set; }
    public string? DataTieuChi { get; set; }
    public string? DinhKem { get; set; }
    public int? ThuTu { get; set; }
    public bool? SuDung { get; set; }
}
