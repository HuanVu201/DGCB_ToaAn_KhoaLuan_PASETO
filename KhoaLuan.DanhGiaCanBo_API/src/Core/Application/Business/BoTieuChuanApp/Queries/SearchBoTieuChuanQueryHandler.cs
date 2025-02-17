using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Zalo;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Queries;

public class SearchBoTieuChuanQueryWhereBuilder
{
    public static string Build(SearchBoTieuChuanQuery req, UserInfoDataDto userInfo)
    {
        string where = string.Empty;
        //LocDonVi
        if (req.LaDonVi == true)
        {

            where += " AND LaDonVi = 1";
            if (!string.IsNullOrEmpty(userInfo.MaDonVi))
                where += " AND (MaDonViDanhGia LIKE @MaDonVi  OR MaDonViDanhGia IS NULL OR MaDonViDanhGia ='[]')";
            if (!string.IsNullOrEmpty(userInfo.Catalog))
                where += " AND (MaCapDanhGia LIKE @Catalog  OR MaCapDanhGia IS NULL OR MaCapDanhGia ='[]')";
            where += " AND NOT (MaCapDanhGia IS NULL AND MaDonViDanhGia IS NULL)";
        }     
        if (req.SuDung == true)
            where += " AND SuDung = 1";
        else if (req.SuDung == false)
            where += " AND SuDung = 0";

        if (!string.IsNullOrEmpty(req.TenBoTieuChi))
            where += " AND TenBoTieuChi Like N'%' + @TenBoTieuChi + '%'";
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND Ma Like N'%' + @Ma + '%'";
        if (!string.IsNullOrEmpty(req.SoKyHieu))
            where += " AND SoKyHieu Like N'%' + @SoKyHieu + '%'";
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchBoTieuChuanQueryHandler : IRequestHandler<SearchBoTieuChuanQuery, PaginationResponse<BoTieuChuanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private async Task<UserInfoDataDto> GetUserInfoAsync(string currentUserGruopId, CancellationToken cancellationToken)
    {
        var userSql2 = $@"
                SELECT aug.[OfficeCode] AS MaDonVi ,g.Catalog
                FROM [Catalog].[Groups] g
                LEFT JOIN [Identity].[ApplicationUserGroups] aug ON g.[GroupCode] = aug.[GroupCode]
                WHERE aug.[Id] = @UserGruopId";
        return await _dapperRepository.QueryFirstOrDefaultObjectAsync<UserInfoDataDto>(userSql2, new { UserGruopId = currentUserGruopId });
    }


    public SearchBoTieuChuanQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<BoTieuChuanDto>> Handle(SearchBoTieuChuanQuery request, CancellationToken cancellationToken)
    {
        var currentUserGruopId = _currentUser.GetUserGroupId();
        var currentUserOfficeCode = _currentUser.GetOfficeCode();

        var userInfo = await GetUserInfoAsync(currentUserGruopId, cancellationToken);
        if (request.LaDonVi == true && userInfo == null)
            throw new NotFoundException($"Không tìm thấy thông tin người dùng với mã usergroup: {currentUserGruopId}");


        var where = SearchBoTieuChuanQueryWhereBuilder.Build(request, userInfo);
        var sql = $@"SELECT Id, MaBoTieuChi,TenBoTieuChi,SuDung,DinhKem,SoKyHieu,NgayBanHanh,CoQuanBanHanh,LoaiThoiGian,ThoiGian,DonVi,LaDonVi, CauHinhThoiGianGiaHan FROM {TableNames.BoTieuChuans} {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<BoTieuChuanDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
public class UserInfoDataDto
{
    public string MaDonVi { get; set; }
    public Guid DonViId { get; set; }
    public string Catalog { get; set; }
}
