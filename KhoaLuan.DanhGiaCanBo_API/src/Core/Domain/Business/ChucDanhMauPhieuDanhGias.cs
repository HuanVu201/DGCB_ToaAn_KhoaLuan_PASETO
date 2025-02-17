namespace TD.DanhGiaCanBo.Domain.Business;
public class ChucDanhMauPhieuDanhGia : BaseEntity, IAggregateRoot
{
    public DefaultIdType ChucDanhId { get; private set; }
    public DefaultIdType MauPhieuDanhGiaId { get; private set; }

    public ChucDanh ChucDanh { get; set; }
    public MauPhieuDanhGia MauPhieuDanhGia { get; set; }

    public ChucDanhMauPhieuDanhGia() { }

    public ChucDanhMauPhieuDanhGia(DefaultIdType chucDanhId, DefaultIdType mauPhieuDanhGiaId)
    {
        ChucDanhId = chucDanhId;
        MauPhieuDanhGiaId = mauPhieuDanhGiaId;
    }
}
