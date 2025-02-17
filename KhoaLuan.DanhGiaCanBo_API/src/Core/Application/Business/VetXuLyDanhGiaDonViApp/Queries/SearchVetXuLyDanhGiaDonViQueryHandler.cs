using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.VetXuLyDanhGiaDonViApp.Queries;

public class SearchVetXuLyDanhGiaDonViQueryWhereBuilder
{
    public static string Build(SearchVetXuLyDanhGiaDonViQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaPhieu))
            where += " AND MaPhieu = @MaPhieu";

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

public class SearchVetXuLyDanhGiaDonViQueryHandler : IRequestHandler<SearchVetXuLyDanhGiaDonViQuery, PaginationResponse<VetXuLyDanhGiaDonViDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public SearchVetXuLyDanhGiaDonViQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<VetXuLyDanhGiaDonViDto>> Handle(SearchVetXuLyDanhGiaDonViQuery request, CancellationToken cancellationToken)
    {
        string where = SearchVetXuLyDanhGiaDonViQueryWhereBuilder.Build(request);
        string sql = $@"SELECT *, TenThaoTac as TenBuocXuLy
                        FROM Business.VetXuLyDanhGiaDonVis {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<VetXuLyDanhGiaDonViDto>(sql, request.PageSize, "CreatedOn ASC", cancellationToken, request.PageNumber, request);
        return data;
    }
}