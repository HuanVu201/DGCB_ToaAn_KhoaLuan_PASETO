using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Identity.UserRoles.Queries;
public class SearchListUserRolesHandler : IRequestHandler<SearchListUserRoles, PaginationResponse<UserRolesDetailDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly string userRolesTableName = "[Identity].[UserRoles]";
    private readonly string userTableName = "[Identity].[Users]";
    public SearchListUserRolesHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<UserRolesDetailDto>> Handle(SearchListUserRoles request, CancellationToken cancellationToken)
    {
        string where = "";
        if (!string.IsNullOrEmpty(request.RoleId)) where += $" AND {userRolesTableName}.RoleId = @RoleId ";

        if (!string.IsNullOrEmpty(request.FullName))
            where += $" AND {userTableName}.FullName LIKE N'%' + @FullName + '%'";
        if (!string.IsNullOrEmpty(request.UserName))
            where += $" AND {userTableName}.UserName LIKE N'%' + @UserName + '%' ";

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            where = $"WHERE {where}";
        string sql = $"SELECT {userTableName}.*, {userRolesTableName}.RoleId, {userRolesTableName}.UserId " +
            $"FROM {userRolesTableName} " +
            $"INNER JOIN {userTableName} " +
            $"ON {userTableName}.Id = {userRolesTableName}.UserId " +
            $"{where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<UserRolesDetailDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }


}
