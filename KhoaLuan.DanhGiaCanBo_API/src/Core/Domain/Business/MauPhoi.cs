using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Domain.Business;
public class MauPhoi : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? LoaiPhoi { get; private set; }
    [MaxLength(200)]
    [Column(TypeName = "varchar")]
    public string? MaMauPhoi { get; private set; }
    [MaxLength(500)]
    public string TenMauPhoi { get; private set; }
    [MaxLength(1000)]
    [Column(TypeName = "varchar")]
    public string? MaDonVi { get; private set; }
    [MaxLength(1000)]
    public string? UrlMauPhoi { get; private set; }
    public bool? LaPhoiMacDinh { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? CustomerId { get; set; }

    public MauPhoi() { }
    public MauPhoi(string loaiPhoi, string maMauPhoi, string tenMauPhoi, string? maDonVi, string? urlMauPhoi, bool? laPhoiMacDinh, string? customerId)
    {
        LoaiPhoi = loaiPhoi;
        MaMauPhoi = maMauPhoi;
        TenMauPhoi = tenMauPhoi;
        MaDonVi = maDonVi;
        UrlMauPhoi = urlMauPhoi;
        LaPhoiMacDinh = laPhoiMacDinh;
        CustomerId = customerId;
    }

    public static MauPhoi Create(string loaiPhoi, string maMauPhoi, string tenMauPhoi, string? maDonVi, string? urlMauPhoi, bool? laPhoiMacDinh, string? customerId)
    {
        return new MauPhoi(loaiPhoi, maMauPhoi, tenMauPhoi, maDonVi, urlMauPhoi, laPhoiMacDinh, customerId);
    }

    public MauPhoi Update(string? loaiPhoi, string? maMauPhoi, string? tenMauPhoi, string? maDonVi, string? urlMauPhoi, bool? laPhoiMacDinh)
    {
        LoaiPhoi = !string.IsNullOrEmpty(loaiPhoi) ? loaiPhoi : LoaiPhoi;
        MaMauPhoi = !string.IsNullOrEmpty(maMauPhoi) ? maMauPhoi : MaMauPhoi;
        TenMauPhoi = !string.IsNullOrEmpty(tenMauPhoi) ? tenMauPhoi : TenMauPhoi;
        MaDonVi = !string.IsNullOrEmpty(maDonVi) ? maDonVi : null;
        UrlMauPhoi = !string.IsNullOrEmpty(urlMauPhoi) ? urlMauPhoi : null;
        if (laPhoiMacDinh != null)
            LaPhoiMacDinh = (bool)laPhoiMacDinh;
        return this;
    }

    public MauPhoi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public MauPhoi Restore()
    {
        DeletedOn = null;
        return this;
    }
}
