using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Classes;

namespace TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaCaNhan;
public class ExportPhieuDanhGiaCaNhanRequest : IRequest<Result<UrlPhieuDanhGiaDto>>
{
    public DefaultIdType DanhGiaId { get; set; }
    public bool? Refresh { get; set; } = false;
}