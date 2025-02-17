using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Domain.Business;
public class LoaiMauPhoi : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? LoaiPhoi { get; private set; }
    [MaxLength(200)]
    [Column(TypeName = "varchar")]
    public string? MaMauPhoi { get; private set; }
    [MaxLength(500)]
    public string? TenMaMauPhoi { get; private set; }

    public LoaiMauPhoi()
    {

    }

    public LoaiMauPhoi(string loaiPhoi, string maMauPhoi, string tenMaMauPhoi)
    {
        LoaiPhoi = loaiPhoi;
        MaMauPhoi = maMauPhoi;
        TenMaMauPhoi = tenMaMauPhoi;
    }

    public static LoaiMauPhoi Create(string loaiPhoi, string maMauPhoi, string tenMaMauPhoi)
    {
        return new LoaiMauPhoi(loaiPhoi, maMauPhoi, tenMaMauPhoi);
    }

    public LoaiMauPhoi Update(string? maMauPhoi, string? tenMaMauPhoi)
    {
        MaMauPhoi = !string.IsNullOrEmpty(maMauPhoi) ? maMauPhoi : MaMauPhoi;
        TenMaMauPhoi = !string.IsNullOrEmpty(tenMaMauPhoi) ? tenMaMauPhoi : TenMaMauPhoi;

        return this;
    }

    public LoaiMauPhoi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public LoaiMauPhoi Restore()
    {
        DeletedOn = null;
        return this;
    }
}