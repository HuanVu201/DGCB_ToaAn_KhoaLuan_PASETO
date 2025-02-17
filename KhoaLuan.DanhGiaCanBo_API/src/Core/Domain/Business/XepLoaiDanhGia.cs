using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;
public class XepLoaiDanhGia : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(200)]
    public string Ten { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string Ma { get; private set; }
    public double DiemToiThieu { get; private set; }
    public double DiemToiDa { get; private set; }
    public bool Active { get; private set; } = true;

    [Column(TypeName = "VARCHAR")]
    [MaxLength(100)]
    public string MaBoTieuChi { get; private set; }
    [MaxLength(200)]
    public string TenBoTieuChi { get; private set; }

    public XepLoaiDanhGia() { }

    public XepLoaiDanhGia(string ten, string ma, double diemtoithieu, double diemtoida, bool active, string mabotieuchi, string tenbotieuchi)
    {
        Ten = ten;
        Ma = ma;
        DiemToiThieu = diemtoithieu;
        DiemToiDa = diemtoida;
        Active = active;
        MaBoTieuChi = mabotieuchi;
        TenBoTieuChi = tenbotieuchi;
    }

    public static XepLoaiDanhGia Create(string ten, string ma, double diemtoithieu, double diemtoida, bool active, string mabotieuchi, string tenbotieuchi)
    {
        return new(ten, ma, diemtoithieu, diemtoida, active, mabotieuchi, tenbotieuchi);
    }
    public XepLoaiDanhGia Update(string ten, string ma, double diemtoithieu, double diemtoida, bool active, string mabotieuchi, string tenbotieuchi)
    {
        if (!string.IsNullOrEmpty(mabotieuchi) && !MaBoTieuChi.Equals(mabotieuchi))
            MaBoTieuChi = mabotieuchi;
        if (!string.IsNullOrEmpty(tenbotieuchi) && !TenBoTieuChi.Equals(tenbotieuchi))
            TenBoTieuChi = tenbotieuchi;

        if (!string.IsNullOrEmpty(ten) && !Ten.Equals(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
        if (diemtoithieu != null)
            DiemToiThieu = (double)diemtoithieu;
        if (diemtoida != null)
            DiemToiDa = (double)diemtoida;
        if (active != null)
            Active = active;
        return this;
    }
    public XepLoaiDanhGia SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public XepLoaiDanhGia Restore()
    {
        DeletedOn = null;
        return this;
    }
}
