using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;
public class AddDanhGiaDonViCommand : ICommand<Guid>
{
    public string? MaPhieu { get; set; } = Guid.NewGuid().ToString();
    public string? ChiTietDiemDanhGia { get; set; }
    public string? TenPhongBan { get; set; }
    public string? MaPhongBan { get; set; }
    public string? TenDonVi { get; set; }
    public string? MaDonVi { get; set; }
    public string? TrangThai { get; set; }
    public string? PhanLoaiTuDanhGia { get; set; }
    public string? PhanLoaiDanhGia { get; set; }
    public double? DiemDanhGia { get; set; }
    public double? DiemTuDanhGia { get; set; }
    public int NamDanhGia { get; set; }
    public DateTime? ThoiGianTao { get; set; }
    public DateTime? ThoiGianDanhGia { get; set; }
    public bool SuDung { get; set; }
    public string? MaDonViCha { get; set; }
    public string? YKienTuDanhGia { get; set; }
    public string? YKienDanhGia { get; set; }
    public string? FileDinhKem { get; set; }
    public string? FileDinhKemDG { get; set; }
    public string? TenMauPhieuDanhGia { get; set; }
    public string? MaMauPhieuDanhGia { get; set; }
    public string? DaXem { get; set; } = "0";
    public int? ThoiGianQuery { get; set; }
    public string? LoaiThoiGian { get; set; }
    public string? ThoiGian { get; set; }
    public string? MaBoTieuChuan { get; set; }
    public string? TenBoTieuChuan { get; set; }
    public string? DanhSachPhanLoaiDanhGia { get; set; }
    public bool? LaNguoiDaXuLy { get; set; } = false;
    public string TenThaoTacVetXuLy { get; set; } = string.Empty;
    public string? QuyTrinhXuLyId { get; set; } = string.Empty;
    public string? UrlPdf { get; set; } = string.Empty;
    public string? UrlDocx { get; set; } = string.Empty;
    //Update
    public double? DiemThamMuu { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiThamMuu { get; set; }
    public DateTime? ThoiGianThamMuu { get; set; }
    [MaxLength(100)]
    public string? NguoiTuDanhGia { get; set; }
    [MaxLength(50)]
    public string? NguoiTuDanhGiaId { get; set; }
    [MaxLength(100)]
    public string? NguoiThamMuu { get; set; }
    [MaxLength(50)]
    public string? NguoiThamMuuId { get; set; }
    [MaxLength(100)]
    public string? NguoiDanhGia { get; set; }
    [MaxLength(50)]
    public string? NguoiDanhGiaId { get; set; }
    public DefaultIdType? BuocHienTaiId { get; set; }
    public DefaultIdType? BuocTruocId { get; set; }
    [Column(TypeName = "varchar")]
    [MaxLength(36)]
    public string? NguoiDangXuLyId { get; set; }
    [MaxLength(3000)]
    public string? YKienLanhDao { get; set; }
    [MaxLength(3000)]
    public string? YKienThamMuu { get; set; }
    public string? FileDinhKemTM { get; set; }
    [MaxLength(70)]
    public string? PhanLoaiLanhDaoDanhGia { get; set; }
    public double? DiemLanhDaoDanhGia { get; set; }
    public bool? IsKySoDonVi { get; set; }
    public bool? IsKySoThamMuu { get; set; }
    public bool? IsKySoLanhDao { get; set; }
}
