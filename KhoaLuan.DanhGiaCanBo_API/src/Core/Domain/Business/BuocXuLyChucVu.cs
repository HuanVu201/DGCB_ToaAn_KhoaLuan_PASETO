namespace TD.DanhGiaCanBo.Domain.Business;
public class BuocXuLyChucVu : BaseEntity, IAggregateRoot
{
    public DefaultIdType ChucVuId { get; private set; }
    public DefaultIdType BuocXuLyId { get; private set; }
    public BuocXuLy BuocXuLy { get; private set; }
    public ChucVu ChucVu { get; private set; }
    public BuocXuLyChucVu() { }

    public BuocXuLyChucVu(DefaultIdType chucVuId, DefaultIdType buocXuLyId)
    {
        ChucVuId = chucVuId;
        BuocXuLyId = buocXuLyId;
    }

    public BuocXuLyChucVu SetChucVuId(DefaultIdType chucVuId)
    {
        ChucVuId = chucVuId;
        return this;
    }
}
