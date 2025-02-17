using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;

namespace TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaDonVi;
public interface IExportPhieuDanhGiaDonVi : IScopedService
{
    public Task<UrlPhieuDanhGiaDto> ExportPhieuDanhGiaDonVi(GetDanhGiaDonViDto data, string urlPhoi);

}