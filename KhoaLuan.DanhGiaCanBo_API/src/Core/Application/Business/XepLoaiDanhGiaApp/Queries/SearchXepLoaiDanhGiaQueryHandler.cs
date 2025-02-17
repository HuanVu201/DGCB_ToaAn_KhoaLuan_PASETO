using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Queries;

public class SearchXepLoaiDanhGiaQueryWhereBuilder
{
    public static string Build(SearchXepLoaiDanhGiaQuery req)
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
public class SearchXepLoaiDanhGiaQueryHandler : IRequestHandler<SearchXepLoaiDanhGiaQuery, PaginationResponse<XepLoaiDanhGiaDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchXepLoaiDanhGiaQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<XepLoaiDanhGiaDto>> Handle(SearchXepLoaiDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var where = SearchXepLoaiDanhGiaQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id, Ten,Ma,DiemToiThieu,DiemToiDa,Active,MaBoTieuChi,TenBoTieuChi FROM {TableNames.XepLoaiDanhGias} {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<XepLoaiDanhGiaDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
