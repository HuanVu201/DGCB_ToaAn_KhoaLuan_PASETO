using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;
public sealed record GetQuyTrinhXuLyQuery(DefaultIdType Id) : IQuery<ChiTietQuyTrinhXuLyDto>;
