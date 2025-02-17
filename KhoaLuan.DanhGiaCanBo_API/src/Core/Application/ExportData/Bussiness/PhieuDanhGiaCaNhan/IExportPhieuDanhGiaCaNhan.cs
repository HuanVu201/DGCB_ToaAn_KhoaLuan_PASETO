using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

namespace TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaCaNhan;
public interface IExportPhieuDanhGiaCaNhan : IScopedService
{
    public Task<UrlPhieuDanhGiaDto> ExportPhieuDanhGiaCaNhan(GetDanhGiaDto data, string urlPhoi);

}