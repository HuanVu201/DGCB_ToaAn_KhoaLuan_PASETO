using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;
public class GetGroupChildQuery : IQuery<List<GroupChildDto>>
{
    public string? GroupCode { get; set; } 
    public string? Category { get; set; }
}
