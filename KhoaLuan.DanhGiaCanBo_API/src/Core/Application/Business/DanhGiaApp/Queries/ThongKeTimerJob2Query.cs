using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DuLieuThongKeApp;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
public class ThongKeTimerJob2Query : IQuery<List<DataDGAutoThongKe>>
{
    public string? MaDonVi { get; set; }
    public string? Type { get; set; }
    public bool? IncludeChild { get; set; }
    public bool? IncludeAll { get; set; }
    public bool? ReturnRes { get; set; } = false;
     public int? ThoiGianQuery { get; set; } = 0;
}
