using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;


public class GetTieuChiTheoTatCaDoiTuongQuery : IQuery<List<TieuChiTheoTatCaDoiTuongDto>>
{
    public string? MaDonVi { get; set; }
    public string? MaBoTieuChi { get; set; }
    public string? LocLevel { get; set; }
    public string? LoaiThoiGian { get; set; }
    public bool? Removed { get; set; } = false;
    public bool? Active { get; set; } = null;
    public bool? FilterByUserRole { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
}
