using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Domain.Business;
public class NhomDonVi : AuditableEntity, IAggregateRoot
{
    [MaxLength(255)]
    public string TenNhom { get; set; }
    [MaxLength(500)]
    public string? MoTa { get; set; }

    private readonly List<DanhSachNhomDonVi> _danhSachNhomDonVis = [];
    public IReadOnlyCollection<DanhSachNhomDonVi> danhSachNhomDonVis => _danhSachNhomDonVis;

    public NhomDonVi() { }

    public NhomDonVi(string tenNhom, string? moTa)
    {
        TenNhom = tenNhom;
        MoTa = moTa;
    }

    public void AddDonVis(List<string> donViIds)
    {
        if (donViIds == null || !donViIds.Any())
        {
            return;
        }
        List<DanhSachNhomDonVi> danhSachNhomDonVis = donViIds?.Select(groupCode => new DanhSachNhomDonVi(groupCode, Id)).ToList();
        _danhSachNhomDonVis.AddRange(danhSachNhomDonVis);
    }
    public void UpdateDonVi(List<string> donViIds, bool addIfNotExist = true)
    {
        if (donViIds == null || !donViIds.Any())
        {
            return;
        }
        var newDonViIds = donViIds.ConvertAll(groupCode => new DanhSachNhomDonVi(groupCode, Id));

        // Xóa các liên kết không còn nằm trong danh sách mới
        _danhSachNhomDonVis.RemoveAll(existing => !donViIds.Contains(existing.GroupCode));

        // Thêm các liên kết mới chưa có trong danh sách hiện tại
        foreach (var newDonVi in newDonViIds)
        {
            if (!_danhSachNhomDonVis.Any(existing => existing.GroupCode == newDonVi.GroupCode))
            {
                _danhSachNhomDonVis.Add(newDonVi);
            }
        }
    }

    public NhomDonVi Update(string? ten,  string? moTa)
    {
        if (!string.IsNullOrEmpty(ten))
            TenNhom = ten;
        if (moTa != null)
            MoTa = moTa;
        return this;
    }
    public NhomDonVi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public NhomDonVi Restore()
    {
        DeletedOn = null;
        return this;
    }
}
