using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Queries;
public sealed record GetScreenActionQuery(DefaultIdType Id) : IQuery<Domain.Business.ScreenAction>;
