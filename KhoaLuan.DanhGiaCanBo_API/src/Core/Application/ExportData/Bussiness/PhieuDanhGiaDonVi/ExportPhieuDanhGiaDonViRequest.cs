using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

namespace TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaDonVi;
public class ExportPhieuDanhGiaDonViRequest : IRequest<Result<UrlPhieuDanhGiaDto>>
{
    public DefaultIdType DanhGiaId { get; set; }
    public bool? Refresh { get; set; } = false;
}