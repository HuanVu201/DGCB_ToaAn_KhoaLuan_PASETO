using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;
public sealed class DeleteDanhGiaDonViCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public bool? ForceDelete { get; set; }
}
