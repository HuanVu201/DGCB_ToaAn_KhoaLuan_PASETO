using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using static TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries.GetTKDanhGIaCaNhanQueryHandler;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;


public class GetTKDanhGIaCaNhanQuery : IQuery<List<DataThongKeSLDGDto>>
{
    public string ThoiGianQueryTN { get; set; }
    public string ThoiGianQueryDN { get; set; }
    public string LoaiThoiGian { get; set; }
}
