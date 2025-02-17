using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
public sealed class CapNhatDuLieuThongKeDonViCommand : ICommand
{
    [JsonIgnore]
    public string XuLy { get; set; }
    public List<DanhGia> LstItem { get; set; }
    public string? IdKhoiPhuc { get; set; }  = null;

}
