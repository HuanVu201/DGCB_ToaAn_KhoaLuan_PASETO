using TD.DanhGiaCanBo.Shared.Events;

namespace TD.DanhGiaCanBo.Domain.Common.Contracts;

public abstract class DomainEvent : IEvent
{
    public DateTime TriggeredOn { get; protected set; } = DateTime.Now;
}