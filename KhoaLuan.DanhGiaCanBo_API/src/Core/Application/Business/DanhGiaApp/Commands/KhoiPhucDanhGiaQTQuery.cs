using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;


public class KhoiPhucDanhGiaQtQuery : ICommand
{
    public string? Id { get; set; }
    public string? nguon { get; set; }
    public string? nguoiXL { get; set; }
    public string? namDanhGia { get; set; }

    public bool? Removed { get; set; } = false;
    public bool? Active { get; set; } = null;
    public bool? FilterByUserRole { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
