using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;

public class KyDanhGia : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(200)]
    public string? Ten { get; private set; }

    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string? Ma { get; private set; }

    public DateTime? TuNgayDanhGia { get; private set; }

    public DateTime? DenNgayDanhGia { get; private set; }

    [MaxLength(100)]
    public string? ThoiGianGiaHan { get; private set; }

    public bool Active { get; private set; } = true;

    public KyDanhGia() { }

    // Constructor chính: khởi tạo đầy đủ
    public KyDanhGia(
        string? ten,
        string? ma,
        DateTime? tuNgayDanhGia,
        DateTime? denNgayDanhGia,
        string? thoiGianGiaHan,
        bool active)
    {
        Ten = ten;
        Ma = ma;
        TuNgayDanhGia = tuNgayDanhGia;
        DenNgayDanhGia = denNgayDanhGia;
        ThoiGianGiaHan = thoiGianGiaHan;
        Active = active;
    }

    // Phương thức khởi tạo nhanh
    public static KyDanhGia Create(
        string? ten,
        string? ma,
        DateTime? tuNgayDanhGia,
        DateTime? denNgayDanhGia,
        string? thoiGianGiaHan,
        bool active)
    {
        return new KyDanhGia(ten, ma, tuNgayDanhGia, denNgayDanhGia, thoiGianGiaHan, active);
    }

    // Phương thức cập nhật thông tin
    public KyDanhGia Update(
        string? ten,
        string? ma,
        DateTime? tuNgayDanhGia,
        DateTime? denNgayDanhGia,
        string? thoiGianGiaHan,
        bool? active)
    {
        if (!string.IsNullOrEmpty(ten) && !Ten.Equals(ten))
            Ten = ten;

        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;

        if (tuNgayDanhGia.HasValue && (!TuNgayDanhGia.HasValue || !TuNgayDanhGia.Equals(tuNgayDanhGia.Value)))
            TuNgayDanhGia = tuNgayDanhGia;

        if (denNgayDanhGia.HasValue && (!DenNgayDanhGia.HasValue || !DenNgayDanhGia.Equals(denNgayDanhGia.Value)))
            DenNgayDanhGia = denNgayDanhGia;

        if (!string.IsNullOrEmpty(thoiGianGiaHan) && !ThoiGianGiaHan.Equals(thoiGianGiaHan))
            ThoiGianGiaHan = thoiGianGiaHan;

        if (active.HasValue && Active != active.Value)
            Active = active.Value;

        return this;
    }

    // Phương thức xóa mềm
    public KyDanhGia SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        Active = false; // Đánh dấu là không còn hoạt động
        return this;
    }

    // Phương thức khôi phục
    public KyDanhGia Restore()
    {
        DeletedOn = null;
        Active = true; // Đánh dấu là hoạt động lại
        return this;
    }
}
