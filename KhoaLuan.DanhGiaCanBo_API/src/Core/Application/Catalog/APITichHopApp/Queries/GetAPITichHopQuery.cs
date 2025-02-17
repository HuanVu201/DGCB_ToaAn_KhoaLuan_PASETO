using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.APITichHopApp.Queries;
public sealed record GetAPITichHopQuery(Guid Id) : IQuery<APITichHop>;
