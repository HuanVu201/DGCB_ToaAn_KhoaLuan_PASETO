using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class DongBoDanhGiaCoCauQuery : IQuery<DongBoDanhGiaCoCauDto>
{
    public int? thoiGianQuery { get; set; }
    public string? maDonVi { get; set; }
    public string? userId { get; set; }
    public string? maPhongBan { get; set; }
    public string? includes { get; set; } = "0";

    public string? thaoTac { get; set; }
    public string? capNhatTT { get; set; }
    public string? dongBoUser { get; set; }
  
}
