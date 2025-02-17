

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Business.DuLieuThongKeApp;


public class DuLIeuThongKeDto : IDto
{
    public Guid Id { get; set; }
    public string? LoaiThongKe { get; set; }
    [MaxLength(100)]
    public string? TenDonVi { get; set; }
    [MaxLength(50)]
    public string? MaDonVi { get; set; }
    [MaxLength(15)]
    public string? LoaiThoiGian { get; set; }
    [MaxLength(15)]
    public string? ThoiGian { get; set; }
    public int? NamDanhGia { get; set; }
    public DateTime? ThoiGianTao { get; set; }
    public int? DanhGiaLoaiA { get; set; }
    public int? DanhGiaLoaiB { get; set; }
    public int? DanhGiaLoaiC { get; set; }
    public int? DanhGiaLoaiD { get; set; }
    public int? TongSoCanBo { get; set; }
    public int? TongSoKhongDanhGia { get; set; }
    public int? TongSoTuDanhGia { get; set; }
    public int? TongSoDaXepLoai { get; set; }
    public int? TongSoCongViec { get; set; }
    public int? CongViecChuaHoanThanh { get; set; }
    public int? CongViecDangXuLy { get; set; }
    public int? CongViecDaHoanThanh { get; set; }
    public int? KhenThuongDeXuat { get; set; }
    public int? KhenThuong { get; set; }
    public int? ThoiGianQuery { get; set; }
    public string? Category { get; set; }
}
