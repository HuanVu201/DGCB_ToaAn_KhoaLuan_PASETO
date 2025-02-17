using TD.DanhGiaCanBo.Application.Business.ActionApp;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Queries;

public class SearchActionNotInScreenQueryWhereBuilder
{
    public static string Build(SearchActionNotInScreenQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.ScreenId))
            where += " AND SA.ScreenId = @ScreenId ";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchActionNotInScreenQueryHandler : IRequestHandler<SearchActionNotInScreenQuery, PaginationResponse<ActionDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchActionNotInScreenQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ActionDto>> Handle(SearchActionNotInScreenQuery request, CancellationToken cancellationToken)
    {
        var where = SearchActionNotInScreenQueryWhereBuilder.Build(request);
        var sql = $@"SELECT A.ID, A.Ten, A.Quyen, A.Ma, A.ThuTu 
                    from Business.Actions as A 
                    WHERE A.Id NOT IN (
                        SELECT SA.ActionId
                        FROM Business.ScreenActions SA
	                    {where}) AND A.DeletedOn is null";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ActionDto>(sql, request.PageSize, "ThuTu", cancellationToken, request.PageNumber, request);
        return data;
    }

}