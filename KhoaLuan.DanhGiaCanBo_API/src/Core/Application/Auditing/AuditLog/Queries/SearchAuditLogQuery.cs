using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.AuditLogApp.Dtos;

namespace TD.DanhGiaCanBo.Application.Business.AuditLogApp.Queries;


public class SearchAuditLogQuery : PaginationFilter, IRequest<PaginationResponse<AuditLogDetailDto>>
{
    public string? UserName { get; set; }
    public string? Type { get; set; }

    public string? TableName { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
