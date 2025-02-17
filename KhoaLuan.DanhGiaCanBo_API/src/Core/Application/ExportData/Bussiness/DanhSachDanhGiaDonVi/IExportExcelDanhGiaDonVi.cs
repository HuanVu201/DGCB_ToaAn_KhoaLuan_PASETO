using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp;

namespace TD.DanhGiaCanBo.Application.ExportData.Bussiness.DanhSachDanhGiaDonVi;
public interface IExportExcelDanhGiaDonVi : IScopedService
{
    public Task<string> ExportDanhSachDanhGiaDonVi(List<DanhGiaDonViDto> data, string urlPhoi);

}