using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

public class DataPhieuTongHopCQDto : IDto
{
    public string HoVaTen { get; set; }
    public int? ThuTuPB { get; set; }
    public int? ThuTuND { get; set; }
    public string TaiKhoan { get; set; }
    public string ChucVu { get; set; }
    public string XepLoaiTuDG { get; set; }
    public string DiemDanhGia { get; set; }
    public string XepLoaiDG { get; set; }
    public string TruongDonVi { get; set; }
    public string LyDo { get; set; }
    public string TenDonVi { get; set; }
    public string TenPhongBan { get; set; }
    public string MaPhongBan { get; set; }
    public string MaDonVi { get; set; }
    public string MaNguoiDung { get; set; }
}
