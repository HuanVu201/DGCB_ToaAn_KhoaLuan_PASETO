using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Shared.Authorization;

namespace TD.DanhGiaCanBo.Application.Identity.UserRoles.Queries;

public class SearchUserWithRolesHandler : IRequestHandler<SearchUserWithRoles, PaginationResponse<UserWithRoleNamesDetailDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly string userRolesTableName = "[Identity].[UserRoles]";
    private readonly string userTableName = "[Identity].[Users]";
    public SearchUserWithRolesHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<UserWithRoleNamesDetailDto>> Handle(SearchUserWithRoles request, CancellationToken cancellationToken)
    {
        string where = "";
        if (!string.IsNullOrEmpty(request.GroupCode) && !string.IsNullOrEmpty(request.OfficeCode))
        {
            where += " AND (u.GroupCode = @GroupCode OR OfficeCode = @OfficeCode)";
        }
        else
        {
            if (!string.IsNullOrEmpty(request.GroupCode))
            {
                where += " AND u.GroupCode = @GroupCode ";
            }
            if (!string.IsNullOrEmpty(request.OfficeCode))
            {
                where += " AND u.OfficeCode = @OfficeCode ";
            }
        }

        if (request.RoleNames != null && request.RoleNames.Count > 0)
            where += $" AND r.Name IN @RoleNames";


        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            where = $"WHERE {where}";
        string sql = $@"SELECT
                          r.Name,
                          u.ID,
                          u.UserName,
                          u.FullName,
                          u.GroupName,
                          u.OfficeName,
                          u.PositionName,
                          u.ChucDanh,
                          ur.RoleId
                        FROM 
                          [Identity].[UserRoles] ur
                          INNER JOIN [Identity].[Users] u ON u.Id = ur.UserId 
                          LEFT JOIN [Identity].[Roles] r ON r.Id = ur.RoleId
                        {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<UserWithRoleNamesDetailDto>(sql, request.PageSize, "Name", cancellationToken, request.PageNumber, request);
        return data;
    }


}