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

namespace TD.DanhGiaCanBo.Application.Identity.LstUsersApp.Queries;

public class SearchListAUGOfGroupQueryHandler : IRequestHandler<SearchListAUGOfGroupQuery, PaginationResponse<LstUsersDto>>
{
    //public class SearchListAUGOfGroupQueryWhereBuilder
    //{
    //    public static string Build(SearchListAUGOfGroupQuery req)
    //    {
    //        string where = string.Empty;
    //        if (!string.IsNullOrEmpty(req.GroupId))
    //            where += " AND g.id = @GroupId";
    //        //if (!string.IsNullOrEmpty(req.Gr))
    //        //    where += " AND g.id = @GroupId";
    //        if (req.Removed == false)
    //            where += " AND aug.DeletedOn is null";
    //        else if (req.Removed == true)
    //            where += " AND aug.DeletedOn is not null";
    //        if (where.TrimStart().StartsWith("AND"))
    //            where = where.TrimStart().Substring("AND".Length);
    //        if (where != string.Empty)
    //            return $" WHERE ({where})";
    //        return where;
    //    }
    //}
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<Group> _repositoryWithEvents;
    public SearchListAUGOfGroupQueryHandler(IDapperRepository dapperRepository , IRepositoryWithEvents<Group> repositoryWithEvents) 
    {
         _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<LstUsersDto>> Handle(SearchListAUGOfGroupQuery request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync((Guid)request.GroupId, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Cơ cấu tổ chức với mã: {request.GroupId} chưa được thêm vào hệ thống");
        //var sql = $@"SELECT aug.Id, g.GroupCode, g.GroupName, u.FullName,g.Id AS GroupId,aug.UserId,u.UserName,cv.Ten As ChucVu,u.FullName + ' - '+cv.Ten + ' - ' + g.GroupName AS FullNameWithGroup
        //     FROM {TableNames.Users} u
        //     INNER JOIN [Identity].[ApplicationUserGroups] aug ON u.[Id] = aug.[UserId]
        //     INNER JOIN [Catalog].[Groups] g ON g.[GroupCode] = aug.[GroupCode]
        //     LEFT JOIN [Business].[ChucVus] cv ON cv.[Id] = aug.[ChucVuId] Where  (g.Id = @GroupId Or g.Id = @OfGroupId )";
        // LEFT JOIN [Business].[ChucVus] cv ON cv.[Id] = aug.[ChucVuId] Where  (g.Id = @GroupId Or g.Id = @OfGroupId )";
        var sql = $@"SELECT aug.Id, g.GroupCode, g.GroupName, u.FullName,g.Id AS GroupId,aug.UserId,u.UserName,cv.Ten As ChucVu,u.FullName + ' - ' + COALESCE(cv.Ten, N'Không có thông tin chức vụ') + ' - ' + g.GroupName AS FullNameWithGroup
             FROM {TableNames.Users} u
             INNER JOIN [Identity].[ApplicationUserGroups] aug ON u.[Id] = aug.[UserId] and (aug.GroupCode = @GroupCode Or aug.GroupCode= @OfGroupCode or aug.GroupCode ='D01.00' )
             INNER JOIN [Catalog].[Groups]	g ON g.[GroupCode] = aug.[GroupCode]
             LEFT JOIN [Business].[ChucVus] cv ON cv.[Id] = aug.[ChucVuId] Where aug.DeletedOn IS NUll";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LstUsersDto>(sql, request.PageSize, "GroupName ASC", cancellationToken, request.PageNumber,new { GroupCode = itemExitst.GroupCode, OfGroupCode = itemExitst.OfGroupCode });
       // var data = await _dapperRepository.QueryAsync<LstUsersDto>(sql);
        return data;
    }
}
