using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using System.Text.Json.Serialization;


namespace TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp.Commands;
public sealed class DeleteTaiLieuHDSDCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public bool ForceDelete { get; set; }
}
