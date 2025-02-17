using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.LoaiMauPhoiApp.Queries;
using TD.DanhGiaCanBo.Application.Business.LoaiMauPhoiApp;

namespace TD.DanhGiaCanBo.Application.Business.LoaiLoaiMauPhoiApp.Queries;
public class SearchLoaiMauPhoiQueryWhereBuilder
{
    public static string Build(SearchLoaiMauPhoiQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.LoaiPhoi))
            where += " AND LoaiPhoi = @LoaiPhoi ";
        if (!string.IsNullOrEmpty(req.MaMauPhoi))
            where += " AND MaMauPhoi Like N'%' + @MaMauPhoi + '%' ";
        if (!string.IsNullOrEmpty(req.TenMaMauPhoi))
            where += " AND TenMaMauPhoi Like N'%' + @TenMaMauPhoi + '%'";

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

public class SearchLoaiMauPhoiQueryHandler : IRequestHandler<SearchLoaiMauPhoiQuery, PaginationResponse<LoaiMauPhoiDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public SearchLoaiMauPhoiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LoaiMauPhoiDto>> Handle(SearchLoaiMauPhoiQuery request, CancellationToken cancellationToken)
    {
        string where = SearchLoaiMauPhoiQueryWhereBuilder.Build(request);
        string sql = $@"SELECT * FROM Business.LoaiMauPhois {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LoaiMauPhoiDto>(sql, request.PageSize, "CreatedOn ASC", cancellationToken, request.PageNumber, request);
        return data;
    }
}