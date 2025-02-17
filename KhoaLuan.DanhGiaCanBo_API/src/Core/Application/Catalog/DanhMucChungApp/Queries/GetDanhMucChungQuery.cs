using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.DanhMucChungApp.Queries;
public sealed record GetDanhMucChungQuery(Guid Id) : IQuery<DanhMucChung>;
