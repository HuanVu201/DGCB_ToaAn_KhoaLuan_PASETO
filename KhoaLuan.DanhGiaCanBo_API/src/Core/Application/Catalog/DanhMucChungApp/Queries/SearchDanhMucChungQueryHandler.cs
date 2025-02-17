using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Application.Catalog.DanhMucChungApp;
using TD.DanhGiaCanBo.Application.Catalog.DanhMucChungApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Catalog.DanhMucChungApp.Queries;

public class SearchDanhMucChungQueryWhereBuilder
{
    public static string Build(SearchDanhMucChungQuery req)
    {
        string where = string.Empty;
        
           if (!string.IsNullOrEmpty(req.Type))
            where += " AND Type = @Type";
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND Ma Like N'%' + @Ma + '%'";
        if (!string.IsNullOrEmpty(req.TenDanhMuc))
            where += " AND TenDanhMuc Like N'%' + @TenDanhMuc + '%'";
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
public class SearchDanhMucChungQueryHandler : IRequestHandler<SearchDanhMucChungQuery, PaginationResponse<DanhMucChungDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchDanhMucChungQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<DanhMucChungDto>> Handle(SearchDanhMucChungQuery request, CancellationToken cancellationToken)
    {
        var where = SearchDanhMucChungQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id,TenDanhMuc,ThuTu,Active,Type,Code,DuocChamNhieuLan,DinhKem FROM Catalog.DanhMucChungs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhMucChungDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
