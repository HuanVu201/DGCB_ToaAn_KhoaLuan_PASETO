using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;
public sealed record GetReactFlowQuyTrinhXuLyQuery(DefaultIdType Id, bool? FilterByChucVu, bool? FilterByChucDanh) : IQuery<ReactFlowQuyTrinhXuLyDto>;
