using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;
public class HoSoCongTacDanhGia : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string? DanhGiaId { get; set; }
    [MaxLength(1000)]
    public string? TenHoSo { get; set; }
    [MaxLength(500)]
    public string? TenDonVi { get; set; }
    [MaxLength(50)]
    public string? MaDonVi { get; set; }
    [MaxLength(2000)]
    public string? DKBanKiemDiem { get; set; } // DK: Đính kèm
    [MaxLength(2000)]
    public string? DKBanNhanXetCapUy { get; set; }
    [MaxLength(2000)]
    public string? DKBienBanHoiNghiKiemDiem { get; set; }
    [MaxLength(2000)]
    public string? DKKetQuaThamDinhCuaCoQuanThamMuu { get; set; }
    [MaxLength(2000)]
    public string? DKKetLuanDanhGiaXepLoai { get; set; }
    [MaxLength(2000)]
    public string? DKVanBanGoiYKiemDiem { get; set; }
    [MaxLength(2000)]
    public string? DKVanBanThamGiaGopY { get; set; }
    [MaxLength(2000)]
    public string? DKHoSoGiaiQuyetKhieuNaiKienNghi { get; set; }
    [MaxLength(2000)]
    public string? DKCacVanBanKhac { get; set; }

    public HoSoCongTacDanhGia() { }

    public HoSoCongTacDanhGia(string? danhGiaId, string? tenHoSo, string? tenDonVi, string? maDonVi, string? dkBanKiemDiem, string? dkBanNhanXetCapUy, string? dkBienBanHoiNghiKiemDiem, string? dkKetQuaThamDinhCuaCoQuanThamMuu, string? dkKetLuanDanhGiaXepLoai, string? dkVanBanGoiYKiemDiem, string? dkVanBanThamGiaGopY, string? dkHoSoGiaiQuyetKhieuNaiKienNghi, string? dkCacVanBanKhac)
    {
        DanhGiaId = danhGiaId;
        TenHoSo = tenHoSo;
        TenDonVi = tenDonVi;
        MaDonVi = maDonVi;
        DKBanKiemDiem = dkBanKiemDiem;
        DKBanNhanXetCapUy = dkBanNhanXetCapUy;
        DKBienBanHoiNghiKiemDiem = dkBienBanHoiNghiKiemDiem;
        DKKetQuaThamDinhCuaCoQuanThamMuu = dkKetQuaThamDinhCuaCoQuanThamMuu;
        DKKetLuanDanhGiaXepLoai = dkKetLuanDanhGiaXepLoai;
        DKVanBanGoiYKiemDiem = dkVanBanGoiYKiemDiem;
        DKVanBanThamGiaGopY = dkVanBanThamGiaGopY;
        DKHoSoGiaiQuyetKhieuNaiKienNghi = dkHoSoGiaiQuyetKhieuNaiKienNghi;
        DKCacVanBanKhac = dkCacVanBanKhac;
    }

    public static HoSoCongTacDanhGia Create(string? danhGiaId, string? tenHoSo, string? tenDonVi, string? maDonVi, string? dkBanKiemDiem, string? dkBanNhanXetCapUy, string? dkBienBanHoiNghiKiemDiem, string? dkKetQuaThamDinhCuaCoQuanThamMuu, string? dkKetLuanDanhGiaXepLoai, string? dkVanBanGoiYKiemDiem, string? dkVanBanThamGiaGopY, string? dkHoSoGiaiQuyetKhieuNaiKienNghi, string? dkCacVanBanKhac)
    {
        return new(danhGiaId, tenHoSo, tenDonVi, maDonVi, dkBanKiemDiem, dkBanNhanXetCapUy, dkBienBanHoiNghiKiemDiem, dkKetQuaThamDinhCuaCoQuanThamMuu, dkKetLuanDanhGiaXepLoai, dkVanBanGoiYKiemDiem, dkVanBanThamGiaGopY, dkHoSoGiaiQuyetKhieuNaiKienNghi, dkCacVanBanKhac);
    }

    public HoSoCongTacDanhGia Update(string? tenHoSo, string? tenDonVi, string? maDonVi, string? dkBanKiemDiem, string? dkBanNhanXetCapUy, string? dkBienBanHoiNghiKiemDiem, string? dkKetQuaThamDinhCuaCoQuanThamMuu, string? dkKetLuanDanhGiaXepLoai, string? dkVanBanGoiYKiemDiem, string? dkVanBanThamGiaGopY, string? dkHoSoGiaiQuyetKhieuNaiKienNghi, string? dkCacVanBanKhac)
    {
        if (!string.IsNullOrEmpty(tenHoSo)) TenHoSo = tenHoSo;
        if (!string.IsNullOrEmpty(tenDonVi)) TenDonVi = tenDonVi;
        if (!string.IsNullOrEmpty(maDonVi)) MaDonVi = maDonVi;
        if (!string.IsNullOrEmpty(dkBanKiemDiem)) DKBanKiemDiem = dkBanKiemDiem;
        if (!string.IsNullOrEmpty(dkBanNhanXetCapUy)) DKBanNhanXetCapUy = dkBanNhanXetCapUy;
        if (!string.IsNullOrEmpty(dkBienBanHoiNghiKiemDiem)) DKBienBanHoiNghiKiemDiem = dkBienBanHoiNghiKiemDiem;
        if (!string.IsNullOrEmpty(dkKetQuaThamDinhCuaCoQuanThamMuu)) DKKetQuaThamDinhCuaCoQuanThamMuu = dkKetQuaThamDinhCuaCoQuanThamMuu;
        if (!string.IsNullOrEmpty(dkKetLuanDanhGiaXepLoai)) DKKetLuanDanhGiaXepLoai = dkKetLuanDanhGiaXepLoai;
        if (!string.IsNullOrEmpty(dkVanBanGoiYKiemDiem)) DKVanBanGoiYKiemDiem = dkVanBanGoiYKiemDiem;
        if (!string.IsNullOrEmpty(dkVanBanThamGiaGopY)) DKVanBanThamGiaGopY = dkVanBanThamGiaGopY;
        if (!string.IsNullOrEmpty(dkHoSoGiaiQuyetKhieuNaiKienNghi)) DKHoSoGiaiQuyetKhieuNaiKienNghi = dkHoSoGiaiQuyetKhieuNaiKienNghi;
        if (!string.IsNullOrEmpty(dkCacVanBanKhac)) DKCacVanBanKhac = dkCacVanBanKhac;

        return this;
    }

    public HoSoCongTacDanhGia SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public HoSoCongTacDanhGia Restore()
    {
        DeletedOn = null;
        return this;
    }
}
