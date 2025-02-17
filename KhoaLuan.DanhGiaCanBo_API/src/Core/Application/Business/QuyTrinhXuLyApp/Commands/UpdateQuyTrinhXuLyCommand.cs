using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;
public sealed class UpdateQuyTrinhXuLyCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? TenQuyTrinh { get; set; }
    public int? ThuTu { get; set; }
    public List<string>? DonViLoaiTrus { get; set; }
    public List<string>? DonViIds { get; set; }
}
