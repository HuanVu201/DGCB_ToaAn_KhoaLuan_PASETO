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

public class SearchListAUGNotPermissionQueryHandler : IRequestHandler<SearchListAUGNotPermissionQuery, PaginationResponse<ListAUGNotPermissionDanhGia>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<Group> _repositoryWithEvents;
    public SearchListAUGNotPermissionQueryHandler(IDapperRepository dapperRepository , IRepositoryWithEvents<Group> repositoryWithEvents) 
    {
         _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<ListAUGNotPermissionDanhGia>> Handle(SearchListAUGNotPermissionQuery request, CancellationToken cancellationToken)
    {
     

        var sql = $@"SELECT aug.[Id]
      ,aug.[UserId]
      ,aug.[ChucDanhId]
      ,aug.[ChucVuId]
      ,aug.[ThamQuyenXepLoai]
      ,aug.[NoiDungKiemNhiem]
      ,aug.[GroupCode]
      ,aug.[OfficeCode]
	  ,u.UserName
	  ,u.FullName
	  ,ur.RoleId
	  ,g2.GroupName as OfficeName
  FROM [Identity].[ApplicationUserGroups] aug
  Left JOIN [Identity].[Users] u
        ON u.Id = aug.UserId
Left JOIN [Identity].[UserRoles] ur
        ON ur.UserId = aug.UserId
	Left JOIN Catalog.Groups g2
        ON g2.GroupCode = aug.OfficeCode
	Where aug.DeletedOn Is Null And  ur.RoleId IS Null And U.DeletedOn Is Null And g2.DeletedOn Is Null";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ListAUGNotPermissionDanhGia>(sql, request.PageSize, "FullName ASC", cancellationToken, request.PageNumber);
        return data;
    }
}
