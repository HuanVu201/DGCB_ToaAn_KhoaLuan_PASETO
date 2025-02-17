using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
public sealed record GetPhieuDanhGiaDonViQuery(Guid Id, int? DaXem) : IQuery<GetDanhGiaDonViDto>;

public class GetDanhGiaDonViDto : DanhGiaDonVi, IDto
{
    public List<ChiTietDanhGiaDonViDto>? MauPhieus { get; set; }
}
