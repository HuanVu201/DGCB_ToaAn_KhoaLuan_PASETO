using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Domain.Catalog;
public class NhomNguoiDung : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(150)]
    public string Ten { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? Ma { get; private set; }
    [MaxLength(200)]
    public string? MoTa { get; private set; }
    private readonly List<BuocXuLyNhomNguoiDung> _BuocXuLyNhomNguoiDungs = [];
    public IReadOnlyCollection<BuocXuLyNhomNguoiDung> BuocXuLyNhomNguoiDungs => _BuocXuLyNhomNguoiDungs;
    public NhomNguoiDung() { }
    public NhomNguoiDung(string ten, string? ma, string? moTa)
    {
        Ten = ten;
        Ma = ma;
        MoTa = moTa;
    }

    public static NhomNguoiDung Create(string ten, string? ma, string? moTa)
    {
        return new(ten, ma, moTa);
    }
    public NhomNguoiDung Update(string? ten, string? ma, string? moTa)
    {
        if (!string.IsNullOrEmpty(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma))
            Ma = ma;
        if (!string.IsNullOrEmpty(moTa))
            MoTa = moTa;
        return this;
    }
    public NhomNguoiDung SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public NhomNguoiDung Restore()
    {
        DeletedOn = null;
        return this;
    }
}
