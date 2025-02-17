using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Commands;
public class AddGroupCommand : ICommand<Guid>
{
    public string GroupCode { get; set; }
    public string GroupName { get; set; }
    public string? OfGroupCode { get; set; }
    public string? OfGroupName { get; set; }
    public string? OfGroupId { get; set; }
    public string? FullCode { get; set; }
    public int? GroupOrder { get; set; }
    public bool? Active { get; set; }
    public string? Description { get; set; }
    public string Type { get; set; }
    public string? Catalog { get; set; }
    public string? OtherCatalog { get; set; }
    public int? ThuTu { get; set; }
    public Guid? InChangeId { get; set;}
    public bool? isKhongDanhGia { get; set; } = false;

    public bool? IsKhongThongKe { get; set; } = false;
}
