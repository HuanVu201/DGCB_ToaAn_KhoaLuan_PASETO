using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Queries;
public sealed record GetBoTieuChuanQuery(Guid Id) : IQuery<BoTieuChuan>;
