using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TD.DanhGiaCanBo.Domain.Business;
public class Action : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string Ten { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? Ma { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? IconName { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "varchar")]
    public string? ColorCode { get; private set; }
    public bool? ShowInModal { get; private set; } = false;
    public bool? ShowInTable { get; private set; } = false;
    public int ThuTu { get; private set; }
    [MaxLength(150)]
    public string? Quyen { get; private set; }
    [MaxLength(150)]
    public string? MoTa { get; private set; }
    [MaxLength(1000)]
    public string? ApplyForUsers { get; private set; }
    [MaxLength(1000)]
    public string? ApplyForUserGroups { get; private set; }

    public Action() { }

    public Action(string ten, string? ma, int thuTu, string? quyen, string? moTa, string? iconName, string? colorCode, bool? showInModal, bool? showInTable)
    {
        Ten = ten;
        Ma = ma;
        ThuTu = thuTu;
        Quyen = quyen;
        MoTa = moTa;
        IconName = iconName;
        ColorCode = colorCode;
        ShowInModal = showInModal;
        ShowInTable = showInTable;
    }
    public Action(string ten, string? ma, int thuTu, string? quyen, string? moTa, string? iconName, string? colorCode, bool? showInModal, bool? showInTable, string applyForUsers, string applyForUserGroups)
    {
        Ten = ten;
        Ma = ma;
        ThuTu = thuTu;
        Quyen = quyen;
        MoTa = moTa;
        IconName = iconName;
        ColorCode = colorCode;
        ShowInModal = showInModal;
        ShowInTable = showInTable;
        ApplyForUsers = applyForUsers;
        ApplyForUserGroups = applyForUserGroups;
    }

    public Action Update(string? ten, string? ma, int? thuTu, string? quyen,string? moTa, string? iconName, string? colorCode, bool? showInModal, bool? showInTable, string applyForUsers, string applyForUserGroups)
    {
        if (!string.IsNullOrEmpty(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(moTa))
            MoTa = moTa;
        if (!string.IsNullOrEmpty(ma))
            Ma = ma;
        if (thuTu != null)
            ThuTu = (int)thuTu;
        if (quyen != null)
            Quyen = quyen;
        if (!string.IsNullOrEmpty(iconName))
            IconName = iconName;
        if (!string.IsNullOrEmpty(colorCode))
            ColorCode = colorCode;
        if (showInModal != null)
            ShowInModal = (bool)showInModal;
        if (showInTable != null)
            ShowInTable = (bool)showInTable;
        if (applyForUsers != null)
            ApplyForUsers = applyForUsers;
        if (applyForUserGroups != null)
            ApplyForUserGroups = applyForUserGroups;
        return this;
    }
    public Action SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public Action Restore()
    {
        DeletedOn = null;
        return this;
    }
}
