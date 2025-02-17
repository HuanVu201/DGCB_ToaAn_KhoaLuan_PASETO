namespace TD.DanhGiaCanBo.Domain.Business;
public class ScreenAction : BaseEntity<DefaultIdType>, IAggregateRoot
{
    public Guid ScreenId { get; private set; }
    public Guid ActionId { get; private set; }

    public ScreenAction() { }
    public ScreenAction(DefaultIdType screenId, DefaultIdType actionId)
    {
        ScreenId = screenId;
        ActionId = actionId;
    }
    public static ScreenAction Create(Guid screenId, Guid actionId)
    {
        return new ScreenAction(screenId, actionId);
    }

}

public class ScreenActionConstant
{
    public const string ScreenActionKey = nameof(ScreenActionKey);
}