namespace TD.DanhGiaCanBo.Application.Abstractions.Messaging;
public interface IQuery<TResponse> : IRequest<Result<TResponse>>
{

}
