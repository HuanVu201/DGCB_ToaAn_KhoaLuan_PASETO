using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;

public class SearchTieuChiDanhGiaQueryWhereBuilder
{
    public static string Build(SearchTieuChiDanhGiaQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
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
public class SearchTieuChiDanhGiaQueryHandler : IRequestHandler<SearchTieuChiDanhGiaQuery, PaginationResponse<TieuChiDanhGiaDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchTieuChiDanhGiaQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<TieuChiDanhGiaDto>> Handle(SearchTieuChiDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var where = SearchTieuChiDanhGiaQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id, Ten,Ma,ThuocTieuChi,NhomTieuChi,ThuocMaTieuChi,DonViTinh,KieuTieuChi,LoaiDiem FROM {TableNames.TieuChiDanhGias} {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TieuChiDanhGiaDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
