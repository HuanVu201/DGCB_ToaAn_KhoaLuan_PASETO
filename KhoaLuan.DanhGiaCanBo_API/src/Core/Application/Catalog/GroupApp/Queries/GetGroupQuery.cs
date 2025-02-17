using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;
public sealed record GetGroupQuery(Guid Id) : IQuery<Group>;
