using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Application.Business.NhomDonViApp;
using TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Queries;

public class SearchNhomDonViQueryWhereBuilder
{
    public static string Build(SearchNhomDonViQuery req)
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
public class SearchNhomDonViQueryHandler : IRequestHandler<SearchNhomDonViQuery, PaginationResponse<NhomDonViDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchNhomDonViQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<NhomDonViDto>> Handle(SearchNhomDonViQuery request, CancellationToken cancellationToken)
    {
        var where = SearchNhomDonViQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id, TenNhom, MoTa FROM {TableNames.NhomDonVis} {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<NhomDonViDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
