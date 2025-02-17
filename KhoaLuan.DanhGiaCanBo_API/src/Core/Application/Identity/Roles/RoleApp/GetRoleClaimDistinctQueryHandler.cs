using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.RoleClaimDistinctApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Identity.RoleClaimDistincts;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.RoleClaimDistinctApp.Queries;

public class SearchRoleClaimDistinctQueryWhereBuilder
{
    public static string Build(GetRoleClaimDistinctQuery req)
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
public class GetRoleClaimDistinctQueryHandler : IRequestHandler<GetRoleClaimDistinctQuery, List<RoelClaimDistinct>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public GetRoleClaimDistinctQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<List<RoelClaimDistinct>> Handle(GetRoleClaimDistinctQuery request, CancellationToken cancellationToken)
    {
        var where = SearchRoleClaimDistinctQueryWhereBuilder.Build(request);
        var sql = $@"SELECT DISTINCT 
    [ClaimValue],
	[Description]
    FROM 
    [Identity].[RoleClaims] {where}";
        var data = await _dapperRepository.QueryAsync<RoelClaimDistinct>(sql,request);
        return data.ToList();
    }
}
