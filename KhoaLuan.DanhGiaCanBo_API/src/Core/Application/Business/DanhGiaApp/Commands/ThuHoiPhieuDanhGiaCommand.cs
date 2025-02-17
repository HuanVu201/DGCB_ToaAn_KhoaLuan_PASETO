using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
public sealed class ThuHoiPhieuDanhGiaCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType Id { get; set; }
    public string TenBuocXuLy { get; set; }
}
