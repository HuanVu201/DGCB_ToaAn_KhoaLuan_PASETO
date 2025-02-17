using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Application.Catalog.LogAPIApp;
using TD.DanhGiaCanBo.Application.Catalog.LogAPIApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAPIApp.Queries;

public class SearchLogAPIQueryWhereBuilder
{
    public static string Build(SearchLogAPIQuery req)
    {
        string where = string.Empty;
        
           if (!string.IsNullOrEmpty(req.TenAPI))
            where += " AND Ten = @TenAPI";
             if (!string.IsNullOrEmpty(req.LoaiQuanLy))
            where += " AND LoaiQuanLy = @LoaiQuanLy";
        if (!string.IsNullOrEmpty(req.LoaiDichVu))
            where += " AND LoaiDichVu = @LoaiDichVu";
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
public class SearchLogAPIQueryHandler : IRequestHandler<SearchLogAPIQuery, PaginationResponse<LogAPIDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchLogAPIQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LogAPIDto>> Handle(SearchLogAPIQuery request, CancellationToken cancellationToken)
    {
        var where = SearchLogAPIQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id,Ten,TenAPI,CreatedOn FROM Catalog.LogAPIs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LogAPIDto>(sql, request.PageSize, "CreatedOn  DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}
