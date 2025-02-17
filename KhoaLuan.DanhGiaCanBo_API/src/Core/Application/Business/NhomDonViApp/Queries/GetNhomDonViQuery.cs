using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Queries;
public sealed record GetNhomDonViQuery(Guid Id) : IQuery<ChiTietNhomDonViDto>;
