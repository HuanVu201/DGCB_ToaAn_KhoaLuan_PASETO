//using System.IO;
//using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
//using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
//using TD.DanhGiaCanBo.Application.Common.Caching;
//using TD.DanhGiaCanBo.Application.Common.Persistence;
//using TD.DanhGiaCanBo.Domain.Business;
//using TD.DanhGiaCanBo.Domain.Constant;

//namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Queries;

//public class GetBoTieuChuanByLoaiThoiGianQueryWhereBuilder
//{
//    public static string Build(GetBoTieuChuanByLoaiThoiGianQuery req)
//    {
//        string where = string.Empty;
//        if (!string.IsNullOrEmpty(req.LoaiThoiGian))
//            where += " AND LoaiThoiGian LIKE '%' + @LoaiThoiGian + '%'";
//        if (req.Removed == false)
//            where += " AND DeletedOn IS NULL";
//        else if (req.Removed == true)
//            where += " AND DeletedOn IS NOT NULL";
//        if (where.TrimStart().StartsWith("AND"))
//            where = where.TrimStart().Substring("AND".Length);
//        if (where != string.Empty)
//            return $" WHERE ({where})";
//        return where;
//    }
//}

//public class GetBoTieuChuanByLoaiThoiGianQueryHandler : IRequestHandler<GetBoTieuChuanByLoaiThoiGianQuery, Result<PaginationResponse<BoTieuChuanDto>>>
//{
//    private readonly IDapperRepository _dapperRepository;
//    private readonly ICurrentUser _currentUser;

//    public GetBoTieuChuanByLoaiThoiGianQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
//    {
//        _dapperRepository = dapperRepository;
//        _currentUser = currentUser;
//    }

//    public async Task<Result<PaginationResponse<BoTieuChuanDto>>> Handle(GetBoTieuChuanByLoaiThoiGianQuery request, CancellationToken cancellationToken)
//    {
//        string userGroupId = _currentUser.GetUserGroupId() ?? string.Empty;
//        string maDonViHT = _currentUser.GetOfficeCode() ?? string.Empty;
//        if (string.IsNullOrEmpty(userGroupId))
//        {
//            return Result<PaginationResponse<BoTieuChuanDto>>.Fail(message: "Không có thông tin người đánh giá hiện tại!");
//        }

//        if (!string.IsNullOrEmpty(request.ThoiGianQuery)) // Kiểm tra đánh giá thời gian này đã được thực hiện chưa
//        {
//            string whereChekDanhGia = string.Empty;

//            if (request.TruongDonVi.HasValue && request.TruongDonVi == true)
//            {
//                whereChekDanhGia += " AND TruongDonVi = 1";

//                if (request.TypeCheck == "DanhGias") // Áp dụng kiểm tra đánh giá đơn vị sẽ dùng bảng DanhGiaDonVis
//                    whereChekDanhGia += " AND (CreatedBy = @UserGroupId OR NguoiTuDanhGiaId = @UserGroupId) ";
//            }
//            else
//            {
//                if (request.TypeCheck == "DanhGias") // Áp dụng kiểm tra đánh giá đơn vị sẽ dùng bảng DanhGiaDonVis
//                    whereChekDanhGia += " AND NguoiTuDanhGiaId = @UserGroupId ";
//            }

//            if (!string.IsNullOrEmpty(request.MaDonVi))
//            {
//                whereChekDanhGia += " AND MaDonVi = @MaDonVi";
//            }
//            if (!string.IsNullOrEmpty(request.MaPhongBan))
//            {
//                whereChekDanhGia += " AND MaPhongBan = @MaPhongBan";
//            }

//            if (request.IsCungDonVi == true)
//            {
//                whereChekDanhGia += " AND MaDonVi = MaDonViCha ";
//            }
//            else if (request.IsCungDonVi == false)
//            {
//                whereChekDanhGia += " AND MaDonVi != MaDonViCha ";
//            }

//            string sqlCheckDanhGia = @$"SELECT [Id]
//                                        FROM [Business].[{request.TypeCheck}]
//                                        WHERE DeletedOn is null AND SuDung = 1 and TrangThai != N'Chưa đánh giá'
//                                        AND ThoiGianQuery = @ThoiGianQuery {whereChekDanhGia}";

