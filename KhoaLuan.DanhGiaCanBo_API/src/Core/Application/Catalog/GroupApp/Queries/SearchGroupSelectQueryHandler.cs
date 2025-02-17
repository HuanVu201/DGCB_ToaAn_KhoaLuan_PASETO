using MediatR;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;

public class SearchGroupSelectQueryWhereBuilder
{
    public static string Build(SearchGroupSelectQuery req)
    {
        string where = string.Empty;

        if (!string.IsNullOrEmpty(req.GroupName))
            where += " AND GroupName like N'%' + @GroupName+ '%'";
        if (req.IsRootGroupCode == true)
            where += " AND OfGroupCode is null";
        if (!string.IsNullOrEmpty(req.OfGroupCode))
        {
            where += " AND OfGroupCode = @OfGroupCode";
        }
        //if (!string.IsNullOrEmpty(req.MaDinhDanhCha)  )
        //{
        //    if (req.ChiBaoGomDonViCon == true)
        //    {
        //        where += $" AND (MaDinhDanh Like @MaDinhDanhCha +'%' AND MaDinhDanh != @MaDinhDanhCha) ";
        //    }
        //    else
        //    {
        //        where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%' ";
        //    }
        //}    
        if(!string.IsNullOrEmpty(req.DonViQuanLy))
        {
            where += $"AND (DonViQuanLy = @DonViQuanLy OR GroupCode = @DonViQuanLy OR OfGroupCode = @DonViQuanLy) ";
        }
        if (!string.IsNullOrEmpty(req.Catalog))
            where += " AND Catalog = @Catalog";
        if (!string.IsNullOrEmpty(req.OtherCatalog))
            where += " AND OtherCatalog LIKE '%'+@OtherCatalog+'%'";
        if (req.Catalogs != null && req.Catalogs.Count > 0)
            where += " AND Catalog in @Catalogs";
        //if (!string.IsNullOrEmpty(req.MaDinhDanh))
        //    where += " AND MaDinhDanh = @MaDinhDanh ";
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
public class SearchGroupSelectQueryHandler : IRequestHandler<SearchGroupSelectQuery, PaginationResponse<GroupChonDto>>
{
    private readonly string groupTableName = "Catalog.Groups";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchGroupSelectQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<GroupChonDto>> Handle(SearchGroupSelectQuery request, CancellationToken cancellationToken)
    {
        var where = SearchGroupSelectQueryWhereBuilder.Build(request);

        var sql = $@"SELECT Id, GroupCode, GroupName FROM {groupTableName} {where}";
        if (request.GetAllChildren == true)
        {
            string tmpWhere = where;
            // lưu ý trong hàm PaginatedListSingleQueryAsync đã có With Main AS (sql).
            if (!string.IsNullOrEmpty(request.GroupCode))
            {
                if (!string.IsNullOrEmpty(where)) tmpWhere += " AND GroupCode = @GroupCode"; else tmpWhere = "WHERE GroupCode = @GroupCode";
            }
            sql = $"( " +
                $"SELECT DISTINCT ID, GroupCode, GroupName FROM {groupTableName} {tmpWhere} " +
                $"  UNION ALL " +
                $" SELECT g.ID, g.GroupCode, g.GroupName " +
                $"FROM {groupTableName} g " +
                $"JOIN Main c ON g.OfGroupCode = c.GroupCode " +
                $")";
        }
        string order = string.Empty;

        var lstOrderCol = request.OrderBy != null && request.OrderBy.Length > 0 ? request.OrderBy.ToList() : new List<string>() { "GroupCode" };
        foreach (var item in lstOrderCol.Select((value, index) => new { index, value }))
        {
            order += $" Main.{Regex.Replace(item.value, @"[^0-9a-zA-Z]+", " ")},";
        }

        var results = new PaginationResponse<GroupChonDto>();
        order = !string.IsNullOrEmpty(order) ? "ORDER BY " + order.Substring(0, order.Length - 1) : string.Empty;
        var paging = $" OFFSET {(request.PageNumber - 1) * request.PageSize} ROWS FETCH NEXT {request.PageSize} ROWS ONLY";
        var queryFull = $"WITH Main AS({sql}), Total AS (SELECT COUNT(ID) AS[TotalCount] FROM Main) SELECT DISTINCT * FROM Main, Total {where} {order} {paging}";
        var res = await _dapperRepository.QueryAsync<GroupChonDto>(queryFull, request);
        var data = res.ToList();
        if (data.Count > 0)
        {
            JObject jobj = JObject.Parse(JsonConvert.SerializeObject(data.First()));
            results.Data = data;
            results.TotalCount = int.Parse(jobj["TotalCount"].ToString());
            results.TotalPages = (int)Math.Ceiling(results.TotalCount / (double)request.PageSize);
        }
        return results;
    }
}
