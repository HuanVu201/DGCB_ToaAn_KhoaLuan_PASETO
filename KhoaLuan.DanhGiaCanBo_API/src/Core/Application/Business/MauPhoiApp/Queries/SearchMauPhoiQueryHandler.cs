using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
public class SearchMauPhoiQueryWhereBuilder
{
    public static string Build(SearchMauPhoiQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.LoaiPhoi))
            where += " AND LoaiPhoi = @LoaiPhoi ";
        if (!string.IsNullOrEmpty(req.MaMauPhoi))
            where += " AND MaMauPhoi = @MaMauPhoi ";
        if (!string.IsNullOrEmpty(req.CustomerId))
            where += " AND CustomerId = @CustomerId";
        if (!string.IsNullOrEmpty(req.TenMauPhoi))
            where += " AND TenMauPhoi Like N'%' + @TenMauPhoi + '%'";
        if (!string.IsNullOrEmpty(req.MaDonVi))
            where += " AND MaDonVi Like N'%' + @MaDonVi + '%'";
        if (!string.IsNullOrEmpty(req.UrlMauPhoi))
            where += " AND UrlMauPhoi Like N'%' + @UrlMauPhoi + '%'";
        if (req.LaPhoiMacDinh == true)
            where += " AND LaPhoiMacDinh = 1";
        else if (req.LaPhoiMacDinh == false)
            where += " AND LaPhoiMacDinh = 0";
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

public class SearchMauPhoiQueryHandler : IRequestHandler<SearchMauPhoiQuery, PaginationResponse<MauPhoiDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public SearchMauPhoiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<MauPhoiDto>> Handle(SearchMauPhoiQuery request, CancellationToken cancellationToken)
    {
        string where = SearchMauPhoiQueryWhereBuilder.Build(request);
        string sql = $@"SELECT * FROM Business.MauPhois {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<MauPhoiDto>(sql, request.PageSize, "LoaiPhoi, CreatedOn ASC", cancellationToken, request.PageNumber, request);
        return data;
    }
}