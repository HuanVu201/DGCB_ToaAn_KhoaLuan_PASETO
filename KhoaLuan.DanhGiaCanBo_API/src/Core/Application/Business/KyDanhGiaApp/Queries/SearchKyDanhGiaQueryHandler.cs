using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp.Queries;

public class SearchKyDanhGiaQueryWhereBuilder
{
    public static string Build(SearchKyDanhGiaQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.Id))
            where += " AND Id = @Id";
        if (!string.IsNullOrEmpty(req.MaBoTieuChi))
            where += " AND MaBoTieuChi = @MaBoTieuChi";
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
public class SearchKyDanhGiaQueryHandler : IRequestHandler<SearchKyDanhGiaQuery, PaginationResponse<KyDanhGiaDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchKyDanhGiaQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<KyDanhGiaDto>> Handle(SearchKyDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var where = SearchKyDanhGiaQueryWhereBuilder.Build(request);
        var sql = $@"SELECT * FROM {TableNames.KyDanhGias} {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<KyDanhGiaDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
