using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
public sealed record GetTieuChiDanhGiaQuery(Guid Id) : IQuery<TieuChiDanhGia>;
