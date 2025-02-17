
using Mapster;
using MapsterMapper;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Identity.Users;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Queries;

public class SearchScreenActionCacheQueryWhereBuilder
{
    public static string Build(SearchScreenActionCacheQuery req)
    {
        string where = "A.DeletedOn is null and S.DeletedOn is null ";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchQueryCacheQueryHandler : IRequestHandler<SearchScreenActionCacheQuery, PaginationResponse<ScreenActionDto>>
{
    private readonly ICacheService _cacheService;
    private readonly ICacheKeyService _cacheKeyService;
    private readonly IUserService _userService;
    private readonly ICurrentUser _currentUser;
    private readonly int _cacheTime = 5;
    private readonly IDapperRepository _dapperRepository;
    public SearchQueryCacheQueryHandler(ICacheKeyService cacheKeyService, ICacheService cacheService, IDapperRepository dapperRepository, IUserService userService, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
        _cacheKeyService = cacheKeyService;
        _userService = userService;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<ScreenActionDto>> Handle(SearchScreenActionCacheQuery request, CancellationToken cancellationToken)
    {
        var where = SearchScreenActionCacheQueryWhereBuilder.Build(request);
        var sql = $@"SELECT SA.ID, S.ID as ScreenId, A.Id as ActionId, S.Ma as MaScreen, S.ShowActionInModal, S.ShowActionInTable, A.ApplyForUsers, A.ApplyForUserGroups, A.Ten, A.Quyen, A.Ma as MaAction, A.ThuTu, A.IconName, A.ColorCode, A.ShowInModal, A.ShowInTable
                    FROM Business.ScreenActions as SA
                    inner join Business.Screens as S on SA.ScreenId = S.Id
                    inner join Business.Actions as A on SA.ActionId = A.Id
                    {where}";
        //var sqlGetNhomNguoiDung = SearchNguoiDungNhomNguoiDungQueryBuilder.sqlGetNhomNguoiDungHienTai;
        var currentUserId = _currentUser.GetUserId();
        var currentUserGroupId = _currentUser.GetUserGroupId();

        var actions = await _cacheService.GetOrSetAsync(
            _cacheKeyService.GetCacheKey(ScreenActionConstant.ScreenActionKey, currentUserId.ToString(), false),
            async () => await _dapperRepository.PaginatedListSingleQueryAsync<ScreenActionWithPermissionDto>(sql, request.PageSize, "ThuTu", cancellationToken, request.PageNumber, request),
            TimeSpan.FromMinutes(_cacheTime), cancellationToken);

        //var nhomNguoiDungs = await _cacheService.GetOrSetAsync(
        //    _cacheKeyService.GetCacheKey(NguoiDungNhomNguoiDungConstant.NguoiDungNhomNguoiDungKey, currentUserId.ToString(), false),
        //    async () => await _dapperRepository.QueryAsync<NguoiDungNhomNguoiDung>(sqlGetNhomNguoiDung, new
        //    {
        //        UserName = _currentUser.GetUserName()
        //    }, cancellationToken: cancellationToken
        //    ), TimeSpan.FromMinutes(_cacheTime), cancellationToken);
        var permissions = await _userService.GetPermissionsAsync(currentUserId.ToString(), currentUserGroupId, cancellationToken);
        var userPermissions = permissions.Distinct().ToList();

        var newActions = new List<ScreenActionWithPermissionDto>();
        for (int i = 0; i < actions.Data.Count; i++)
        {
            var menu = actions.Data[i];
            string menuApplyForUserLowerCase = menu.ApplyForUsers?.ToLower();
            string menuApplyForUserGroupLowerCase = menu.ApplyForUserGroups?.ToLower();
            string menuPermissionLowerCase = menu.Quyen?.ToLower();
            if (string.IsNullOrEmpty(menuPermissionLowerCase) && string.IsNullOrEmpty(menuApplyForUserLowerCase) && string.IsNullOrEmpty(menuApplyForUserGroupLowerCase))
            {
                newActions.Add(menu);
                continue;
            }
            bool hasPermission = userPermissions.Count > 0 ? userPermissions.Any(role => !string.IsNullOrEmpty(menuPermissionLowerCase) ? menuPermissionLowerCase.Contains(role.ToLower()) : false) : false;
            if (hasPermission)
            {
                newActions.Add(menu);
                continue;
            }
            //bool isInGroups = nhomNguoiDungs.Count > 0 ? nhomNguoiDungs.Any(nnd => !string.IsNullOrEmpty(menuApplyForUserGroupLowerCase) ? menuApplyForUserGroupLowerCase.Contains(nnd.NhomNguoiDungId.ToString().ToLower()) : false) : false;
            //if (isInGroups)
            //{
            //    newActions.Add(menu);
            //    continue;
            //}
            bool isInUsers = !string.IsNullOrEmpty(menuApplyForUserLowerCase) ? menuApplyForUserLowerCase.Contains(currentUserId.ToString().ToLower()) : false;
            if (isInUsers)
            {
                newActions.Add(menu);
                continue;
            }
        }
        actions.Data = newActions;
        Mapper mapper = new Mapper();
        mapper.Config.Default.MapToConstructor(true);

        return mapper.Map<PaginationResponse<ScreenActionDto>>(actions);
    }
}