//            var resCheckDanhGia = await _dapperRepository.PaginatedListSingleQueryAsync<DanhGiaDto>(sqlCheckDanhGia, 1000, "Id", cancellationToken, 1, new
//            {
//                ThoiGianQuery = request.ThoiGianQuery,
//                UserGroupId = userGroupId,
//                MaDonVi = request.MaDonVi,
//                MaPhongBan = request.MaPhongBan,
//            });

//            if (resCheckDanhGia.TotalCount > 0)
//            {
//                return Result<PaginationResponse<BoTieuChuanDto>>.Fail(message: "Kỳ đánh giá này đã được đánh giá!");
//            }
//        }

//        #region Huấn: Để tạm đoạn này để sử dụng cho đánh giá đơn vị, cấp xử lý, đơn vị sử dụng
//        if (!string.IsNullOrEmpty(request.TypeCheck) && request.TypeCheck.ToLower() == "danhgiadonvis")
//        {
//            string sqlExtentions = $@"
//            SELECT 
//                Id,
//                MaBoTieuChi,
//                TenBoTieuChi,
//                SuDung,
//                DinhKem,
//                SoKyHieu,
//                NgayBanHanh,
//                CoQuanBanHanh,
//                LoaiThoiGian,
//                ThoiGian,
//                DonVi,
//                TuNgay,
//                DenNgay
//            FROM 
//                {TableNames.BoTieuChuans}
//            WHERE LaDonVi = 1 And DeletedOn Is Null";
//            var data = await _dapperRepository.PaginatedListSingleQueryAsync<BoTieuChuanDto>(sqlExtentions, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
//            return Result<PaginationResponse<BoTieuChuanDto>>.Success(data);
//        }
//        #endregion

//        //Kiểm tra đơn vị có GiaHanhDanhGia nào ko
//        string CheckGiaHanDanhGiaQuery = @$"SELECT [Id],[ThoiGian],[LoaiThoiGian],[MaDonVi]
//                                        FROM [Business].[GiaHanDanhGias]
//                                        WHERE DeletedOn is null AND MaDonVi = @MaDonVi AND LoaiThoiGian = @LoaiThoiGian And TrangThai = N'Đã xử lý'
//                                        AND (
//        (YEAR(CreatedOn) = YEAR(GETDATE()) AND MONTH(CreatedOn) = MONTH(GETDATE()))
//        OR
//        (YEAR(CreatedOn) = YEAR(GETDATE()) AND MONTH(CreatedOn) = MONTH(DATEADD(MONTH, -1, GETDATE())))
//    ) ORDER BY CreatedOn DESC";
//        var dataGiaHanDanhGia = await _dapperRepository.QueryFirstOrDefaultAsync<ReviewExtentionsDto>(CheckGiaHanDanhGiaQuery, new { LoaiThoiGian = request.LoaiThoiGian, MaDonVi = _currentUser.GetOfficeCode() });
//        var extention = false;

//        //tính thời gian gia hạn so với ngày hiện tại
//        // cộng thêm số thời gian ra hạn cho tất cả cận trên của phiếu
//        // truy vấn theo ngày hôm đó bình thương

//        var where = GetBoTieuChuanByLoaiThoiGianQueryWhereBuilder.Build(request);
//        DateTime currentDate = DateTime.Now;

//        int currentDay = currentDate.Day;    // Lấy ngày
//        int currentMonth = currentDate.Month; // Lấy tháng
//        int currentYear = currentDate.Year;
//        int thangThu = 0;
//        if (request.LoaiThoiGian == "Tháng")
//        {
//            // part2  < Kết quả  < part3
//        }

//        if (request.LoaiThoiGian == "Quý")
//        {
//            // part2  < Kết quả  < part3
//            if (currentMonth == 1 || currentMonth == 4 || currentMonth == 7 || currentMonth == 10)
//                thangThu = 1;

//            if (currentMonth == 2 || currentMonth == 5 || currentMonth == 8 || currentMonth == 11)
//                thangThu = 2;

//            if (currentMonth == 3 || currentMonth == 6 || currentMonth == 9 || currentMonth == 12)
//                thangThu = 3;

//        }

//        if (request.LoaiThoiGian == "6 tháng")
//        {
//            // part2  < Kết quả  < part3
//            if (currentMonth == 1 || currentMonth == 7)
//                thangThu = 1;

//            if (currentMonth == 2 || currentMonth == 8)
//                thangThu = 2;

//            if (currentMonth == 3 || currentMonth == 9)
//                thangThu = 3;

//            if (currentMonth == 4 || currentMonth == 10)
//                thangThu = 4;

