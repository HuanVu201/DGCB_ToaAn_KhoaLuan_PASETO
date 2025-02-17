using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.MenuApp.Commands;
public sealed class UpdateMenuCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? TenMenu { get; set; }
    public Guid? ParentId { get; set; }
    public int? ThuTuMenu { get; set; }
    public bool? Active { get; set; }
    public string? Module { get; set; }
    public string? FullPath { get; set; }
    public string? IconName { get; set; }
    public string? Permission { get; set; }
    public bool? IsTopMenu { get; set; }
}
