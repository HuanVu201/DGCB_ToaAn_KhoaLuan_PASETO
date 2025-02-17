using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Business.ActionApp.Queries;

public class SearchActionQueryWhereBuilder
{
    public static string Build(SearchActionQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
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
public class SearchActionQueryHandler : IRequestHandler<SearchActionQuery, PaginationResponse<ActionDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchActionQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ActionDto>> Handle(SearchActionQuery request, CancellationToken cancellationToken)
    {
        var where = SearchActionQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id, Ten, Quyen, ThuTu, Ma ,MoTa, IconName, ColorCode, ShowInModal, ShowInTable FROM Business.Actions {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ActionDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
