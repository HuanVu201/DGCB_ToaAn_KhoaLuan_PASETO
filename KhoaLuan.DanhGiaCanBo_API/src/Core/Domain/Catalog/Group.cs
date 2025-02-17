using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Domain.Catalog;
public class Group : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string GroupCode { get; private set; }
    [MaxLength(150)]
    public string GroupName { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? OfGroupCode { get; private set; }
    [MaxLength(150)]
    public string? OfGroupName { get; private set; }
    [MaxLength(36)]
    [Column(TypeName = "varchar")]
    public string? OfGroupId { get; private set; }
    public string? FullCode { get; private set; }
    public int? GroupOrder { get; private set; }
    public bool? Active { get; private set; }
    [MaxLength(1000)]
    public string? Description { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string Type { get; private set; }
    [MaxLength(150)]
    public string? Catalog { get; private set; }
    [MaxLength(150)]
    public string? OtherCatalog { get; private set; }

    public bool? IsKhongDanhGia { get; private set; }

    public bool? IsKhongThongKe { get; private set; }

    public Guid? InChargeId { get; private set; }
    private readonly List<DonViSuDungQuyTrinhXuLy> _QuyTrinhXuLys = [];
    public IReadOnlyCollection<DonViSuDungQuyTrinhXuLy> QuyTrinhXuLys => _QuyTrinhXuLys;
    public Group() { }

    public Group(string groupCode, string groupName, string? ofGroupCode, string? ofGroupName, string? ofGroupId, string? fullCode, int? groupOrder, bool? active, string? description,
        string type, string? catalog, string? otherCatalog, Guid? inChargeId,bool? isKhongDanhGia, bool? isKhongThongKe)
    {
        GroupCode = groupCode;
        GroupName = groupName;
        OfGroupCode = ofGroupCode;
        OfGroupName = ofGroupName;
        OfGroupId = ofGroupId;
        FullCode = fullCode;
        GroupOrder = groupOrder;
        Active = active;
        Description = description;
        Type = type;
        Catalog = catalog;
        OtherCatalog = otherCatalog;
        InChargeId = inChargeId;
        IsKhongDanhGia = isKhongDanhGia;
        IsKhongThongKe = isKhongThongKe;
    }
    public Group Update(string groupCode, string groupName, string? ofGroupCode, string? ofGroupName, string? ofGroupId, string? fullCode, int? groupOrder, bool? active, string? description,
        string type, string? catalog, string? otherCatalog , Guid? inChargeId, bool? isKhongDanhGia, bool? isKhongThongKe)
    {
        if (groupCode != null)
            GroupCode = groupCode != string.Empty ? groupCode : GroupCode;
        if (groupName != null)
            GroupName = groupName != string.Empty ? groupName : GroupName;
        if (!string.IsNullOrEmpty(ofGroupCode))
            OfGroupCode = ofGroupCode;
        if (!string.IsNullOrEmpty(ofGroupName))
            OfGroupName = ofGroupName;
        if (!string.IsNullOrEmpty(ofGroupId))
            OfGroupId = ofGroupId;
        if (groupOrder != null)
            GroupOrder = (int)groupOrder;
        if (active != null)
            Active = (bool)active;
        if (!string.IsNullOrEmpty(description))
            Description = description;
        if (!string.IsNullOrEmpty(type))
            Type = type;
        if (catalog != null)
            Catalog = catalog;
        if (otherCatalog != null)
            OtherCatalog = otherCatalog;
        if (inChargeId != null)
            InChargeId = inChargeId;
        if (isKhongDanhGia != null)
            IsKhongDanhGia = isKhongDanhGia;
        if (isKhongThongKe != null)
            IsKhongThongKe = isKhongThongKe;
        return this;
    }

    public Group SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public Group Restore()
    {
        DeletedOn = null;
        return this;
    }
}

public class GroupContants
{
    public const string DON_VI = "don-vi";
    public const string QUAN_HUYEN = "quan-huyen";
    public const string XA_PHUONG = "xa-phuong";
    public const string SO_BAN_NGANH = "so-ban-nganh";
    public const string CNVPDK = "cnvpdk";
}
