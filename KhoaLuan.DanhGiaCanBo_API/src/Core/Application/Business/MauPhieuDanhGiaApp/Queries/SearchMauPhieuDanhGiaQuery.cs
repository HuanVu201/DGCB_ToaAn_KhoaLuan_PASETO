using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;
public class SearchMauPhieuDanhGiaQuery : PaginationFilter, IRequest<PaginationResponse<MauPhieuDanhGiaDto>>
{

    [MaxLength(1)]
    public string? LevelBoTieuChi { get; set; }
    public string? Ten { get; set; }
    public string? MaBoTieuChi { get; set; }
    public string? Ma { get; set; }
    public string? DiemDatYeuCau { get; set; }
    public string? DiemThuong { get; set; }
    public string? DiemTru { get; set; }
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
    public string? LoaiThoiGian { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 1000;
    public new int PageNumber { get; set; } = 1;
}
