using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Catalog;
public class Menu : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(150)]
    public string TenMenu { get; private set; }
    public Guid? ParentId { get; private set; }
    public int ThuTuMenu { get; private set; } = 1;
    public bool Active { get; private set; } = true;
    [MaxLength(100)]
    public string Module { get; private set; }
    [MaxLength(500)]
    public string FullPath { get; private set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? IconName { get; private set; }

    [MaxLength(600)]
    [Column(TypeName = "varchar")]
    public string? Permission { get; private set; }
    public bool? IsTopMenu { get; private set; } = false;

    public Menu() { }

    public Menu(string name, DefaultIdType? parentId, int order, bool active, string module, string fullPath, string? iconName, string? permission, bool? isTopMenu = false)
    {
        TenMenu = name;
        ParentId = parentId;
        ThuTuMenu = order;
        Active = active;
        Module = module;
        FullPath = fullPath;
        IconName = iconName;
        Permission = permission;
        IsTopMenu = isTopMenu;
    }

    public static Menu Create(string name, DefaultIdType? parentId, int order, bool active, string module, string fullPath, string? iconName, string? permission, bool? isTopMenu = false)
    {
        return new(name, parentId, order, active, module, fullPath, iconName, permission, isTopMenu);
    }
    public Menu Update(string? name, DefaultIdType? parentId, int? order, bool? active, string? module, string? fullPath, string? iconName, string? permission, bool? isTopMenu)
    {
        if (!string.IsNullOrEmpty(name) && !TenMenu.Equals(name))
            TenMenu = name;
        if (parentId != null)
            ParentId = (Guid)parentId;
        if (order != null)
            ThuTuMenu = (int)order;
        if (active != null)
            Active = (bool)active;
        if (!string.IsNullOrEmpty(module) && !Module.Equals(module))
            Module = module;
        if (!string.IsNullOrEmpty(fullPath) && !FullPath.Equals(fullPath))
            FullPath = fullPath;
        if (iconName != null)
            IconName = iconName;
        Permission = permission;
        if (isTopMenu != null)
            IsTopMenu = (bool)isTopMenu;
        return this;
    }
    public Menu SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public Menu Restore()
    {
        DeletedOn = null;
        return this;
    }
}
