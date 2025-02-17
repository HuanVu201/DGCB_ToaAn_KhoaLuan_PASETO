using System.ComponentModel.DataAnnotations;

namespace TD.DanhGiaCanBo.Domain.Business;
public class Screen : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(255)]
    public string? MoTa { get; private set; }
    [MaxLength(200)]
    public string Ma { get; private set; }

    public bool? ShowActionInModal { get; private set; } = false;
    public bool? ShowActionInTable { get; private set; } = false;

    public Screen() { }

    public Screen(string? moTa, string ma, bool? showActionInModal, bool? showActionInTable)
    {
        MoTa = moTa;
        Ma = ma;
        ShowActionInModal = showActionInModal;
        ShowActionInTable = showActionInTable;
    }

    public Screen Update(string? moTa, string? ma, bool? showActionInModal, bool? showActionInTable)
    {
        if (!string.IsNullOrEmpty(moTa) && !MoTa.Equals(moTa))
            MoTa = moTa;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
        if (showActionInModal != null)
            ShowActionInModal = showActionInModal;
        if (showActionInTable != null)
            ShowActionInTable = showActionInTable;
        return this;
    }
    public Screen SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public Screen Restore()
    {
        DeletedOn = null;
        return this;
    }
}
