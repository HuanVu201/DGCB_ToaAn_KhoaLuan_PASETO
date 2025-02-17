using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

public class ItemThongKeBaoCaoDto : IDto
{
     public string HoTen { get; set; }
    public string ThuTuPB { get; set; }
    public string DiemTuDanhGia { get; set; }
    public string DiemNhanXet { get; set; }
    public string DiemDanhGia { get; set; }
    public string MaNguoiDung { get; set; }

    public string PhanLoaiDanhGia { get; set; }
    public string YKien { get; set; }
    public string TenDonVi { get; set; }
    public string TenPhongBan { get; set; }
    public string MaPhongBan { get; set; }
    public string MaDonVi { get; set; }
}
