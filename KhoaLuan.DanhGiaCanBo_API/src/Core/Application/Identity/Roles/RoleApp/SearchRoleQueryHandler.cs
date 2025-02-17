using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.RoleApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Identity.Roles;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.RoleApp.Queries;

public class SearchRoleQueryWhereBuilder
{
    public static string Build(SearchRoleQuery req)
    {
        string where = string.Empty;
        //if (!string.IsNullOrEmpty(req.Ten))
        //    where += " AND Ten Like N'%' + @Ten + '%'";
        //if (!string.IsNullOrEmpty(req.Ma))
        //    where += " AND Ma Like N'%' + @Ma + '%'";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchRoleQueryHandler : IRequestHandler<SearchRoleQuery, PaginationResponse<RoleDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchRoleQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<RoleDto>> Handle(SearchRoleQuery request, CancellationToken cancellationToken)
    {
        var where = SearchRoleQueryWhereBuilder.Build(request);
        var sql = $@"SELECT * FROM [Identity].[Roles] {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<RoleDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
