using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;
public sealed class ThuHoiPhieuDanhGiaDonViCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType Id { get; set; }
    public string TenBuocXuLy { get; set; }
}
