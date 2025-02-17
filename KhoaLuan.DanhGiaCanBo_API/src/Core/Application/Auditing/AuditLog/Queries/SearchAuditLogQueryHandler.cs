using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.AuditLogApp.Dtos;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Zalo;

namespace TD.DanhGiaCanBo.Application.Business.AuditLogApp.Queries;

public class SearchAuditLogQueryWhereBuilder
{
    public static string Build(SearchAuditLogQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.UserName))
            where += " AND u.UserName Like N'%' + @UserName + '%'";
        if (!string.IsNullOrEmpty(req.Type))
            where += " AND at.Type Like N'%' + @Type + '%'";
        if (!string.IsNullOrEmpty(req.TableName))
            where += " AND at.TableName Like N'%' + @TableName + '%'";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchAuditLogQueryHandler : IRequestHandler<SearchAuditLogQuery, PaginationResponse<AuditLogDetailDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchAuditLogQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<AuditLogDetailDto>> Handle(SearchAuditLogQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var where = SearchAuditLogQueryWhereBuilder.Build(request);
            //          var sql = $@"SELECT at.[Id]
            //    ,at.[UserId]
            //    ,at.[Type]
            //    ,at.[TableName]
            //    ,at.[DateTime]
            //    ,at.[OldValues]
            //    ,at.[NewValues]
            //    ,at.[AffectedColumns]
            //    ,at.[PrimaryKey]
            //    ,at.[TenantId]
            // ,u.UserName
            //FROM [AuditTrails] at
            //Left Join [Identity].[ApplicationUserGroups] aug  ON at.UserId = aug.Id
            //Left Join [Identity].[Users] u On u.id = aug.UserId {where}";


            //        LEFT JOIN
            //[Identity].[Users] u2 ON u2.Id = aug.UserId
            //COALESCE(u.FullName, u2.FullName) AS FullName,
            // COALESCE(u.UserName, u2.UserName) AS UserName

            //            var sql2 = $@"SELECT 
            //    at.[Id],   
            //    at.[UserId], 
            //    at.[Type], 
            //    at.[TableName], 
            //    at.[DateTime], 
            //    at.[AffectedColumns], 
            //    at.[PrimaryKey], 

            // COALESCE(u.FullName,'root.admin') AS FullName,  
            //    COALESCE(u.UserName, 'root.admin') AS UserName 
            //FROM 
            //    [Auditing].[AuditTrails] at
            //LEFT JOIN 
            //    [Identity].[Users] u ON at.UserId = u.Id 
            //LEFT JOIN 
            //    [Identity].[ApplicationUserGroups] aug ON at.UserId = aug.Id 

            //  {where}";

            var sql12 = $@"  SELECT 
    at.[Id],   
    at.[UserId], 
    at.[Type], 
    at.[TableName], 
    at.[DateTime], 
    at.[AffectedColumns], 
    at.[PrimaryKey], 
	COALESCE(u.FullName,N'Quản trị hệ thống') AS FullName,
	COALESCE(u.UserName,'root.admin') AS UserName
FROM 
    [Auditing].[AuditTrails] at
LEFT JOIN 
    [Identity].[ApplicationUserGroups] aug ON at.UserId = aug.Id 
LEFT JOIN 
   [Identity].[Users] u ON aug.UserId = u.Id
{where}
";
            var data = await _dapperRepository.PaginatedListSingleQueryAsync<AuditLogDetailDto>(sql12, request.PageSize, "DateTime DESC", cancellationToken, request.PageNumber, request);
            return data;
        }
        catch(Exception ex)
        {
            throw new NotFoundException($"Lỗi : {ex.Message}");
        }
        return null;
    }
}
