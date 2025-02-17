using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp;
public class KhieuNaiDanhGiaDto : IDto
{
    public Guid Id { get; set; }
    public string? LyDo { get; set; }
    public string? DinhKemKhieuNai { get; set; }
    public string? TrangThai { get; set; }
    public string? KetQua { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaDonViCha { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? LoaiThoiGian { get; set; }
    public string? ThoiGian { get; set; }
    public int NamDanhGia { get; set; }
    public string? HoVaTen { get; set; }
    public string? TenPhongBan { get; set; }
    public string? TenDonVi { get; set; }
    public string? ChucVu { get; set; }
    public string? DiemDanhGia { get; set; }
    public string? PhanLoaiDanhGia { get; set; }
    public DateTime? ThoiDiemTuDanhGia { get; set; }
    public string? MaPhieu { get; set; }
    public int? SoLuongKhieuNai { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
