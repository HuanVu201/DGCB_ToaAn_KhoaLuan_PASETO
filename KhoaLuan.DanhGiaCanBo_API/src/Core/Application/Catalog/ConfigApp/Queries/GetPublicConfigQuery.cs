using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Queries;
public class GetPublicConfigQuery : PaginationFilter, IRequest<PaginationResponse<PublicConfigDto>>
{
    [Newtonsoft.Json.JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 100;
    public new int PageNumber { get; set; } = 1;
}


public class PublicConfigDto : IDto
{
    public string Code { get; set; }
    public string Content { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public int TotalCount { get; set; }

}