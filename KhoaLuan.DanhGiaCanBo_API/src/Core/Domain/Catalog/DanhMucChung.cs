using System.ComponentModel.DataAnnotations;

namespace TD.DanhGiaCanBo.Domain.Catalog;
public class DanhMucChung : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(200)]
    public string TenDanhMuc { get; private set; }
    [MaxLength(100)]
    public string Code { get; private set; }
    public int ThuTu { get; private set; } = 1;
    public bool? DuocChamNhieuLan { get; private set; }
    public bool Active { get; private set; } = true;
    [MaxLength(100)]
    public string Type { get; private set; }
    public string? DinhKem { get; private set; }
 
    public DanhMucChung() { }

    public DanhMucChung(string tendanhmuc, string code, int thutu, bool active, string type, bool? duocChamNhieuLan, string? dinhKem)
    {
        TenDanhMuc = tendanhmuc;
        Code = code;
        ThuTu = thutu;
        Active = active;
        Type = type;
        DuocChamNhieuLan = duocChamNhieuLan;
        DinhKem = dinhKem;
    }

    public static DanhMucChung Create(string tendanhmuc, string code, int thutu, bool active, string type, bool? duocChamNhieuLan,string? dinhKem)
    {
        return new(tendanhmuc, code, thutu, active, type, duocChamNhieuLan, dinhKem);
    }
    public DanhMucChung Update(string tendanhmuc, string code, int thutu, bool active, string type, bool? duocChamNhieuLan,string? dinhKem)
    {
        if (duocChamNhieuLan.HasValue)
            DuocChamNhieuLan = duocChamNhieuLan.Value;
        if (!string.IsNullOrEmpty(tendanhmuc) && !TenDanhMuc.Equals(tendanhmuc))
            TenDanhMuc = tendanhmuc;
        if (!string.IsNullOrEmpty(code) && !Code.Equals(code))
            Code = code;
        if (thutu != null)
            ThuTu = (int)thutu;
        if (active != null)
            Active = (bool)active;
        if (!string.IsNullOrEmpty(type) && !Type.Equals(type))
            Type = type;
        if (dinhKem != null)
            DinhKem = dinhKem;
            return this;
    }


    public DanhMucChung SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public DanhMucChung Restore()
    {
        DeletedOn = null;
        return this;
    }
}
