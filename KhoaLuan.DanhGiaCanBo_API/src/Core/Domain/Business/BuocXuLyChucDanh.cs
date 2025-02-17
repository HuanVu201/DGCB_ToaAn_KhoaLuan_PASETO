namespace TD.DanhGiaCanBo.Domain.Business;
public class BuocXuLyChucDanh : BaseEntity, IAggregateRoot
{
    public DefaultIdType ChucDanhId { get; private set; }
    public DefaultIdType BuocXuLyId { get; private set; }
    public BuocXuLy BuocXuLy { get; private set; }
    public ChucDanh ChucDanh { get; private set; }
    public BuocXuLyChucDanh() { }
    public BuocXuLyChucDanh(DefaultIdType chucDanhId, DefaultIdType buocXuLyId)
    {
        ChucDanhId = chucDanhId;
        BuocXuLyId = buocXuLyId;
    }
    public BuocXuLyChucDanh SetChucDanhId(DefaultIdType chucDanhId)
    {
        ChucDanhId = chucDanhId;
        return this;
    }
}
