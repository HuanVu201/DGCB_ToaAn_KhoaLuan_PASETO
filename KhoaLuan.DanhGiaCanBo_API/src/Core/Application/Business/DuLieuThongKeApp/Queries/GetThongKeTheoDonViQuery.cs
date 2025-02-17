using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DuLieuThongKeApp;

namespace TD.DanhGiaCanBo.Application.Catalog.DuLieuThongKeApp.Queries;
public class GetThongKeTheoDonViQuery : IQuery<List<DuLieuThongKeDonViDto>>
{
    public string? groupCode { get; set; } 
    public bool? includeChild { get; set; }
    public string? loaiThoiGian { get; set; }
    public string? kyDanhGia { get; set; }
    public int? namDanhGia { get; set; } = 0;
    public int? skip { get; set; } = 0;
    public int? top { get; set; } = 200;
    public int? ThoiGianQueryFrom { get; set; } = 0;
    public int? ThoiGianQueryTo { get; set; } = 0;
    public string? orderBy { get; set; } = null;
    public string? Category { get; set; } = null;
}
