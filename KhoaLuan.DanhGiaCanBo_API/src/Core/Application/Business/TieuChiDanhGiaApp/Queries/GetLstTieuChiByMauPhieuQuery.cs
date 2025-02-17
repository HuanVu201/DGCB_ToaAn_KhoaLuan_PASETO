using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
public class GetLstTieuChiByMauPhieuQuery : IQuery<TieuChiDanhGiaByMauPhieuDanhGiaDto>
{
    public string? MaMauPhieuDanhGia { get; set; }
    public string? MaDonVi { get; set; }
    public bool? CheckKiemNhiem { get; set; }
    public string? Level { get; set; }
    public bool? Removed { get; set; } = false;
    public bool? Active { get; set; } = null;
    public bool? FilterByUserRole { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
}
