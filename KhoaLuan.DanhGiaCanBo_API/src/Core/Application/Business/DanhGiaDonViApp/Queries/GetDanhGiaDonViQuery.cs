using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
public sealed record GetDanhGiaDonViQuery(Guid Id) : IQuery<DanhGiaDonVi>;
