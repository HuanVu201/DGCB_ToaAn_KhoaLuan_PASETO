using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Domain.Business;
public class DanhSachNhomDonVi : BaseEntity, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "VARCHAR")]
    public string GroupCode { get; set; }
    public DefaultIdType NhomDonViId { get; set; }

    public Group Group { get; set; }
    public NhomDonVi NhomDonVi { get; set; }

    public DanhSachNhomDonVi() { }
    public DanhSachNhomDonVi(string groupCode, DefaultIdType nhomDonViId)
    {
        GroupCode = groupCode;
        NhomDonViId = nhomDonViId;
    }
}
