using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Commands;
public class AddTieuChiDanhGiaCommand : ICommand<Guid>
{
    public string? MaTieuChi { get; set; }

    public string MaDayDu { get; set; }

    public string? TenTieuChi { get; set; }
    public bool SuDung { get; set; }
    public bool? DiemTru { get; set; }
    public int? ThuTu { get; set; }
    public int? ThuTuHienThi { get; set; }

    public string? ThangDiem { get; set; }
    public string? GhiChu { get; set; }

    public string? MaMauPhieuDanhGia { get; set; }

    public string? MaDonVi { get; set; }
    public bool? DiemThuong { get; set; }
    public bool? DiemLiet { get; set; }
    public bool? TieuChiLienKet { get; set; } = false;
    public bool? DuocChamNhieuLan { get; set; }
    public bool? KiemNhiem { get; set; }
    public string STT { get; set; }
    public string? DonViTinh { get; set; }
    public string? JsonLienKet { get; set; }
    public string? JsonDiemLiet { get; set; }
    public int? SoLan { get; set; }
    public string? MaKhoTieuChi { get; set; } = "";


    //public string? maTieuChi { get; private set; }

    //public string? maDayDu { get; private set; }

    //public string? tenTieuChi { get; private set; }
    //public bool suDung { get; private set; }
    //public bool? diemTru { get; private set; }
    //public int? thuTu { get; private set; }
    //public int? thuTuHienThi { get; private set; }

    //public string? thangDiem { get; private set; }
    //public string? ghiChu { get; private set; }

    //public string? maMauPhieuDanhGia { get; private set; }

    //public string? maDonVi { get; private set; }
    //public bool? diemThuong { get; private set; }
    //public bool? diemLiet { get; private set; }
    //public bool? tieuChiLienKet { get; private set; }
    //public bool? duocChamNhieuLan { get; private set; }
    //public bool? kiemNhiem { get; private set; }

    //public string? sTT { get; private set; }

    //public string? donViTinh { get; private set; }
    //public string? jsonLienKet { get; private set; }
    //public string? jsonDiemLiet { get; private set; }
    //public int? soLan { get; private set; }
    //public string? maKhoTieuChi { get; private set; }
}
