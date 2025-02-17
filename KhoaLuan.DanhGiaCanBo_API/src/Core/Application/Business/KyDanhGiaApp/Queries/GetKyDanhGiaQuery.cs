using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp.Queries;
public sealed record GetKyDanhGiaQuery(Guid Id) : IQuery<KyDanhGia>;
