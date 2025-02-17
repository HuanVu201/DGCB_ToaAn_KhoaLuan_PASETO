using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.ChucDanhApp;
using TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Queries;

public class SearchChucDanhQueryWhereBuilder
{
    public static string Build(SearchChucDanhQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND Ma Like N'%' + @Ma + '%'";
        if (!string.IsNullOrEmpty(req.MaCapDanhGia))
            where += " AND MaCapDanhGia = @MaCapDanhGia";
        if (!string.IsNullOrEmpty(req.TenCapDanhGia))
            where += " AND TenCapDanhGia Like N'%' + @TenCapDanhGia + '%'";
        if (!string.IsNullOrEmpty(req.Id))
            where += " AND Id = @Id";
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
public class SearchChucDanhQueryHandler : IRequestHandler<SearchChucDanhQuery, PaginationResponse<ChucDanhDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchChucDanhQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ChucDanhDto>> Handle(SearchChucDanhQuery request, CancellationToken cancellationToken)
    {
        var where = SearchChucDanhQueryWhereBuilder.Build(request);
        var sql = $@"SELECT * FROM {TableNames.ChucDanhs} {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ChucDanhDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
