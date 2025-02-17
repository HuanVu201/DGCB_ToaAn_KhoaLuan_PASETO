using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;
public sealed record GetMauPhieuDanhGiaQuery(Guid Id) : IQuery<MauPhieuDanhGia>;
