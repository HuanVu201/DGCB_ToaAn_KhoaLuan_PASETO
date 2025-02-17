using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.GiaHanDanhGiaApp.Queries;

public class SearchKhieuNaiQueryWhereBuilder
{
    public static string Build(SearchGiaHanDanhGiaQuery req, string? userGroupId)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.LyDo))
            where += " AND gh.LyDo Like N'%' + @LyDo + '%'";
        if (!string.IsNullOrEmpty(req.TrangThai))
            where += " AND TrangThai = @TrangThai";
        if (!string.IsNullOrEmpty(req.MaDonViCha))
            where += " AND MaDonViCha = @MaDonViCha";
        if (!string.IsNullOrEmpty(req.MaDonVi))
            where += " AND MaDonVi = @MaDonVi";

        string tuNgay = req.TuNgay.HasValue ? req.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = req.DenNgay.HasValue ? req.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;
        if (!string.IsNullOrEmpty(tuNgay))
            where += $" AND CONVERT(DATE,gh.CreatedOn,23)  >= '{tuNgay}' ";

        if (!string.IsNullOrEmpty(denNgay))
            where += $" AND CONVERT(DATE,gh.CreatedOn,23)  <= '{denNgay}' ";

        if (req.GetDataCurrentUser == true)
        {
            if (!string.IsNullOrEmpty(userGroupId))
                where += $" AND (gh.CreatedBy = '{userGroupId}' )";
        }

        if (req.FilterByUserRole == true)
        {
            where += " AND (TrangThai = N'Chờ xử lý' OR TrangThai = N'Đã xử lý') ";
        }

        if (req.Removed == false)
            where += " AND gh.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND gh.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchGiaHanDanhGiaQueryHandler : IRequestHandler<SearchGiaHanDanhGiaQuery, PaginationResponse<GiaHanDanhGiaDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public SearchGiaHanDanhGiaQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<GiaHanDanhGiaDto>> Handle(SearchGiaHanDanhGiaQuery request, CancellationToken cancellationToken)
    {
        string userGroupId = _currentUser.GetUserGroupId() ?? string.Empty;
        string where = SearchKhieuNaiQueryWhereBuilder.Build(request, userGroupId);
        string sql = $@"SELECT 
                          gh.*, 
                          u.FullName, 
                          u.UserName,
                          g1.GroupName as TenPhongBan,
                          g2.GroupName as TenDonVi
                        FROM 
                          [Business].[GiaHanDanhGias] gh 
                          INNER JOIN [Identity].[ApplicationUserGroups] aug ON aug.Id = gh.CreatedBy 
                          LEFT JOIN [Catalog].[Groups] g1 ON aug.GroupCode = g1.GroupCode
                          LEFT JOIN [Catalog].[Groups] g2 ON aug.OfficeCode = g2.GroupCode
                          INNER JOIN [Identity].[Users] u ON u.Id = aug.UserId {where} ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<GiaHanDanhGiaDto>(sql, request.PageSize, "CreatedOn DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}