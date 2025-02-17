using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using System.Drawing.Drawing2D;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Commands;
public sealed class UpdateGroupCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }
    public string? OfGroupCode { get; set; }
    public string? OfGroupName { get; set; }
    public string? OfGroupId { get; set; }
    public int? GroupOrder { get; set; }
    public bool? Active { get; set; }
    public string? Type { get; set; }
    public string? Catalog { get; set; }
    public string? OtherCatalog { get; set; }
    public string? FullCode { get; set; }
    public string? Description { get; set; }
    public Guid? InChargeID { get; set; }

    public bool? IsKhongDanhGia { get; set; }
    public bool? IsKhongThongKe { get; set; }
}
