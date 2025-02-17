using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.ActionApp;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Queries;

public class SearchScreenActionQueryWhereBuilder
{
    public static string Build(SearchScreenActionQuery req)
    {
        string where = "A.DeletedOn is null and S.DeletedOn is null ";
        if (!string.IsNullOrEmpty(req.MaScreen))
            where += " AND S.Ma = @MaScreen ";
        if (!string.IsNullOrEmpty(req.ScreenId))
            where += " AND S.Id = @ScreenId ";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchScreenActionQueryHandler : IRequestHandler<SearchScreenActionQuery, PaginationResponse<ScreenActionDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchScreenActionQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ScreenActionDto>> Handle(SearchScreenActionQuery request, CancellationToken cancellationToken)
    {
        var where = SearchScreenActionQueryWhereBuilder.Build(request);
        var sql = $@"SELECT SA.ID, S.ID as ScreenId, A.Id as ActionId, S.Ma as MaScreen, S.ShowActionInModal, S.ShowActionInTable, A.Ten, A.Quyen, A.Ma as MaAction, A.ThuTu, A.IconName, A.ColorCode, A.ShowInModal, A.ShowInTable
                    FROM Business.ScreenActions as SA
                    inner join Business.Screens as S on SA.ScreenId = S.Id
                    inner join Business.Actions as A on SA.ActionId = A.Id
                    {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ScreenActionDto>(sql, request.PageSize, "ThuTu", cancellationToken, request.PageNumber, request);
        return data;
    }
}
