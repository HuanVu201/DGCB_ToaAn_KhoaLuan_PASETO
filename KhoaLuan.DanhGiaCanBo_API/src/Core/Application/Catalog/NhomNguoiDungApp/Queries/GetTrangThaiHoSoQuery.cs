using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.NhomNguoiDungApp.Queries;
public sealed record GetNhomNguoiDungQuery(Guid Id) : IQuery<NhomNguoiDung>;
