using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Business.ScreenApp.Queries;

public class SearchScreenQueryWhereBuilder
{
    public static string Build(SearchScreenQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND Ten = @Ten";
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
public class SearchScreenQueryHandler : IRequestHandler<SearchScreenQuery, PaginationResponse<ScreenDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchScreenQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ScreenDto>> Handle(SearchScreenQuery request, CancellationToken cancellationToken)
    {
        var where = SearchScreenQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id, Ma FROM Business.Screens {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ScreenDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
