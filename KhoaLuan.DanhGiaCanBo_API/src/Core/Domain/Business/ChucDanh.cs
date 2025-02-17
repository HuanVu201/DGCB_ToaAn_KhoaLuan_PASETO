using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;
public class ChucDanh : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(200)]
    public string Ten { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string Ma { get; private set; }
    [MaxLength(200)]
    public string? MoTa { get; private set; }

    public string? TenCapDanhGia { get; private set; }
    public string? MaCapDanhGia { get; private set; }
    public bool Active { get; private set; } = true;
    private readonly List<BuocXuLyChucDanh> _BuocXuLys = [];
    public IReadOnlyCollection<BuocXuLyChucDanh> BuocXuLys => _BuocXuLys;

    private readonly List<ChucDanhMauPhieuDanhGia> _MauPhieuDanhGias = [];
    public IReadOnlyCollection<ChucDanhMauPhieuDanhGia> MauPhieuDanhGias => _MauPhieuDanhGias;
    public ChucDanh() { }

    public ChucDanh(string ten, string ma, string moTa, bool active, string tenCapDanhGia, string maCapDanhGia)
    {
        Ten = ten;
        Ma = ma;
        MoTa = moTa;
        Active = active;
        TenCapDanhGia = tenCapDanhGia;
        MaCapDanhGia = maCapDanhGia;
    }

    public static ChucDanh Create(string ten, string ma, string moTa, bool active, string tenCapDanhGia, string maCapDanhGia)
    {
        return new(ten, ma, moTa, active, tenCapDanhGia, maCapDanhGia);
    }
    public ChucDanh Update(string ten, string ma, string moTa, bool active, string tenCapDanhGia, string maCapDanhGia)
    {
        if (!string.IsNullOrEmpty(ten) && Ten != null  && !Ten.Equals(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
        if (!string.IsNullOrEmpty(tenCapDanhGia) && (TenCapDanhGia == null || TenCapDanhGia != tenCapDanhGia))
        {
            TenCapDanhGia = tenCapDanhGia;
        }

        if (!string.IsNullOrEmpty(maCapDanhGia) && (MaCapDanhGia != null || MaCapDanhGia != maCapDanhGia))
            MaCapDanhGia = maCapDanhGia;
        if (!string.IsNullOrEmpty(moTa))
            MoTa = moTa;
        if (active != null)
            Active = active;
        return this;
    }
    public void UpsertMauPhieuDanhGias(List<Guid>? mauPhieuDanhGias)
    {
        if(mauPhieuDanhGias == null)
        {
            return;
        }
        var newChucVuIds = mauPhieuDanhGias.ConvertAll(id => new ChucDanhMauPhieuDanhGia(Id, id));

        // Xóa các liên kết không còn nằm trong danh sách mới
        _MauPhieuDanhGias.RemoveAll(existing => !mauPhieuDanhGias.Contains(existing.MauPhieuDanhGiaId));

        // Thêm các liên kết mới chưa có trong danh sách hiện tại
        foreach (var newChucVu in newChucVuIds)
        {
            if (!_MauPhieuDanhGias.Any(existing => existing.MauPhieuDanhGiaId == newChucVu.MauPhieuDanhGiaId))
            {
                _MauPhieuDanhGias.Add(newChucVu);
            }
        }
    }
    public ChucDanh SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ChucDanh Restore()
    {
        DeletedOn = null;
        return this;
    }
}
