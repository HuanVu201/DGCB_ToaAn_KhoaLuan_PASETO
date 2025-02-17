using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Domain.Business;
public class BuocXuLyNhomNguoiDung : BaseEntity, IAggregateRoot
{
    public DefaultIdType BuocXuLyId { get; private set; }
    public DefaultIdType NhomNguoiDungId { get; private set; }
    public BuocXuLy BuocXuLy { get; private set; }
    public NhomNguoiDung NhomNguoiDung { get; private set; }
    public BuocXuLyNhomNguoiDung() { }
    public BuocXuLyNhomNguoiDung(DefaultIdType buocXuLyId, DefaultIdType nhomNguoiDungId)
    {
        BuocXuLyId = buocXuLyId;
        NhomNguoiDungId = nhomNguoiDungId;
    }
    public BuocXuLyNhomNguoiDung SetNhomNguoiDungId(DefaultIdType nhomNguoiDungId)
    {
        NhomNguoiDungId = nhomNguoiDungId;
        return this;
    }
}
