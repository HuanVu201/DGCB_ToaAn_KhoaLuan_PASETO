using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Commands;
public sealed class DeleteChildrenGroup : ICommand
{
    public string parentCode { get; set; }
    public bool ForceDelete { get; set; }
}
