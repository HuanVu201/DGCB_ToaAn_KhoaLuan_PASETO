using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp.Queries;
public sealed record GetTrangThaiDanhGiaQuery(Guid Id) : IQuery<TrangThaiDanhGia>;
