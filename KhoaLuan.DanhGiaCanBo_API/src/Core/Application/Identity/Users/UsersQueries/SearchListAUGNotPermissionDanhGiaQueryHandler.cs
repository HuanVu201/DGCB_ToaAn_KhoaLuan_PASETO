using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Identity.LstUsersApp;
using TD.DanhGiaCanBo.Application.Identity.LstUsersApp.Queries;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Constant;
using TD.DanhGiaCanBo.Application.Identity.XepLoaiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;

namespace TD.DanhGiaCanBo.Application.Identity.LstUsersApp.Queries;

public class SearchListAUGNotPermissionDanhGiaQueryHandler : IRequestHandler<SearchListAUGNotPermissionDanhGiaQuery, PaginationResponse<ListAUGNotPermissionDanhGia>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<Group> _repositoryWithEvents;
    public SearchListAUGNotPermissionDanhGiaQueryHandler(IDapperRepository dapperRepository , IRepositoryWithEvents<Group> repositoryWithEvents) 
    {
         _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<ListAUGNotPermissionDanhGia>> Handle(SearchListAUGNotPermissionDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var sql = $@"SELECT DISTINCT aug.[Id]
      ,aug.[UserId]
      ,aug.[GroupCode]
      ,aug.[OfficeCode]
	  ,r.Name as RoleName
	  ,u.UserName
	  ,u.FullName
	  ,cd.Ten as ChucDanhName
	  ,cv.Ten as ChucVuName
  FROM [Identity].[ApplicationUserGroups] aug
  Left Join [Identity].[Users] u On aug.UserId = u.Id
  Left Join [Identity].[UserRoles] ur  On ur.UserGroupId = aug.Id
  Left Join [Identity].[Roles] r On  ur.RoleId = r.Id
  Left Join [Identity].[RoleClaims] rc On rc.RoleId = r.Id
  Left Join [Business].[ChucDanhs] cd On aug.ChucDanhId = cd.Id
  Left Join [Business].[ChucVus] cv On aug.ChucVuId = cv.Id
  Where rc.ClaimValue Not Like'%DanhGia%'  Or rc.ClaimValue Is Null
  And aug.DeletedOn Is Null";

        var sql2 = $@"SELECT DISTINCT u.Id, u.UserName, u.FullName
FROM [Identity].[Users] u
WHERE u.DeletedOn IS NULL
AND NOT EXISTS (
    SELECT 1
    FROM [Identity].[UserRoles] ur
    JOIN [Identity].[Roles] r ON ur.RoleId = r.Id
    JOIN [Identity].[RoleClaims] rc ON r.Id = rc.RoleId
    WHERE ur.UserId = u.Id
      AND rc.ClaimType = 'Permission'
      AND rc.ClaimValue LIKE '%DanhGia%'
)";

        var sql3 = $@"  SELECT DISTINCT aug.[Id]
      ,aug.[UserId]
      ,aug.[GroupCode]
      ,aug.[OfficeCode]
	  ,u.UserName
	  ,u.FullName
	  ,cd.Ten as ChucDanhName
	  ,cv.Ten as ChucVuName
      ,g.GroupName As OfficeName
  FROM [Identity].[ApplicationUserGroups] aug
  Left Join [Business].[ChucDanhs] cd On aug.ChucDanhId = cd.Id
  Left Join [Business].[ChucVus] cv On aug.ChucVuId = cv.Id
  Left Join [Identity].[Users] u On aug.UserId = u.Id
  Left Join [Catalog].[Groups] g On aug.OfficeCode = g.GroupCode
 WHERE aug.DeletedOn IS NULL And u.DeletedOn IS NULL And g.DeletedOn Is Null
  AND NOT EXISTS (
    SELECT 1
    FROM [Identity].[UserRoles] ur
    JOIN [Identity].[Roles] r ON ur.RoleId = r.Id
    JOIN [Identity].[RoleClaims] rc ON r.Id = rc.RoleId
    WHERE ur.UserId = u.Id
      AND rc.ClaimType = 'Permission'
      AND rc.ClaimValue LIKE '%DanhGia%'
)";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ListAUGNotPermissionDanhGia>(sql3, request.PageSize, "FullName ASC", cancellationToken, request.PageNumber);
       // var data = await _dapperRepository.QueryAsync<LstUsersDto>(sql);
        return data;
    }
}
