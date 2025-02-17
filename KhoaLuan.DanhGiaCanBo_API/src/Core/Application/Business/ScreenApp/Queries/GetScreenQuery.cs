using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ScreenApp.Queries;
public sealed record GetScreenQuery(DefaultIdType Id) : IQuery<Screen>;
