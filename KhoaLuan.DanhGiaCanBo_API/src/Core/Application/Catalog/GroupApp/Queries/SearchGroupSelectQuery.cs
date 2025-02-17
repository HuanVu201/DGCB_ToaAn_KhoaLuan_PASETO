using Newtonsoft.Json;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;
public class SearchGroupSelectQuery : PaginationFilter, IRequest<PaginationResponse<GroupChonDto>>
{
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }
    public string? OfGroupCode { get; set; }
    public string? OfGroupName { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public bool? GetAllChildren { get; set; }
    public string? Catalog { get; set; }
    public string? OtherCatalog { get; set; }
    public List<string>? Catalogs { get; set; }
    public string? DonViQuanLy { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public bool? IsRootGroupCode { get; set; }
    public string? Type { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
