using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Application.Catalog.NhomNguoiDungApp;
using TD.DanhGiaCanBo.Application.Catalog.NhomNguoiDungApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Catalog.NhomNguoiDungApp.Queries;

public class SearchNhomNguoiDungQueryWhereBuilder
{
    public static string Build(SearchNhomNguoiDungQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
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
public class SearchNhomNguoiDungQueryHandler : IRequestHandler<SearchNhomNguoiDungQuery, PaginationResponse<NhomNguoiDungDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchNhomNguoiDungQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<NhomNguoiDungDto>> Handle(SearchNhomNguoiDungQuery request, CancellationToken cancellationToken)
    {
        var where = SearchNhomNguoiDungQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id, Ten FROM Catalog.NhomNguoiDungs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<NhomNguoiDungDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