//            if (currentMonth == 5 || currentMonth == 11)
//                thangThu = 5;

//            if (currentMonth == 6 || currentMonth == 12)
//                thangThu = 6;

//        }

//        if (request.LoaiThoiGian == "Năm")
//        {
//            // part2  < Kết quả  < part3

//            thangThu = currentMonth;


//        }
//        if (dataGiaHanDanhGia != null)
//        {
//            dataGiaHanDanhGia.ProcessThoiGian();
//            int startDayInt = int.Parse(dataGiaHanDanhGia.ExtendStartDay);
//            int endDayInt = int.Parse(dataGiaHanDanhGia.ExtendEndDay);
//            if (startDayInt <= currentDay && currentDay <= endDayInt)
//            {
//                extention = true;
//            }
//        }


//        string Where = string.Empty;
//        if (thangThu != 0)
//        {
//            request.ThangThuOfThoiGian = thangThu.ToString();
//            Where = $@"  AND (CASE
//                        WHEN CHARINDEX('##', ThoiGian) > 0
//                        THEN SUBSTRING(ThoiGian, 1, CHARINDEX('##', ThoiGian) - 1) 
//                        ELSE ''
//                      END) = @ThangThuOfThoiGian";
//        }
//        request.CurrentDayOfTime = currentDay.ToString();
//        if (extention == true)
//        {
//            string sqlExtentions = $@"
//            SELECT 
//                Id,
//                MaBoTieuChi,
//                TenBoTieuChi,
//                SuDung,
//                DinhKem,
//                SoKyHieu,
//                NgayBanHanh,
//                CoQuanBanHanh,
//                LoaiThoiGian,
//                ThoiGian,
//                DonVi,
//                TuNgay,
//                DenNgay
//            FROM 
//                {TableNames.BoTieuChuans}
//            WHERE 1 = 1
//	        {Where}
//	        AND LoaiThoiGian = @LoaiThoiGian And DeletedOn Is Null";
//            var data = await _dapperRepository.PaginatedListSingleQueryAsync<BoTieuChuanDto>(sqlExtentions, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
//            return Result<PaginationResponse<BoTieuChuanDto>>.Success(data);
//        }
//        else
//        {
//            string sql = $@"
//            SELECT 
//                Id,
//                MaBoTieuChi,
//                TenBoTieuChi,
//                SuDung,
//                DinhKem,
//                SoKyHieu,
//                NgayBanHanh,
//                CoQuanBanHanh,
//                LoaiThoiGian,
//                ThoiGian,
//                DonVi,
//                TuNgay,
//                DenNgay,
//                CASE
//                    WHEN CHARINDEX('##', ThoiGian) > 0
//                    THEN SUBSTRING(ThoiGian, 1, CHARINDEX('##', ThoiGian) - 1) 
//                    ELSE ''
//                END AS Part1,
//                CASE
//                    WHEN CHARINDEX('##', ThoiGian) > 0 AND CHARINDEX('-', ThoiGian) > CHARINDEX('##', ThoiGian) + 1
//                    THEN SUBSTRING(ThoiGian, CHARINDEX('##', ThoiGian) + 2, CHARINDEX('-', ThoiGian) - CHARINDEX('##', ThoiGian) - 2) 
//                    ELSE ''
//                END AS Part2,
//                CASE
//                    WHEN CHARINDEX('-', ThoiGian) > 0
//                    THEN SUBSTRING(ThoiGian, CHARINDEX('-', ThoiGian) + 1, LEN(ThoiGian)) 
//                    ELSE ''
//                END AS Part3
//            FROM 
//                {TableNames.BoTieuChuans}
//            WHERE
//                CAST(SUBSTRING(ThoiGian, CHARINDEX('##', ThoiGian) + 2, CHARINDEX('-', ThoiGian) - CHARINDEX('##', ThoiGian) - 2) AS INT) <= @CurrentDayOfTime
//                AND CAST(SUBSTRING(ThoiGian, CHARINDEX('-', ThoiGian) + 1, LEN(ThoiGian)) AS INT) >= @CurrentDayOfTime

//	        {Where}
//	        AND LoaiThoiGian = @LoaiThoiGian And DeletedOn Is Null";
//            var data = await _dapperRepository.PaginatedListSingleQueryAsync<BoTieuChuanDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
//            return Result<PaginationResponse<BoTieuChuanDto>>.Success(data);
//        }


//    }
//}
