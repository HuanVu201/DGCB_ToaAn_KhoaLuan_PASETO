using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;
public class TrangThaiDanhGia : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(100)]
    public string Ten { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string Ma { get; private set; }
    public bool Active { get; private set; } = true;
    public bool LaTrangThaiDonVi { get; private set; } = false;
    public TrangThaiDanhGia() { }
    private readonly List<BuocXuLy> _BuocXuLys = [];
    public IReadOnlyCollection<BuocXuLy> BuocXuLys => _BuocXuLys;
    public TrangThaiDanhGia(string ten, string ma, bool active, bool laTrangThaiDonVi)
    {
        Ten = ten;
        Ma = ma;
        Active = active;
        LaTrangThaiDonVi = laTrangThaiDonVi;
    }

    public static TrangThaiDanhGia Create(string ten, string ma, bool active, bool laTrangThaiDonVi)
    {
        return new(ten, ma, active, laTrangThaiDonVi);
    }
    public TrangThaiDanhGia Update(string? ten, string? ma, bool? active, bool? laTrangThaiDonVi)
    {
        if (!string.IsNullOrEmpty(ten) && !Ten.Equals(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
        if (active != null)
            Active = (bool)active;
        if (laTrangThaiDonVi != null)
            LaTrangThaiDonVi = (bool)laTrangThaiDonVi;
        return this;
    }
    public TrangThaiDanhGia SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public TrangThaiDanhGia Restore()
    {
        DeletedOn = null;
        return this;
    }
}
