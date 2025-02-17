//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using TD.DanhGiaCanBo.Application.Business.ChucVuApp;
//using TD.DanhGiaCanBo.Application.Business.ChucVuApp.Queries;
//using TD.DanhGiaCanBo.Application.Common.Caching;
//using TD.DanhGiaCanBo.Domain.Constant;

//namespace TD.DanhGiaCanBo.Application.Business.ChucVuApp.Queries;

//public class SearchChucVuQueryWhereBuilder
//{
//    public static string Build(SearchChucVuQuery req)
//    {
//        string where = string.Empty;
//        if (!string.IsNullOrEmpty(req.Ten))
//            where += " AND Ten Like N'%' + @Ten + '%'";
//        if (!string.IsNullOrEmpty(req.Id))
//            where += " AND Id = @Id";
//        if (req.Removed == false)
//            where += " AND DeletedOn is null";
//        else if (req.Removed == true)
//            where += " AND DeletedOn is not null";
//        if (where.TrimStart().StartsWith("AND"))
//            where = where.TrimStart().Substring("AND".Length);
//        if (where != string.Empty)
//            return $" WHERE ({where})";
//        return where;
//    }
//}
//public class SearchChucVuQueryHandler : IRequestHandler<SearchChucVuQuery, PaginationResponse<ChucVuDto>>
//{
//    private readonly ICacheService _cacheService;
//    private readonly int _cacheTime = 2;
//    private readonly IDapperRepository _dapperRepository;
//    public SearchChucVuQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
//    public async Task<PaginationResponse<ChucVuDto>> Handle(SearchChucVuQuery request, CancellationToken cancellationToken)
//    {
//        var where = SearchChucVuQueryWhereBuilder.Build(request);
//        var sql = $@"SELECT * FROM {TableNames.ChucVus} {where}";
//        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ChucVuDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
//        return data;
//    }
//}
