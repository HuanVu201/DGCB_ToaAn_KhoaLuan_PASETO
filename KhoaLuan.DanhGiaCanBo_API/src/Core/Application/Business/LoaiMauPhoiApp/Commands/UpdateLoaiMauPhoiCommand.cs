using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.LoaiMauPhoiApp.Commands;
public sealed class UpdateLoaiMauPhoiCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? MaMauPhoi { get; set; }
    public string? TenMaMauPhoi { get; set; }
}
