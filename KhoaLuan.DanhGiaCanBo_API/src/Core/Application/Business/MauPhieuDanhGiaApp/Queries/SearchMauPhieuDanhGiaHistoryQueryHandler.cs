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
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;

//public class SearchMauPhieuDanhGiaHistoryQueryWhereBuilder
//{
//    public static string Build(SearchMauPhieuDanhGiaHistoryQuery req)
//    {
//        string where = string.Empty;

//        if (!string.IsNullOrEmpty(req.Ten))
//            where += " AND Ten like N'%' + @Ten+ '%'";
//        //if (req.IsRootGroupCode == true)
//        //    where += " AND OfGroupCode is null";
//        if (!string.IsNullOrEmpty(req.LevelBoTieuChi))
//        {
//            where += " AND LevelBoTieuChi = @LevelBoTieuChi";
//        }
//        else
//        {
//            where += " AND LevelBoTieuChi Is Null";
//        }
//        if (req.Removed == false)
//            where += " AND DeletedOn is null";
//        else if (req.Removed == true)
//            where += " AND DeletedOn is not null";
//        if (where.TrimStart().StartsWith("AND"))
//            where = where.TrimStart().Substring("AND".Length);
//        if (where != string.Empty)
//            return $" WHERE ({where})";
//        return where;
//    }
//}
public class SearchMauPhieuDanhGiaHistoryQueryHandler : IRequestHandler<SearchMauPhieuDanhGiaHistoryQuery, PaginationResponse<MauPhieuDanhGiaHistoryDto>>
{
    private readonly string groupTableName = "Catalog.Groups";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchMauPhieuDanhGiaHistoryQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<MauPhieuDanhGiaHistoryDto>> Handle(SearchMauPhieuDanhGiaHistoryQuery request, CancellationToken cancellationToken)
    {
        var sql = $@"Select
        at.[Id]   
      , at.[UserId]
      , at.[Type]
      , at.[TableName]
      , at.[DateTime]
      , at.[AffectedColumns]
      , at.[PrimaryKey]
      ,u.FullName AS UserFullName
      ,u.UserName AS UserUserName 
 FROM 
    [Auditing].[AuditTrails] at
JOIN 
   [Identity].[Users] u ON at.UserId = u.Id 
  Where at.TableName = 'MauPhieuDanhGia' AND at.PrimaryKey Like @MauPhieuDanhGiaId";

        var sql2 = $@"SELECT at.[Id]
      ,at.[UserId]
      ,at.[Type]
      ,at.[TableName]
      ,at.[DateTime]
      ,at.[OldValues]
      ,at.[NewValues]
      ,at.[AffectedColumns]
      ,at.[PrimaryKey]
      ,at.[TenantId]
	  ,u.UserName
  FROM [Auditing].[AuditTrails] at
  Left Join [Identity].[ApplicationUserGroups] aug  ON at.UserId = aug.Id
  Left Join [Identity].[Users] u On u.id = aug.UserId
  Where TableName ='MauPhieuDanhGia'";


        var sql3 = $@"SELECT 
    at.[Id],   
    at.[UserId], 
    at.[Type], 
    at.[TableName], 
    at.[DateTime], 
    at.[AffectedColumns], 
    at.[PrimaryKey], 
    COALESCE(u.FullName, u2.FullName) AS UserFullName,  
    COALESCE(u.UserName, u2.UserName) AS UserUserName 
FROM 
    [Auditing].[AuditTrails] at
LEFT JOIN 
   [Identity].[Users] u ON at.UserId = u.Id 
LEFT JOIN 
    [Identity].[ApplicationUserGroups] aug ON at.UserId = aug.Id 
LEFT JOIN 
    [Identity].[Users] u2 ON u2.Id = aug.UserId 
WHERE 
    at.TableName = 'MauPhieuDanhGia' 
    AND at.PrimaryKey LIKE @MauPhieuDanhGiaId";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<MauPhieuDanhGiaHistoryDto>(sql3, request.PageSize, "DateTime", cancellationToken, request.PageNumber, new {MauPhieuDanhGiaId = "%"+request.MauPhieuDanhGiaId +"%"});
        return data;
    }
}
