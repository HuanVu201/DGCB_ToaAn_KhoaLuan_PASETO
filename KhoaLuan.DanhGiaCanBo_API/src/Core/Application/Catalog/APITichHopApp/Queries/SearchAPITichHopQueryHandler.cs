using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Application.Catalog.APITichHopApp;
using TD.DanhGiaCanBo.Application.Catalog.APITichHopApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Catalog.APITichHopApp.Queries;

public class SearchAPITichHopQueryWhereBuilder
{
    public static string Build(SearchAPITichHopQuery req)
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
public class SearchAPITichHopQueryHandler : IRequestHandler<SearchAPITichHopQuery, PaginationResponse<APITichHopDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchAPITichHopQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<APITichHopDto>> Handle(SearchAPITichHopQuery request, CancellationToken cancellationToken)
    {
        var where = SearchAPITichHopQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id,Ten,Url,PhuongThuc,SuDung,Ma FROM Catalog.APITichHops {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<APITichHopDto>(sql, request.PageSize, "Ten  DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}
