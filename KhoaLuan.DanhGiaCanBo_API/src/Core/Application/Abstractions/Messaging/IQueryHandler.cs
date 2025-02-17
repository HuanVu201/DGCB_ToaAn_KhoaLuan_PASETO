namespace TD.DanhGiaCanBo.Application.Abstractions.Messaging;
internal interface IQueryHandler<TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : class, IQuery<TResponse>
{

}
