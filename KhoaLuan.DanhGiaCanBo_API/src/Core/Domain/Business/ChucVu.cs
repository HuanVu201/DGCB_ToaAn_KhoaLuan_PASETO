using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;
public class ChucVu : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(200)]
    public string Ten { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string Ma { get; private set; }
    [MaxLength(200)]
    public string MoTa { get; private set; }
    public string? TenCapDanhGia { get; private set; }
    public string? MaCapDanhGia { get; private set; }
    public bool Active { get; private set; } = true;

    private readonly List<BuocXuLyChucVu> _BuocXuLys = [];
    public IReadOnlyCollection<BuocXuLyChucVu> BuocXuLys => _BuocXuLys;
    public ChucVu() { }
    public ChucVu(string ten, string ma, string moTa, bool active,string tenCapDanhGia,string maCapDanhGia)
    {
        Ten = ten;
        Ma = ma;
        MoTa = moTa;
        Active = active;
        TenCapDanhGia = tenCapDanhGia;
        MaCapDanhGia = maCapDanhGia;
    }

    public static ChucVu Create(string ten, string ma, string moTa, bool active, string tenCapDanhGia, string maCapDanhGia)
    {
        return new(ten, ma, moTa, active,tenCapDanhGia,maCapDanhGia);
    }
    public ChucVu Update(string ten, string ma, string moTa, bool active, string tenCapDanhGia, string maCapDanhGia)
    {
        if (!string.IsNullOrEmpty(ten) && Ten  == null && !Ten.Equals(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
        if (!string.IsNullOrEmpty(tenCapDanhGia) && (TenCapDanhGia == null || TenCapDanhGia != tenCapDanhGia))
        {
            TenCapDanhGia = tenCapDanhGia;
        }

        if (!string.IsNullOrEmpty(maCapDanhGia) && (MaCapDanhGia != null || MaCapDanhGia != maCapDanhGia))
            MaCapDanhGia = maCapDanhGia;
        if (!string.IsNullOrEmpty(moTa) && !MoTa.Equals(moTa))
            MoTa = moTa;
        if (active != null)
            Active = active;
        return this;
    }
    public ChucVu SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ChucVu Restore()
    {
        DeletedOn = null;
        return this;
    }
}
