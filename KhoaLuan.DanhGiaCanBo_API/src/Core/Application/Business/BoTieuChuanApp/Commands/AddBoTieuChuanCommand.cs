using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Commands;
public class AddBoTieuChuanCommand : ICommand<Guid>
{

    public string? MaBoTieuChi { get; set; }
    [MaxLength(200)]
    public string? TenBoTieuChi { get; set; }
    public bool SuDung { get; set; }
    public string? DinhKem { get; set; }
    public string? SoKyHieu { get; set; }
    public string? NgayBanHanh { get; set; }
    public string? CoQuanBanHanh { get; set; }
    public string? LoaiThoiGian { get; set; }
    public string? ThoiGian { get; set; }
    public string? DonVi { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public int? CauHinhThoiGianGiaHan { get; set; }
    public string? MaCapDanhGia { get; set; }
    public string? CapDanhGia { get; set; }
    public string? MaDonViDanhGia { get; set; }
    public string? DonViDanhGia { get; set; }
    public bool? LaDonVi { get; set; }
}
