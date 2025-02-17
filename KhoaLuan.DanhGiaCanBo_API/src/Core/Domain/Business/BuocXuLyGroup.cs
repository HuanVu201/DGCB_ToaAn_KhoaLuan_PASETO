using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Domain.Business;
public class BuocXuLyGroup : BaseEntity, IAggregateRoot
{
    public DefaultIdType NhomDonViId { get; private set; }
    public DefaultIdType BuocXuLyId { get;private set; }

    public NhomDonVi NhomDonVi { get; private set; }
    public BuocXuLy BuocXuLy { get; private set; }
    public BuocXuLyGroup() { }

    public BuocXuLyGroup(DefaultIdType nhomDonViId, DefaultIdType buocXuLyId)
    {
        NhomDonViId = nhomDonViId;
        BuocXuLyId = buocXuLyId;
    }
}
