using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
public sealed class UpdateUrlPhieuDanhGiaCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? UrlPdf { get; set; }
    public string? UrlDocx { get; set; }
    public bool? IsKySoCaNhan { get; set; }
    public bool? IsKySoNhanXet { get; set; }
    public bool? IsKySoThamMuu { get; set; }
    public bool? IsKySoLanhDao { get; set; }

}
