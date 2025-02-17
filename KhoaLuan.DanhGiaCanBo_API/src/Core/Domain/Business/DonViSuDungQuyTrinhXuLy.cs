using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Domain.Business;
public class DonViSuDungQuyTrinhXuLy : BaseEntity, IAggregateRoot
{
    [MaxLength(50)]
    public string OfficeCode { get; private set; }
    public DefaultIdType QuyTrinhXuLyId { get; private set; }
    public QuyTrinhXuLy QuyTrinhXuLy { get; private set; }
    public Group DonVi { get; private set; }
    public DonViSuDungQuyTrinhXuLy() { }
    public DonViSuDungQuyTrinhXuLy(string officeCode, DefaultIdType quyTrinhXuLyId)
    {
        OfficeCode = officeCode;
        QuyTrinhXuLyId = quyTrinhXuLyId;
    }
    public DonViSuDungQuyTrinhXuLy SetOfficeCode(string officeCode)
    {
        OfficeCode = officeCode;
        return this;
    }

    public static bool LaDonViBiLoaiTru(string donVi, List<string>? donViLoaiTrus)
    {
        if (donViLoaiTrus == null || !donViLoaiTrus.Any())
        {
            return false;
        }
        return donViLoaiTrus.Any(x => x.Equals(donVi, StringComparison.OrdinalIgnoreCase));
    }
}
