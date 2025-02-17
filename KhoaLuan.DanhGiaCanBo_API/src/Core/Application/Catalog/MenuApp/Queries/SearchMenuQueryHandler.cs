using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Application.Catalog.MenuApp;
using TD.DanhGiaCanBo.Application.Catalog.MenuApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Identity.Users;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.MenuApp.Queries;

public class SearchTopMenuSpec : Specification<Menu>
{
    public SearchTopMenuSpec()
    {
        Query.Where(x => x.IsTopMenu == true);
        Query.Where(x => x.DeletedOn == null);
        Query.OrderBy(x => x.ThuTuMenu);
    }
}
public class SearchMenuQueryWhereBuilder
{
    public static string Build(SearchMenuQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Name))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (req.Active == true) where += " AND Active = 1";
        else if(req.Active == false) where += " AND Active = 0";
        if (!string.IsNullOrEmpty(req.Module))
            where += " AND Module = @Module";
        /*if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";*/
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE (({where})  OR IsTopMenu = 1) AND DeletedOn is null";
        else
            return $" WHERE DeletedOn is null";
        return where;
    }
}
public class SearchMenuQueryHandler : IRequestHandler<SearchMenuQuery, PaginationResponse<MenuDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _userService;
    private readonly ICurrentUser _currentUser;

    public SearchMenuQueryHandler(IDapperRepository dapperRepository, IUserService userService, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _userService = userService;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<MenuDto>> Handle(SearchMenuQuery request, CancellationToken cancellationToken)
    {


        var where = SearchMenuQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id, ParentId, ThuTuMenu, TenMenu, FullPath, Permission, IconName, IsTopMenu, Module FROM Catalog.Menus {where}";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<MenuDto>(sql, request.PageSize, "ThuTuMenu", cancellationToken, request.PageNumber, request);

        if(request.FilterByUserRole == true && data.Data != null)
        {
            var userId = _currentUser.GetUserId();
            var userGroupId = _currentUser.GetUserGroupId();
            var userRoles = await _userService.GetPermissionsAsync(userId.ToString(), userGroupId, cancellationToken);
            userRoles = userRoles.Distinct().Select(x => x.ToLower()).ToList();
            var menus = new List<MenuDto>();
            data.Data.ForEach((menu) =>
            {
                if (menu.Permission == null || (menu.Permission != null && userRoles.Any(role => menu.Permission.ToLower().Contains(role))))
                {
                    menus.Add(menu);
                }
            });
            data.Data = menus;
        }

        return data;
    }
}
