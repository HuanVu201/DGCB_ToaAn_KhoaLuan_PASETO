using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
public sealed record GetDanhGiaQuery(Guid Id) : IQuery<DanhGia>;
