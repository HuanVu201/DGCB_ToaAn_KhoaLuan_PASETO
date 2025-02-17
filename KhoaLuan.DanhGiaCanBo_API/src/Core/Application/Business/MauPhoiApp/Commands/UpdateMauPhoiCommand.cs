using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Commands;
public sealed class UpdateMauPhoiCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? LoaiPhoi { get; set; }
    public string? MaMauPhoi { get; set; }
    public string? TenMauPhoi { get; set; }
    public string? MaDonVi { get; set; }
    public string? UrlMauPhoi { get; set; }
    public bool? LaPhoiMacDinh { get; set; }
}
