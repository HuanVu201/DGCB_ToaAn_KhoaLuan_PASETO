using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Commands;
public sealed class UpdateConfigCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? Ten { get; set; }
    public string? Code { get; set; }
    public int? ThuTu { get; set; }
    public bool? Active { get; set; }
    public string? Module { get; set; }
    public string? Content { get; set; }
    public string? Note { get; set; }
}
