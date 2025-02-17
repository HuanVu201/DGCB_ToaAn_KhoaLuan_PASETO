using System.IO;
using System.Text;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Queries;

public class GetBoTieuChuanByLoaiThoiGianQueryWhereBuilder
{
    public static string Build(GetBoTieuChuanByLoaiThoiGianQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.LoaiThoiGian))
            where += " AND LoaiThoiGian LIKE '%' + @LoaiThoiGian + '%'";
        if (req.Removed == false)
            where += " AND DeletedOn IS NULL";
        else if (req.Removed == true)
            where += " AND DeletedOn IS NOT NULL";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class GetBoTieuChuanByLoaiThoiGianQueryHandler : IRequestHandler<GetBoTieuChuanByLoaiThoiGianQuery, Result<PaginationResponse<BoTieuChuanDto>>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;

    public GetBoTieuChuanByLoaiThoiGianQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    private async Task<UserInfoUpdateDto> GetUserInfoAsync(string currentUserGruopId, CancellationToken cancellationToken)
    {
        var userSql2 = $@"
                SELECT aug.[OfficeCode] AS MaDonVi ,g.Catalog
                FROM [Catalog].[Groups] g
                LEFT JOIN [Identity].[ApplicationUserGroups] aug ON g.[GroupCode] = aug.[OfficeCode]
                WHERE aug.[Id] = @UserGruopId";
        return await _dapperRepository.QueryFirstOrDefaultObjectAsync<UserInfoUpdateDto>(userSql2, new { UserGruopId = currentUserGruopId });
    }

    private async Task<string> GetChucVuAsync(Guid chucVuId, CancellationToken cancellationToken)
    {
        var chucVuSql = "SELECT [Ma] FROM [Business].[ChucVus] WHERE [Id] = @ChucVuId";
        return await _dapperRepository.QueryFirstOrDefaultObjectAsync<string>(chucVuSql, new { ChucVuId = chucVuId });
    }

    private async Task<string> GetChucDanhAsync(Guid chucDanhId, CancellationToken cancellationToken)
    {
        var chucDanhSql = "SELECT [Ma] FROM [Business].[ChucDanhs] WHERE [Id] = @ChucDanhId";
        return await _dapperRepository.QueryFirstOrDefaultObjectAsync<string>(chucDanhSql, new { ChucDanhId = chucDanhId });
    }

    private string BuildWhereClause(GetBoTieuChuanByLoaiThoiGianQuery request, UserInfoUpdateDto userInfo)
    {
        var where = new StringBuilder();
        where.Append(" WHERE SuDung = 1 AND LaDonVi = 1 AND DeletedOn Is Null AND LoaiThoiGian = @LoaiThoiGian");

        // Tạm tắt do user

        if (!string.IsNullOrEmpty(userInfo.MaDonVi))
            where.Append($" AND (  MaDonViDanhGia LIKE @MaDonVi  OR MaDonViDanhGia IS NULL OR MaDonViDanhGia ='[]' )");
        if (!string.IsNullOrEmpty(userInfo.Catalog))
            where.Append(" AND ( MaCapDanhGia LIKE @Catalog  OR MaCapDanhGia IS NULL OR MaCapDanhGia ='[]') ");
        where.Append(" AND NOT (MaCapDanhGia IS NULL  AND MaDonViDanhGia IS NULL)");
        return where.ToString();
    }

    public async Task<Result<PaginationResponse<BoTieuChuanDto>>> Handle(GetBoTieuChuanByLoaiThoiGianQuery request, CancellationToken cancellationToken)
    {
        string userGroupId = _currentUser.GetUserGroupId() ?? string.Empty;
        string maDonViHT = _currentUser.GetOfficeCode() ?? string.Empty;
        if (string.IsNullOrEmpty(userGroupId))
        {
            return Result<PaginationResponse<BoTieuChuanDto>>.Fail(message: "Không có thông tin người đánh giá hiện tại!");
        }

        if (!string.IsNullOrEmpty(request.ThoiGianQuery)) // Kiểm tra đánh giá thời gian này đã được thực hiện chưa
        {
            string whereChekDanhGia = string.Empty;

            if (request.TruongDonVi.HasValue && request.TruongDonVi == true)
            {
                whereChekDanhGia += " AND TruongDonVi = 1";

                if (request.TypeCheck == "DanhGias") // Áp dụng kiểm tra đánh giá đơn vị sẽ dùng bảng DanhGiaDonVis
                    whereChekDanhGia += " AND (CreatedBy = @UserGroupId OR NguoiTuDanhGiaId = @UserGroupId) ";
            }
            else
            {
                if (request.TypeCheck == "DanhGias") // Áp dụng kiểm tra đánh giá đơn vị sẽ dùng bảng DanhGiaDonVis
                    whereChekDanhGia += " AND NguoiTuDanhGiaId = @UserGroupId ";
            }

            if (!string.IsNullOrEmpty(request.MaDonVi))
            {
                whereChekDanhGia += " AND MaDonVi = @MaDonVi";
            }
            if (!string.IsNullOrEmpty(request.MaPhongBan))
            {
                whereChekDanhGia += " AND MaPhongBan = @MaPhongBan";
            }

            if (request.IsCungDonVi == true)
            {
                whereChekDanhGia += " AND MaDonVi = MaDonViCha ";
            }
            else if (request.IsCungDonVi == false)
            {
                whereChekDanhGia += " AND MaDonVi != MaDonViCha ";
            }

            string sqlCheckDanhGia = @$"SELECT [Id]
                                        FROM [Business].[{request.TypeCheck}]
                                        WHERE DeletedOn is null AND SuDung = 1 and TrangThai != N'Chưa đánh giá'
                                        AND ThoiGianQuery = @ThoiGianQuery {whereChekDanhGia}";

            var resCheckDanhGia = await _dapperRepository.PaginatedListSingleQueryAsync<DanhGiaDto>(sqlCheckDanhGia, 1000, "Id", cancellationToken, 1, new
            {
                ThoiGianQuery = request.ThoiGianQuery,
                UserGroupId = userGroupId,
                MaDonVi = request.MaDonVi,
                MaPhongBan = request.MaPhongBan,
            });

            if (resCheckDanhGia.TotalCount > 0)
            {
                return Result<PaginationResponse<BoTieuChuanDto>>.Fail(message: "Kỳ đánh giá này đã được đánh giá");
            }
        }

        #region Huấn: Để tạm đoạn này để sử dụng cho đánh giá đơn vị, cấp xử lý, đơn vị sử dụng
        if (!string.IsNullOrEmpty(request.TypeCheck) && request.TypeCheck.ToLower() == "danhgiadonvis")
        {
            var currentUserGruopId = _currentUser.GetUserGroupId();
            var currentUserOfficeCode = _currentUser.GetOfficeCode();

            var userInfo = await GetUserInfoAsync(currentUserGruopId, cancellationToken);
            if (!string.IsNullOrEmpty(currentUserOfficeCode) && !string.IsNullOrEmpty(userInfo.MaDonVi) && currentUserOfficeCode != userInfo.MaDonVi)
                currentUserOfficeCode = userInfo.MaDonVi;
            if (userInfo == null)
                throw new NotFoundException($"Không tìm thấy thông tin người dùng với mã usergroup: {currentUserGruopId}");



            var whereClause = BuildWhereClause(request, userInfo);

            string sqlExtentions = $@"
            SELECT 
                Id,
                MaBoTieuChi,
                TenBoTieuChi,
                SuDung,
                DinhKem,
                SoKyHieu,
                NgayBanHanh,
                CoQuanBanHanh,
                LoaiThoiGian,
                ThoiGian,
                DonVi,
                TuNgay,
                DenNgay
            FROM 
                {TableNames.BoTieuChuans} {whereClause}";
            var dataDV = await _dapperRepository.PaginatedListSingleQueryAsync<BoTieuChuanDto>(sqlExtentions, request.PageSize, "ID", cancellationToken, request.PageNumber, new { LoaiThoiGian = request.LoaiThoiGian,MaDonVi = $"%{currentUserOfficeCode}%", Catalog = $"%{userInfo.Catalog}%" });
            return Result<PaginationResponse<BoTieuChuanDto>>.Success(dataDV);
        }
        #endregion

        //Kiểm tra đơn vị có GiaHanhDanhGia nào ko
        //    string CheckGiaHanDanhGiaQuery = @$"SELECT [Id],[ThoiGian],[LoaiThoiGian],[MaDonVi]
        //                                    FROM [Business].[GiaHanDanhGias]
        //                                    WHERE DeletedOn is null AND MaDonVi = @MaDonVi AND LoaiThoiGian = @LoaiThoiGian And TrangThai = N'Đã xử lý'
        //                                    AND (
        //    (YEAR(CreatedOn) = YEAR(GETDATE()) AND MONTH(CreatedOn) = MONTH(GETDATE()))
        //    OR
        //    (YEAR(CreatedOn) = YEAR(GETDATE()) AND MONTH(CreatedOn) = MONTH(DATEADD(MONTH, -1, GETDATE())))
        //) ORDER BY CreatedOn DESC";
        //    var dataGiaHanDanhGia = await _dapperRepository.QueryFirstOrDefaultAsync<ReviewExtentionsDto>(CheckGiaHanDanhGiaQuery, new { LoaiThoiGian = request.LoaiThoiGian, MaDonVi = _currentUser.GetOfficeCode() });
        //    var extention = false;

        //    //tính thời gian gia hạn so với ngày hiện tại
        //    // cộng thêm số thời gian ra hạn cho tất cả cận trên của phiếu
        //    // truy vấn theo ngày hôm đó bình thương

        //    var where = GetBoTieuChuanByLoaiThoiGianQueryWhereBuilder.Build(request);
        //    DateTime currentDate = DateTime.Now;

        //    int currentDay = currentDate.Day;    // Lấy ngày
        //    int currentMonth = currentDate.Month; // Lấy tháng
        //    int currentYear = currentDate.Year;
        //    int thangThu = 0;
        //    if (request.LoaiThoiGian == "Tháng")
        //    {
        //        // part2  < Kết quả  < part3
        //    }

        //    if (request.LoaiThoiGian == "Quý")
        //    {
        //        // part2  < Kết quả  < part3
        //        if (currentMonth == 1 || currentMonth == 4 || currentMonth == 7 || currentMonth == 10)
        //            thangThu = 1;

        //        if (currentMonth == 2 || currentMonth == 5 || currentMonth == 8 || currentMonth == 11)
        //            thangThu = 2;

        //        if (currentMonth == 3 || currentMonth == 6 || currentMonth == 9 || currentMonth == 12)
        //            thangThu = 3;

        //    }

        //    if (request.LoaiThoiGian == "6 tháng")
        //    {
        //        // part2  < Kết quả  < part3
        //        if (currentMonth == 1 || currentMonth == 7)
        //            thangThu = 1;

        //        if (currentMonth == 2 || currentMonth == 8)
        //            thangThu = 2;

        //        if (currentMonth == 3 || currentMonth == 9)
        //            thangThu = 3;

        //        if (currentMonth == 4 || currentMonth == 10)
        //            thangThu = 4;

        //        if (currentMonth == 5 || currentMonth == 11)
        //            thangThu = 5;

        //        if (currentMonth == 6 || currentMonth == 12)
        //            thangThu = 6;

        //    }

        //    if (request.LoaiThoiGian == "Năm")
        //    {
        //        // part2  < Kết quả  < part3

        //        thangThu = currentMonth;


        //    }
        //    if (dataGiaHanDanhGia != null)
        //    {
        //        dataGiaHanDanhGia.ProcessThoiGian();
        //        int endMonthInt = 0;
        //        int startMonthInt = int.Parse(dataGiaHanDanhGia.Month);
        //        if (!string.IsNullOrEmpty(dataGiaHanDanhGia.MonthTo))
        //            endMonthInt = int.Parse(dataGiaHanDanhGia.MonthTo);
        //        int startDayInt = int.Parse(dataGiaHanDanhGia.ExtendStartDay);
        //        int endDayInt = int.Parse(dataGiaHanDanhGia.ExtendEndDay);
        //        if (endMonthInt == 0)
        //        {
        //            if (startMonthInt == currentMonth && startDayInt <= currentDay && currentDay <= endDayInt)
        //            {
        //                extention = true;

        //            }
        //        }
        //        else
        //        {
        //            if (currentMonth == 12)
        //            {
        //                if (startMonthInt == 12 && endMonthInt == 1 && ((startDayInt <= currentDay) || (currentDay <= endDayInt)))
        //                {
        //                    extention = true;
        //                }
        //            }
        //            else
        //            {
        //                if (startMonthInt >= currentMonth && currentMonth <= endMonthInt && ((startDayInt <= currentDay) || (currentDay <= endDayInt)))
        //                {
        //                    extention = true;

        //                }
        //            }


        //        }
        //    }


        //    string Where = string.Empty;
        //    if (thangThu != 0)
        //    {
        //        request.ThangThuOfThoiGian = thangThu.ToString();
        //        Where = $@"  AND (CASE
        //                    WHEN CHARINDEX('##', ThoiGian) > 0
        //                    THEN SUBSTRING(ThoiGian, 1, CHARINDEX('##', ThoiGian) - 1) 
        //                    ELSE ''
        //                  END) = @ThangThuOfThoiGian";
        //    }
        //    request.CurrentDayOfTime = currentDay.ToString();
        //if (extention == true)
        //{
        string sqlExtentionsCaNhan = $@"
            SELECT 
                Id,
                MaBoTieuChi,
                TenBoTieuChi,
                SuDung,
                DinhKem,
                SoKyHieu,
                NgayBanHanh,
                CoQuanBanHanh,
                LoaiThoiGian,
                ThoiGian,
                DonVi,
                TuNgay,
                DenNgay
            FROM 
                {TableNames.BoTieuChuans}
            WHERE SuDung = 1 and LaDonVi IS NULL AND LoaiThoiGian = @LoaiThoiGian And DeletedOn Is Null";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<BoTieuChuanDto>(sqlExtentionsCaNhan, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return Result<PaginationResponse<BoTieuChuanDto>>.Success(data);
        //}
        //else
        //{
        //    string sql = $@"
        //    SELECT 
        //        Id,
        //        MaBoTieuChi,
        //        TenBoTieuChi,
        //        SuDung,
        //        DinhKem,
        //        SoKyHieu,
        //        NgayBanHanh,
        //        CoQuanBanHanh,
        //        LoaiThoiGian,
        //        ThoiGian,
        //        DonVi,
        //        TuNgay,
        //        DenNgay,
        //        CASE
        //            WHEN CHARINDEX('##', ThoiGian) > 0
        //            THEN SUBSTRING(ThoiGian, 1, CHARINDEX('##', ThoiGian) - 1) 
        //            ELSE ''
        //        END AS Part1,
        //        CASE
        //            WHEN CHARINDEX('##', ThoiGian) > 0 AND CHARINDEX('-', ThoiGian) > CHARINDEX('##', ThoiGian) + 1
        //            THEN SUBSTRING(ThoiGian, CHARINDEX('##', ThoiGian) + 2, CHARINDEX('-', ThoiGian) - CHARINDEX('##', ThoiGian) - 2) 
        //            ELSE ''
        //        END AS Part2,
        //        CASE
        //            WHEN CHARINDEX('-', ThoiGian) > 0
        //            THEN SUBSTRING(ThoiGian, CHARINDEX('-', ThoiGian) + 1, LEN(ThoiGian)) 
        //            ELSE ''
        //        END AS Part3
        //    FROM 
        //        {TableNames.BoTieuChuans}
        //    WHERE
        //        CAST(SUBSTRING(ThoiGian, CHARINDEX('##', ThoiGian) + 2, CHARINDEX('-', ThoiGian) - CHARINDEX('##', ThoiGian) - 2) AS INT) <= @CurrentDayOfTime
        //        AND CAST(SUBSTRING(ThoiGian, CHARINDEX('-', ThoiGian) + 1, LEN(ThoiGian)) AS INT) >= @CurrentDayOfTime

        // {Where}
        // AND LoaiThoiGian = @LoaiThoiGian And DeletedOn Is Null";
        //    var data = await _dapperRepository.PaginatedListSingleQueryAsync<BoTieuChuanDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        //    return Result<PaginationResponse<BoTieuChuanDto>>.Success(data);
        //}


    }
}
public class UserInfoUpdateDto
{
    public string MaDonVi { get; set; }
    public Guid DonViId { get; set; }
    public string Catalog { get; set; }
}
