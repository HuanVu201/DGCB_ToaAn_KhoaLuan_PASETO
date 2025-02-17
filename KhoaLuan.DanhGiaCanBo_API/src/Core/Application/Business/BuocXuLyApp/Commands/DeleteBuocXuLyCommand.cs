using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Commands;
public sealed class DeleteBuocXuLyCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public bool ForceDelete { get; set; }
}
