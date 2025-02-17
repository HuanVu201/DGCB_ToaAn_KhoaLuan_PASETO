using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Queries;

public class SearchConfigQueryWhereBuilder
{
    public static string Build(SearchConfigQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Name))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.Code))
            where += " AND Code N'%' + @Code + '%'";
        if (!string.IsNullOrEmpty(req.Module))
            where += " AND Module = @Module";
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
public class SearchConfigQueryHandler : IRequestHandler<SearchConfigQuery, PaginationResponse<ConfigDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchConfigQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ConfigDto>> Handle(SearchConfigQuery request, CancellationToken cancellationToken)
    {
        var where = SearchConfigQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id, Ten, Code, Module, Content FROM Catalog.Configs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ConfigDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
