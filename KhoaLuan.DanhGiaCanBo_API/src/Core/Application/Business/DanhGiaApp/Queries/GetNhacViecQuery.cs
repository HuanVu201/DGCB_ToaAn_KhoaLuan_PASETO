using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;


public class GetNhacViecQuery : IQuery<List<NhacViecDto>>
{
    public string? MaDV { get; set; }
    public string? TaiKhoan { get; set; }
    public string? LoaiThoiGian { get; set; }
}
