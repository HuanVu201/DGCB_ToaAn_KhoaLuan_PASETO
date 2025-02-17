using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing.Printing;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp;
public class MauPhieuDanhGiaDto : IDto
{
    public Guid Id { get; set; }
    public string? LevelBoTieuChi { get; private set; }
    public string? Ten { get; private set; }
    public string? Ma { get; private set; }
    public int? DiemDatYeuCau { get; private set; }
    public int? DiemThuong { get; private set; }
    public int? DiemTru { get; private set; }
    public string? XepLoai { get; private set; }
    public string? MaCapDanhGia { get; private set; }
    public string? CapDanhGia { get; private set; }
    public string? MaDonViDanhGia { get; private set; }
    public string? DonViDanhGia { get; private set; }

    public string? MaChucVuDanhGia { get; private set; }

    public string? TenChucVuDanhGia { get; private set; }

    public string? MaChucDanhDanhGia { get; private set; }

    public string? TenChucDanhDanhGia { get; private set; }

    public string? MaCaNhanDanhGia { get; private set; }

    public string? CaNhanDanhGia { get; private set; }
    public string? MaBoTieuChi { get; set; }
    public string? JsonDanhGia { get; set; }
    public string? DanhSachPhanLoaiDanhGia { get; set; }
    public bool SuDung { get; set; }
    public string? LoaiThoiGian { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
