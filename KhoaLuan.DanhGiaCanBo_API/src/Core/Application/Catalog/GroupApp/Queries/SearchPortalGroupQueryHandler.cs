using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;

public class SearchPortalGroupQueryWhereBuilder
{
    public static string Build(SearchPortalGroupQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.GroupCode))
            where += " AND GroupCode = @GroupCode";
        if (!string.IsNullOrEmpty(req.GroupName))
            where += " AND GroupName like N'%' + @GroupName+ '%'";
        if (req.IsRootGroupCode == true)
            where += " AND OfGroupCode is null";
        if (!string.IsNullOrEmpty(req.OfGroupCode))
        {
            if (req.GetAllChildren == true)
            {
                where += $" AND OfGroupCode IN (SELECT GroupCode FROM Catalog.Groups WHERE Catalog.Groups.OfGroupCode = @OfGroupCode)";
            }
            else
            where += " AND OfGroupCode = @OfGroupCode";
        }
        if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
            where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%'";
        if (!string.IsNullOrEmpty(req.Catalog))
        {
            if(req.Catalog == "so-ban-nganh")
                where += " AND Catalog IN ('cnvpdk', 'so-ban-nganh')";
            else
                where += " AND Catalog = @Catalog";

        }

        if (!string.IsNullOrEmpty(req.OtherCatalog))
            where += " AND OtherCatalog LIKE '%'+@OtherCatalog+'%'";
        if (req.Catalogs != null && req.Catalogs.Count > 0)
            where += " AND Catalog in @Catalogs";
        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND MaDinhDanh like '%'+@MaDinhDanh+'%'";
        if (!string.IsNullOrEmpty(req.Type))
            where += " AND Type = @Type";
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchPortalGroupQueryHandler : IRequestHandler<SearchPortalGroupQuery, PaginationResponse<PortalGroupDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchPortalGroupQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<PortalGroupDto>> Handle(SearchPortalGroupQuery request, CancellationToken cancellationToken)
    {
        var where = SearchPortalGroupQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id, GroupCode, GroupName, OfGroupCode, OfGroupName, Type, Catalog, OtherCatalog, GroupOrder, MaDinhDanh FROM Catalog.Groups {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<PortalGroupDto>(sql, request.PageSize, "GroupCode", cancellationToken, request.PageNumber, request);
        return data;
    }
}
