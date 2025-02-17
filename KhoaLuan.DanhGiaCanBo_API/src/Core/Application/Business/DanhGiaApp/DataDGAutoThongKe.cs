

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

public class DataDGAutoThongKe : IDto
{
    public string? TenDonVi { get; set; }
    public string? MaDonVi { get; set; }
    public string? TenPhongBan { get; set; }
    public string? MaPhongBan { get; set; }
    public string? TrangThai { get; set; }
    public int? DiemDanhGia { get; set; }
    public string? PhanLoaiDanhGia { get; set; }
    public int? NamDanhGia { get; set; }
    public int? TruongDonVi { get; set; }
    public string? TenNhomDoiTuong { get; set; }
    public string? MaDonViCha { get; set; }
    public string? LoaiThoiGian { get; set; }
    public string? ThoiGian { get; set; }
    public int? ThoiGianQuery { get; set; }
    public bool? KhongDanhGia { get; set; }
    public string? TaiKhoan { get; set; }
    public string? YKienLanhDao { get; set; }
    public string? MaDonViFull { get; set; }
}
public class DataUserThongKe : IDto
{
    public string? MaDonVi { get; set; }
    public string? MaPhongBan { get; set; }
    public bool? KhongDanhGia { get; set; }
    public string? TaiKhoan { get; set; }
    public string? FullCode { get; set; }

}
