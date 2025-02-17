
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp;

public class ChiTietDanhGiaDonVi2Dto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public Guid Id { get; set; }
    public string TenChiTietDanhGiaDonVi { get; set; }
    public Guid? ParentId { get; set; }
    public int ThuTuChiTietDanhGiaDonVi { get; set; }
    public string IconName { get; set; }
    public string Module { get; set; }
    public string FullPath { get; set; }
    public string? Permission { get; set; }
    public bool? IsTopChiTietDanhGiaDonVi { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}

public class ChiTietDanhGiaDonViDto
{
    public DefaultIdType? Id { get; set; }
    public string? TenMauPhieu { get; set; }
    public string? MaMauPhieu { get; set; }
    public string? MaPhieu { get; set; }

    public string? ScorePoint { get; set; }


    [MaxLength(50)]
    public string? ChiTietDiemLanhDaoDanhGia { get;set; }
    [MaxLength(50)]
    public string? ChiTietDiemTuDanhGia { get;set; }
    [MaxLength(50)]
    public string? ChiTietDiemThamMuu { get;set; }
    [MaxLength(50)]
    public string? ChiTietDiemDanhGia { get;set; }

    public string? DataTuDanhGia { get;set; }
    public string? DataThamMuu { get;set; }
    public string? DataDanhGia { get; set; }
    public string? DataLanhDaoDanhGia { get;set; }
    public double? DiemDanhGia { get;set; }
    public double? DiemTuDanhGia { get;set; }
    public double? DiemThamMuu { get;set; }
    public double? DiemLanhDaoDanhGia { get;set; }
    public bool? HasDiemLietTuDanhGia { get;set; }
    public bool? HasDiemLietThamMuu { get;set; }
    public bool? HasDiemLietLanhDaoDanhGia { get;set; }
    public int? ThuTu { get;set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}