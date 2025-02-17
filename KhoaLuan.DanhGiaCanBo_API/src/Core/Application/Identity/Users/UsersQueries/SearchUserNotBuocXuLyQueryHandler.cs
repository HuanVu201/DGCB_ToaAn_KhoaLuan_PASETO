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
using System.Net.WebSockets;
using TD.DanhGiaCanBo.Application.Common.Zalo;
using TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp;
using System.Drawing.Printing;

namespace TD.DanhGiaCanBo.Application.Identity.LstUsersApp.Queries;

public class SearchUserNotBuocXuLyQueryHandler : IRequestHandler<SearchUserNotBuocXuLyQuery, PaginationResponse<ListAUGNotPermissionDanhGia>>
{
    public class SearchUserNotBuocXuLyQueryWhereBuilder
    {
        public static string Build(SearchUserNotBuocXuLyQuery req)
        {
            string where = string.Empty;
            if (!string.IsNullOrEmpty(req.GruopCode))
                where += " AND aug.GruopCode = @GruopCode";
           if (!string.IsNullOrEmpty(req.OfficeCode))
               where += " AND aug.OfficeCode = @OfficeCode";
            if (req.Removed == false)
                where += " AND aug.DeletedOn is null";
            else if (req.Removed == true)
                where += " AND aug.DeletedOn is not null";
            if (where.TrimStart().StartsWith("AND"))
                where = where.TrimStart().Substring("AND".Length);
            if (where != string.Empty)
                return $" WHERE ({where})";
            return where;
        }
    }
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<Group> _repositoryWithEvents;
    public SearchUserNotBuocXuLyQueryHandler(IDapperRepository dapperRepository , IRepositoryWithEvents<Group> repositoryWithEvents) 
    {
         _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<ListAUGNotPermissionDanhGia>> Handle(SearchUserNotBuocXuLyQuery request, CancellationToken cancellationToken)
    {

        var whereListUser = SearchUserNotBuocXuLyQueryWhereBuilder.Build(request);
        var sql = $@"SELECT DISTINCT  aug.[Id]
      ,aug.[UserId]
      ,aug.[ChucDanhId]
      ,aug.[ChucVuId]
      ,aug.[GroupCode]
      ,aug.[OfficeCode]
	  ,cd.Ten as ChucDanhName
	  ,cv.Ten as ChucVuName
	  ,u.FullName
	  ,u.UserName
  FROM [Identity].[ApplicationUserGroups] aug
  left join [Identity].Users u On u.id = aug.UserId
  left join Business.ChucDanhs cd On aug.ChucDanhId = cd.id
  left join Business.ChucVus cv On aug.ChucVuId = cv.id
  left join (
  select DISTINCT 
  bxlcd.ChucDanhId
  ,bxlcv.ChucVuId  
  From Business.BuocXuLyChucDanhs bxlcd
  Left Join Business.BuocXuLyChucVus bxlcv ON bxlcd.BuocXuLyId = bxlcv.BuocXuLyId
  ) bxl_join On bxl_join.ChucDanhId = aug.ChucDanhId And bxl_join.ChucVuId = aug.ChucVuId
  Where bxl_join.ChucDanhId IS NULL AND bxl_join.ChucVuId IS NULL And aug.DeletedOn Is Null ";


        // get list user

        var sqlListUser = $@"SELECT aug.[Id]
      ,aug.[UserId]
      ,aug.[ChucDanhId]
      ,aug.[ChucVuId]
      ,aug.[IsDefault]
      ,aug.[ThamQuyenXepLoai]
      ,aug.[KiemNhiem]
      ,aug.[TruongDonVi]
      ,aug.[KhongDanhGia]
      ,aug.[NoiDungKiemNhiem]
      ,aug.[GroupCode]
      ,aug.[OfficeCode]
      ,aug.[MaPhieuDanhGia]
      ,aug.[IsKySo]
	  ,u.UserName
	  ,u.FullName
      ,cd.Ten as ChucDanhName
	  ,cv.Ten as ChucVuName
      ,g.Catalog
  FROM {TableNames.ApplicationUserGroups} aug
  Left Join [Identity].[Users] u On aug.UserId = u.Id
  left join {TableNames.ChucDanhs} cd On aug.ChucDanhId = cd.id
  left join {TableNames.ChucVus} cv On aug.ChucVuId = cv.id
  left join {TableNames.Groups} g On aug.OfficeCode = g.GroupCode
  {whereListUser} ";

        var dataListUser = await _dapperRepository.QueryAsync<ListAUGNotPermissionDanhGia>(sqlListUser);
        if (dataListUser == null)
        {
            return null;

        }
        var sqlListMauPhieuDanhGia = $@"SELECT [Id]
      ,[LevelBoTieuChi]
      ,[Ten]
      ,[Ma]
      ,[DiemDatYeuCau]
      ,[DiemThuong]
      ,[DiemTru]
      ,[XepLoai]
      ,[MaCapDanhGia]
      ,[CapDanhGia]
      ,[MaDonViDanhGia]
      ,[DonViDanhGia]
      ,[MaChucVuDanhGia]
      ,[TenChucVuDanhGia]
      ,[MaChucDanhDanhGia]
      ,[TenChucDanhDanhGia]
      ,[MaCaNhanDanhGia]
      ,[CaNhanDanhGia]
      ,[MaBoTieuChi]
      ,[MauImportDanhGia]
      ,[DataTieuChi]
      ,[DinhKem]
      ,[CreatedBy]
      ,[CreatedOn]
      ,[LastModifiedBy]
      ,[LastModifiedOn]
      ,[DeletedOn]
      ,[DeletedBy]
      ,[ThuTu]
      ,[SuDung]
  FROM {TableNames.MauPhieuDanhGias}
  Where DeletedOn Is Null  And LevelBoTieuChi Is null And SuDung = 1
        ";



        var ListUserResult = new List<ListAUGNotPermissionDanhGia>();
        var dataListMauPhieuDanhGia = await _dapperRepository.QueryAsync<ListAUGNotPermissionDanhGia>(sqlListMauPhieuDanhGia);
        foreach(var user in dataListUser)
        {

            var whereClause = BuildWhereClause(user);
            var sqlcheckMauPhieu = $@"SELECT * FROM [Business].[MauPhieuDanhGias] {whereClause}";

            var dataMpdg = await _dapperRepository.QueryFirstOrDefaultAsync<MauPhieuDanhGiaDto>(
                sqlcheckMauPhieu,
            new { UserGruopId = $"%{user.Id}%", MaDonVi = $"%{user.OfficeCode}%", ChucVu = $"%{user.ChucVuCode}%", ChucDanh = $"%{user.ChucDanhCode}%", Catalog = $"%{user.Catalog}%" }
            //MaBoTieuChuan = $"%{request.MaBoTieuChuan}%",
            );
            if(dataMpdg == null)
            {
                ListUserResult.Add(user);
            }    
        }
        var response = new PaginationResponse<ListAUGNotPermissionDanhGia>(
    ListUserResult,
    ListUserResult.Count,
    request.PageNumber,
    request.PageSize
);
        if (ListUserResult != null) return response;
        return null;
    }

    private string BuildWhereClause(ListAUGNotPermissionDanhGia userInfo)
    {
        var where = new StringBuilder();
        where.Append(" WHERE 1=1");

        // Tạm tắt do user

        if (!string.IsNullOrEmpty(userInfo.OfficeCode))
            where.Append($"AND (  MaDonViDanhGia LIKE @MaDonVi  OR MaDonViDanhGia IS NULL OR MaDonViDanhGia ='[]' )");

        if (!string.IsNullOrEmpty(userInfo.ChucDanhCode))
            where.Append(" AND ( MaChucVuDanhGia LIKE @ChucVu    OR MaChucVuDanhGia IS NULL OR MaChucVuDanhGia ='[]' )");

        if (!string.IsNullOrEmpty(userInfo.ChucVuCode))
            where.Append(" AND ( MaChucDanhDanhGia LIKE @ChucDanh  OR MaChucDanhDanhGia IS NULL OR MaChucDanhDanhGia ='[]' ) ");

        if (!string.IsNullOrEmpty(userInfo.Catalog))
            where.Append(" AND ( MaCapDanhGia LIKE @Catalog  OR MaCapDanhGia IS NULL OR MaCapDanhGia ='[]') ");
        //if (request.MaBoTieuChuan != Guid.Empty)
        //    where.Append(" AND MaBoTieuChi LIKE @MaBoTieuChuan");
        where.Append(" AND (MaCaNhanDanhGia LIKE @UserGruopId  OR MaCaNhanDanhGia IS NULL OR MaCaNhanDanhGia ='[]') ");
        where.Append(" And LevelBoTieuChi Is NUll");
        where.Append(" And SuDung = 'TRUE' ");
        where.Append(" AND NOT (MaCapDanhGia IS NULL    AND MaDonViDanhGia IS NULL     AND MaChucVuDanhGia IS NULL     AND MaChucDanhDanhGia IS NULL     AND MaCaNhanDanhGia IS NULL  )");
        return where.ToString();
    }
}

