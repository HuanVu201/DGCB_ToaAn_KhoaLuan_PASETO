using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ActionApp.Dtos;

namespace TD.DanhGiaCanBo.Application.Business.ActionApp.Queries;
public sealed record GetActionQuery(DefaultIdType Id) : IQuery<DetailActionDto>;
