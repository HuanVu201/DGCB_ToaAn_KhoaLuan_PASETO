using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Commands;
public class AddMauPhoiCommand : ICommand<Guid>
{
    public string LoaiPhoi { get; set; } = string.Empty;
    public string MaMauPhoi { get; set; } = string.Empty;
    public string TenMauPhoi { get; set; } = string.Empty;
    public string? MaDonVi { get; set; }
    public string? UrlMauPhoi { get; set; }
    public bool? LaPhoiMacDinh { get; set; }
    public string? CustomerId { get; set; }
}