using TD.DanhGiaCanBo.Shared.Events;

namespace TD.DanhGiaCanBo.Application.Common.Events;

public interface IEventPublisher : ITransientService
{
    Task PublishAsync(IEvent @event);
}