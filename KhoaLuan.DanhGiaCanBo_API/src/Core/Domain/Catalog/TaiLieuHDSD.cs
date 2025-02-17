using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Domain.Catalog;
public class TaiLieuHDSD : BaseEntity<DefaultIdType>, IAggregateRoot
{
    public int? ThuTu { get; private set; }
    [MaxLength(1000)]
    public string TenTaiLieu { get; private set; }
    public string TepDinhKem { get; private set; }
    [MaxLength(2000)]
    public string MoTa { get; private set; }
    [MaxLength(20)]
    public string? TaiLieuDanhCho { get; private set; }
    public DateTime? NgayDang { get; private set; }
    public DateTime? DeletedOn { get; private set; }
    public DefaultIdType? DeletedBy { get; private set; }
    public TaiLieuHDSD() { }
    public TaiLieuHDSD(int? thuTu, string tenTaiLieu, string tepDinhKem, string? moTa, DateTime? ngayDang, string? taiLieuDanhCho)
    {
        TenTaiLieu = tenTaiLieu;
        ThuTu = thuTu;
        TepDinhKem = tepDinhKem;
        MoTa = moTa;
        NgayDang = ngayDang;
        TaiLieuDanhCho = taiLieuDanhCho;
    }
    public static TaiLieuHDSD Create(int? thuTu, string tenTaiLieu, string? tepDinhKem, string? moTa, DateTime? ngayDang, string? taiLieuDanhCho)
    {
        return new(thuTu, tenTaiLieu, tepDinhKem, moTa, ngayDang, taiLieuDanhCho);
    }

    public TaiLieuHDSD Update(int? thuTu, string? tenTaiLieu, string? tepDinhKem, string? moTa, DateTime? ngayDang, string? taiLieuDanhCho)
    {
        if (!string.IsNullOrEmpty(tenTaiLieu) && !TenTaiLieu.Equals(tenTaiLieu))
            TenTaiLieu = tenTaiLieu;
        if (!string.IsNullOrEmpty(tepDinhKem) && !TepDinhKem.Equals(tepDinhKem))
            TepDinhKem = tepDinhKem;
        if (!string.IsNullOrEmpty(taiLieuDanhCho))
            TaiLieuDanhCho = taiLieuDanhCho;
        if (!string.IsNullOrEmpty(moTa) && !MoTa.Equals(moTa))
            MoTa = moTa;
        if (thuTu != null)
            ThuTu = (int)thuTu;
        if (ngayDang != null && ngayDang != default)
            NgayDang = (DateTime)ngayDang;
        return this;
    }
    public TaiLieuHDSD SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public TaiLieuHDSD Restore()
    {
        DeletedOn = null;
        return this;
    }
}
