using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;
public class KhieuNaiDanhGia : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [Column(TypeName = "VARCHAR")]
    [MaxLength(50)]
    public string? MaPhieu { get; set; }
    [MaxLength(2000)]
    public string? LyDo { get; set; }
    [MaxLength(500)]
    public string? DinhKemKhieuNai { get; set; }
    [MaxLength(30)]
    public string? TrangThai { get; set; }
    [MaxLength(50)]
    public string? MaDonVi { get; set; }
    [MaxLength(50)]
    public string? MaDonViCha { get; set; }
    [MaxLength(1000)]
    public string? KetQua { get; set; }
    [MaxLength(500)]
    public string? DinhKemKetQua { get; set; }
    public DateTime? ThoiGianCapNhat { get; set; }
    [MaxLength(50)]
    public string? NguoiCapNhatKQId { get; set; }
    public int? SoLuongKhieuNai { get; set; }

    public KhieuNaiDanhGia() { }

    public KhieuNaiDanhGia(string? maPhieu, string? lyDo, string? dinhKemKhieuNai, string? trangThai, string? maDonVi, string? maDonViCha, string? ketQua, string? dinhKemKetQua, DateTime? thoiGianCapNhat, string? nguoiCapNhatKQId, int? soLuongKhieuNai)
    {
        MaPhieu = maPhieu;
        LyDo = lyDo;
        DinhKemKhieuNai = dinhKemKhieuNai;
        TrangThai = trangThai;
        MaDonVi = maDonVi;
        MaDonViCha = maDonViCha;
        KetQua = ketQua;
        DinhKemKetQua = dinhKemKetQua;
        ThoiGianCapNhat = thoiGianCapNhat;
        NguoiCapNhatKQId = nguoiCapNhatKQId;
        SoLuongKhieuNai = soLuongKhieuNai;
    }

    public static KhieuNaiDanhGia Create(string? maPhieu, string? lyDo, string? dinhKemKhieuNai, string? trangThai, string? maDonVi, string? maDonViCha, string? ketQua, string? dinhKemKetQua, DateTime? thoiGianCapNhat, string? nguoiCapNhatKQId, int? soLuongKhieuNai)
    {
        return new(maPhieu, lyDo, dinhKemKhieuNai, trangThai, maDonVi, maDonViCha, ketQua, dinhKemKetQua, thoiGianCapNhat, nguoiCapNhatKQId, soLuongKhieuNai);

    }

    public KhieuNaiDanhGia Update(string? maPhieu, string? lyDo, string? dinhKemKhieuNai, string? trangThai, string? maDonVi, string? maDonViCha, string? ketQua, string? dinhKemKetQua, DateTime? thoiGianCapNhat, string? nguoiCapNhatKQId, int? soLuongKhieuNai)
    {
        if (soLuongKhieuNai.HasValue) SoLuongKhieuNai = (int)soLuongKhieuNai;
        if (!string.IsNullOrEmpty(maPhieu)) MaPhieu = maPhieu;
        if (!string.IsNullOrEmpty(lyDo)) LyDo = lyDo;
        if (!string.IsNullOrEmpty(dinhKemKhieuNai)) DinhKemKhieuNai = dinhKemKhieuNai;
        if (!string.IsNullOrEmpty(trangThai)) TrangThai = trangThai;
        if (!string.IsNullOrEmpty(maDonVi)) MaDonVi = maDonVi;
        if (!string.IsNullOrEmpty(maDonViCha)) MaDonViCha = maDonViCha;
        if (!string.IsNullOrEmpty(ketQua)) KetQua = ketQua;
        if (!string.IsNullOrEmpty(dinhKemKetQua)) DinhKemKetQua = dinhKemKetQua;
        if (thoiGianCapNhat != null) ThoiGianCapNhat = thoiGianCapNhat;
        if (!string.IsNullOrEmpty(dinhKemKetQua)) NguoiCapNhatKQId = nguoiCapNhatKQId;
        return this;
    }

    public KhieuNaiDanhGia SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public KhieuNaiDanhGia Restore()
    {
        DeletedOn = null;
        return this;
    }
}
