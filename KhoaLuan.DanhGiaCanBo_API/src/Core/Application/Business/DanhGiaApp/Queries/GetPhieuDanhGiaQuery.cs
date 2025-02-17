using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
public sealed record GetPhieuDanhGiaQuery(Guid Id, int? DaXem) : IQuery<GetDanhGiaDto>;

public class GetDanhGiaDto : DanhGia, IDto
{
    public List<ChiTietDanhGiaDto>? MauPhieus { get; set; }
}
