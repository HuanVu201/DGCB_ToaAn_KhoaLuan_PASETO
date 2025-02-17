using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp.Queries;

public class SearchTrangThaiDanhGiaQueryWhereBuilder
{
    public static string Build(SearchTrangThaiDanhGiaQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (req.LaTrangThaiDonVi == true)
            where += " AND LaTrangThaiDonVi = 1";
        else if (req.LaTrangThaiDonVi == false)
            where += " AND LaTrangThaiDonVi = 0";
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND Ma Like N'%' + @Ma + '%'";
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
public class SearchTrangThaiDanhGiaQueryHandler : IRequestHandler<SearchTrangThaiDanhGiaQuery, PaginationResponse<TrangThaiDanhGiaDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchTrangThaiDanhGiaQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<TrangThaiDanhGiaDto>> Handle(SearchTrangThaiDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var where = SearchTrangThaiDanhGiaQueryWhereBuilder.Build(request);
        var sql = $@"SELECT * FROM {TableNames.TrangThaiDanhGias} {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TrangThaiDanhGiaDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
