using TD.DanhGiaCanBo.Domain.Business;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;
public class ChiTietBuocXuLy : IDto
{
    public DefaultIdType Id { get; set; }
    public string TenBuoc { get; set; }
    public string TenTrangThai { get; set; }
    public DefaultIdType QuyTrinhXuLyId { get; set; }
    public DefaultIdType TrangThaiDanhGiaId { get; set; }
    public bool KhongCoChucDanh { get; set; }
    public bool KhongCoChucVu { get; set; }
    public string? Error { get; set; }
    public ChiTietBuocXuLy(string? error)
    {
        Error = error;
    }
    public ChiTietBuocXuLy() { }
    public ChiTietBuocXuLy(DefaultIdType id, string tenBuoc, string tenTrangThai, DefaultIdType quyTrinhXuLyId, DefaultIdType trangThaiDanhGiaId, bool khongCoChucDanh, bool khongCoChucVu)
    {
        Id = id;
        TenBuoc = tenBuoc;
        TenTrangThai = tenTrangThai;
        QuyTrinhXuLyId = quyTrinhXuLyId;
        TrangThaiDanhGiaId = trangThaiDanhGiaId;
        KhongCoChucDanh = khongCoChucDanh;
        KhongCoChucVu = khongCoChucVu;
    }
}
