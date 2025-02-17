using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
public class SearchUsersWithDonViQuanLyQueryWhereBuilder
{
    public static string Build(SearchUsersWithDonViQuanLyQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.DonViQuanLy))
            //where += " AND g.GroupCode = @DonViQuanLy ";
            where += " AND u.OfficeCode = @DonViQuanLy ";

        if (!string.IsNullOrEmpty(req.UserName))
            where += " AND u.UserName Like '%' + @UserName + '%'";
        if (!string.IsNullOrEmpty(req.FullName))
            where += " AND u.FullName Like N'%' + @FullName + '%'";
        if (!string.IsNullOrEmpty(req.GroupCode))
            where += " AND u.GroupCode = @GroupCode ";
        if (!string.IsNullOrEmpty(req.TypeUser))
            where += " AND u.TypeUser = @TypeUser ";

        if (req.LaCanBoTiepNhan == true)
            where += " AND u.LaCanBoTiepNhan = 1";
        else if (req.LaCanBoTiepNhan == false)
            where += " AND u.LaCanBoTiepNhan = 0";
        where += " AND u.GroupCode is not null AND u.GroupCode <> '' AND u.OfficeCode is not null";

        if (req.Removed == false)
            where += " AND u.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND u.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchUsersWithDonViQuanLyQueryHandler : IRequestHandler<SearchUsersWithDonViQuanLyQuery, PaginationResponse<UsersWithDonViQuanLyDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchUsersWithDonViQuanLyQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<UsersWithDonViQuanLyDto>> Handle(SearchUsersWithDonViQuanLyQuery request, CancellationToken cancellationToken)
    {
        var where = SearchUsersWithDonViQuanLyQueryWhereBuilder.Build(request);
        var sql = $@"
                    SELECT u.Id,
                           u.FullName,
	                       u.UserName,
                           u.GroupCode,
                           u.GroupName,
                           u.OfficeCode,
                           u.OfficeName,
                           u.LaCanBoTiepNhan,
	                       u.PositionName
                    FROM [Identity].[Users] u
                    {where}
";
                    //JOIN [Catalog].[Groups] g ON g.FullCode LIKE '%' + u.OfficeCode + '%'
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<UsersWithDonViQuanLyDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}