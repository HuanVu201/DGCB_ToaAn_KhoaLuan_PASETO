using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Identity.UserRoles.Queries;
public class SearchUserRolesHandler : IRequestHandler<SearchUserRoles, PaginationResponse<UserRolesDetailDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly string userRolesTableName = "[Identity].[UserRoles]";
    private readonly string userTableName = "[Identity].[Users]";
    public SearchUserRolesHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<UserRolesDetailDto>> Handle(SearchUserRoles request, CancellationToken cancellationToken)
    {

        string where = "";
        if (request.RoleIds != null)
        {
            if (!string.IsNullOrEmpty(request.RoleId)) where += $" AND {userRolesTableName}.RoleId IN ('{request.RoleId}','{request.RoleIds}')";

        }
        else if (!string.IsNullOrEmpty(request.RoleId))
        {
            if (!string.IsNullOrEmpty(request.RoleId)) where += $" AND {userRolesTableName}.RoleId = @RoleId ";
        }

        //if (!string.IsNullOrEmpty(request.RoleId)) where += $" AND {userRolesTableName}.RoleId = @RoleId ";

        if (!string.IsNullOrEmpty(request.FullName))
            where += $" AND {userTableName}.FullName LIKE N'%' + @FullName + '%'";
        if (!string.IsNullOrEmpty(request.UserName))
            where += $" AND {userTableName}.UserName LIKE N'%' + @UserName + '%' ";

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            where = $"WHERE {where}";
        string sql = $"SELECT {userTableName}.*, {userRolesTableName}.RoleId, {userRolesTableName}.UserId,{TableNames.ApplicationUserGroups}.GroupCode,{TableNames.ApplicationUserGroups}.OfficeCode,{TableNames.Groups}.GroupName As GroupName,g2.GroupName As OfficeName " +
            $"FROM {userRolesTableName} " +
            $"INNER JOIN {userTableName} " +
            $"ON {userTableName}.Id = {userRolesTableName}.UserId " +

            $"INNER JOIN {TableNames.ApplicationUserGroups} " +
            $"ON {TableNames.Users}.Id = {TableNames.ApplicationUserGroups}.UserId " +

            $"INNER JOIN {TableNames.Groups} " +
            $"ON {TableNames.Groups}.GroupCode =  {TableNames.ApplicationUserGroups}.GroupCode " +

              $"INNER JOIN {TableNames.Groups} g2 " +
            $"ON g2.GroupCode  =  {TableNames.ApplicationUserGroups}.OfficeCode " +
            $"{where}";
       var data = await _dapperRepository.PaginatedListSingleQueryAsync<UserRolesDetailDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }


}
