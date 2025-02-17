using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.MenuApp.Queries;
public sealed record GetMenuQuery(Guid Id) : IQuery<Menu>;
