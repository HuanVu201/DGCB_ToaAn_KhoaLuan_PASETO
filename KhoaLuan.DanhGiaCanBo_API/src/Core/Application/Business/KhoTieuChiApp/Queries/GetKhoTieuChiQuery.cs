using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Queries;
public sealed record GetKhoTieuChiQuery(Guid Id) : IQuery<KhoTieuChi>;
