using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;


public class UpdateTieuChiTheoDoiTuongQuery : IQuery<TieuChiDanhGia>
{

     public Guid Id { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaTieuChi { get; set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(1000)]
    public string MaDayDu { get; set; }
    [MaxLength(400)]
    public string? TenTieuChi { get; private set; }
    public bool SuDung { get; private set; }
    public bool? DiemTru { get; private set; }
    public int? ThuTu { get; private set; }
    public int? ThuTuHienThi { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(10)]
    public string? ThangDiem { get; private set; }
    public string? GhiChu { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaMauPhieuDanhGia { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaDonVi { get; private set; }
    public bool? DiemThuong { get; private set; }
    public bool? DiemLiet { get; private set; }
    public bool? TieuChiLienKet { get; private set; }
    public bool? DuocChamNhieuLan { get; private set; }
    public bool? KiemNhiem { get; private set; }
    [MaxLength(10)]
    public string? STT { get; private set; }
    [MaxLength(50)]
    public string? DonViTinh { get; private set; }
    public string? JsonLienKet { get; private set; }
    public string? JsonDiemLiet { get; private set; }
    public int? SoLan { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? MaKhoTieuChi { get; private set; }

}
