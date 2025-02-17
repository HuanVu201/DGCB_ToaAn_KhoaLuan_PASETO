using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

namespace TD.DanhGiaCanBo.Application.ExportData.Bussiness.DanhSachDanhGiaCaNhan;
public interface IExportExcelDanhGiaCaNhan : IScopedService
{
    public Task<string> ExportDanhSachDanhGiaCaNhan(List<DanhGiaDto> data, string urlPhoi);

}