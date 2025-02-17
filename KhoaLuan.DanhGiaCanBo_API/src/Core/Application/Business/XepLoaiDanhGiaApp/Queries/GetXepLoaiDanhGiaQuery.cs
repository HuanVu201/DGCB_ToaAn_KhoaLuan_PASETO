using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Queries;
public sealed record GetXepLoaiDanhGiaQuery(Guid Id) : IQuery<XepLoaiDanhGia>;
