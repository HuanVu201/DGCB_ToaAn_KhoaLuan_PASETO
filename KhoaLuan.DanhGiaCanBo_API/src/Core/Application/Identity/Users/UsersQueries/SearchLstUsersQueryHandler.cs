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

namespace TD.DanhGiaCanBo.Application.Identity.LstUsersApp.Queries;

public class SearchLstUsersQueryHandler : IRequestHandler<SearchLstUsersQuery, PaginationResponse<LstUsersDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchLstUsersQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LstUsersDto>> Handle(SearchLstUsersQuery request, CancellationToken cancellationToken)
    {
        var sql = $@"SELECT 
                        aug.Id, 
                        g.GroupCode, 
                        g.GroupName, 
                        g2.GroupCode AS MaDonVi,
                        g2.GroupName AS TenDonVi, 
                        u.FullName,
                        g.Id AS GroupId,
                        aug.UserId,
                        u.UserName,
                        cv.Ten AS ChucVu,
                        ISNULL(u.FullName, '') + 
                        CASE 
                            WHEN u.FullName IS NOT NULL AND cv.Ten IS NOT NULL THEN ' - ' 
                            ELSE '' 
                        END + 
                        ISNULL(cv.Ten, '') + 
                        CASE 
                            WHEN cv.Ten IS NOT NULL AND g.GroupName IS NOT NULL THEN ' - ' 
                            ELSE ' - ' 
                        END + 
                        ISNULL(g.GroupName, '') AS FullNameWithGroup
                    FROM 
                        [Identity].[Users] u
                    INNER JOIN 
                        [Identity].[ApplicationUserGroups] aug ON u.[Id] = aug.[UserId]
                    LEFT JOIN 
                        [Catalog].[Groups] g ON g.[GroupCode] = aug.[GroupCode]
                    LEFT JOIN 
                        [Catalog].[Groups] g2 ON g2.[GroupCode] = aug.[OfficeCode]
                    LEFT JOIN 
                        [Business].[ChucVus] cv ON cv.[Id] = aug.[ChucVuId]
                    WHERE aug.DeletedOn Is Null";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LstUsersDto>(sql, request.PageSize, "fullName", cancellationToken, request.PageNumber, request);
       // var data = await _dapperRepository.QueryAsync<LstUsersDto>(sql);
        return data;
    }
}
