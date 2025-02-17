using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.HoSoCongTacDanhGiaApp;
public class HoSoCongTacDanhGiaDto : IDto
{
    public Guid Id { get; set; }
    public string? TenHoSo { get; set; }
    public string? TenDonVi { get; set; }
    public string? MaDonVi { get; set; }
    public string? LoaiThoiGian { get; set; }
    public string? LoaiKetQua { get; set; } // CaNhan / DonVi
    public string? MaNguoiDanhGia { get; set; }
    public string? NguoiDanhGia { get; set; }
    public string? MaDonViTongHop { get; set; }
    public string? DonViTongHop { get; set; }
    public string? ThoiGian { get; set; }
    public string? NamDanhGia { get; set; }
    public string? FileDinhKem { get; set; }
    public DateTime? CreatedOn { get; set; }
    public DateTime? LastModifiedOn { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
