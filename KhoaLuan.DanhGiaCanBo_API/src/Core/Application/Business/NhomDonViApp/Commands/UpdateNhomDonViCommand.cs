using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Commands;
public sealed class UpdateNhomDonViCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? TenNhom { get; set; }
    public List<string> DonViIds { get; set; }
    public string? MoTa { get; set; }
}
