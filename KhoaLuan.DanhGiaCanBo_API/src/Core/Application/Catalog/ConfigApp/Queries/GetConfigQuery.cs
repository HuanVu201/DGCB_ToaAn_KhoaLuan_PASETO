using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Queries;
public sealed record GetConfigQuery(Guid Id) : IQuery<Config>;
