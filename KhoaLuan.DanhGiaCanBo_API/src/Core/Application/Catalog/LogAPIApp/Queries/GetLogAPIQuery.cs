using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAPIApp.Queries;
public sealed record GetLogAPIQuery(Guid Id) : IQuery<LogAPI>;
