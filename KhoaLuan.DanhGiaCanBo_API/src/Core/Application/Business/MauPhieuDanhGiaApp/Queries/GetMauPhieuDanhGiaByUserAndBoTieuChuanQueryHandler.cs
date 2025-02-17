using MediatR;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Common.Models;
using TD.DanhGiaCanBo.Domain.Business;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Domain.Constant;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp;
using TD.DanhGiaCanBo.Application.Common.Zalo;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries
{
    public class GetMauPhieuDanhGiaByUserAndBoTieuChuanQueryHandler : IRequestHandler<GetMauPhieuDanhGiaByUserAndBoTieuChuanQuery, Result<PaginationResponse<MauPhieuDanhGiaDto>>>
    {
        private readonly IDapperRepository _dapperRepository;
        private readonly ICurrentUser _currentUser;
        private readonly IMediator _mdeiator;
        public GetMauPhieuDanhGiaByUserAndBoTieuChuanQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser, IMediator mdeiator)
        {
            _dapperRepository = dapperRepository;
            _currentUser = currentUser;
            _mdeiator = mdeiator;
        }

        public async Task<Result<PaginationResponse<MauPhieuDanhGiaDto>>> Handle(GetMauPhieuDanhGiaByUserAndBoTieuChuanQuery request, CancellationToken cancellationToken)
        {
            try
            {
                string currentUserGruopId = string.Empty;
                var currentUserOfficeCode = _currentUser.GetOfficeCode();

                var currentUserId = Guid.Empty;
                if (request.UserId.HasValue)
                    currentUserId = request.UserId.Value;
                else currentUserId = _currentUser.GetUserId();
                if (request.TruongDonViUserGroupId != null)
                    currentUserGruopId = request.TruongDonViUserGroupId;
                else
                    currentUserGruopId = _currentUser.GetUserGroupId();

                var userInfo = await GetUserInfoAsync(currentUserGruopId, cancellationToken);
                if (!string.IsNullOrEmpty(currentUserOfficeCode) && !string.IsNullOrEmpty(userInfo.MaDonVi) && currentUserOfficeCode != userInfo.MaDonVi)
                    currentUserOfficeCode = userInfo.MaDonVi;
                if (userInfo == null)
                    throw new NotFoundException($"Không tìm thấy thông tin người dùng với mã user: {request.UserId}");
                //CheckBo
                var itemBoCheck = await GetBoInfoAsync(request.MaBoTieuChuan, cancellationToken);
                if (itemBoCheck == null)
                    throw new NotFoundException($"Không tìm thấy thông tin bo tieu chuan với mã: {request.MaBoTieuChuan}");
                if (itemBoCheck != null)
                {
                    int startMonthInt = 0; int startDayInt = 0; int endDayInt = 0;
                    var thoiGian = itemBoCheck.ThoiGian;
                    if (thoiGian.Contains("##"))
                    {
                        var parts = thoiGian.Split("##");
                        if (parts.Length >= 2)
                        {

                            startMonthInt = int.Parse(parts[0]);  // Tháng
                            var dateRange = parts[1];

                            // Tách ngày từ "10-20"
                            var dateParts = dateRange.Split('-');
                            if (dateParts.Length == 2)
                            {
                                startDayInt = int.Parse(dateParts[0]);  // Ngày bắt đầu
                                endDayInt = int.Parse(dateParts[1]);    // Ngày kết thúc
                            }


                        }
                    }
                    else
                    {
                        var dateParts = thoiGian.Split('-');
                        if (dateParts.Length == 2)
                        {
                            startDayInt = int.Parse(dateParts[0]);  // Ngày bắt đầu
                            endDayInt = int.Parse(dateParts[1]);    // Ngày kết thúc
                        }
                    }

                    DateTime currentDate = DateTime.Today;
                    int currentDay = currentDate.Day;    // Lấy ngày
                    int currentMonth = currentDate.Month; // Lấy tháng
                    int currentYear = currentDate.Year;
                    if (startMonthInt > 0)
                    {
                        if (startMonthInt == currentMonth && startDayInt <= currentDay && currentDay <= endDayInt)
                        {

                        }
                        else
                        {
                            //CheckGiaHan
                            var itemGiaHanCheck = await GetGiaHanInfoAsync(request.MaBoTieuChuan, currentUserOfficeCode, cancellationToken);
                            if (itemGiaHanCheck != null && itemGiaHanCheck.TuNgay.HasValue && itemGiaHanCheck.DenNgay.HasValue)
                            {
                                var tuNgayCheck = itemGiaHanCheck.TuNgay;
                                var denNgayCheck = itemGiaHanCheck.DenNgay.Value.AddDays(1);
                                if(currentDate>= tuNgayCheck && currentDate < denNgayCheck)
                                {

                                }
                                else return Result<PaginationResponse<MauPhieuDanhGiaDto>>.Fail(message: "Bộ tiêu chuẩn này không được đánh giá ở thời điểm hiện tại!");

                            }
                            else return Result<PaginationResponse<MauPhieuDanhGiaDto>>.Fail(message: "Bộ tiêu chuẩn này không được đánh giá ở thời điểm hiện tại!");
                        }
                    }
                    else
                    {
                        if (startDayInt <= currentDay && currentDay <= endDayInt)
                        {

                        }
                        else
                        {
                            //CheckGiaHan
                            var itemGiaHanCheck = await GetGiaHanInfoAsync(request.MaBoTieuChuan, currentUserOfficeCode, cancellationToken);
                            if (itemGiaHanCheck != null && itemGiaHanCheck.TuNgay.HasValue && itemGiaHanCheck.DenNgay.HasValue)
                            {
                                var tuNgayCheck = itemGiaHanCheck.TuNgay;
                                var denNgayCheck = itemGiaHanCheck.DenNgay.Value.AddDays(1);
                                if (currentDate >= tuNgayCheck && currentDate < denNgayCheck)
                                {

                                }
                                else return Result<PaginationResponse<MauPhieuDanhGiaDto>>.Fail(message: "Bộ tiêu chuẩn này không được đánh giá ở thời điểm hiện tại!");

                            }
                            else
                                return Result<PaginationResponse<MauPhieuDanhGiaDto>>.Fail(message: "Bộ tiêu chuẩn này không được đánh giá ở thời điểm hiện tại!");
                        }
                    }
                }
                //
             

                var chucVu = await GetChucVuAsync(userInfo.ChucVuId, cancellationToken);
                var chucDanh = await GetChucDanhAsync(userInfo.ChucDanhId, cancellationToken);

                userInfo.MaChucVu = chucVu;
                userInfo.MaChucDanh = chucDanh;

                var whereClause = BuildWhereClause(request, userInfo);
                var sql = $@"SELECT * FROM [Business].[MauPhieuDanhGias] {whereClause}";

                if (request.PageSize < 25)
                {
                    request.PageSize = 25;
                }

                var data = await _dapperRepository.PaginatedListSingleQueryAsync<MauPhieuDanhGiaDto>(
                    sql,
                    request.PageSize,
                    "Ten ASC",
                    cancellationToken,
                    request.PageNumber,
                    new { UserGruopId = $"%{currentUserGruopId}%", MaBoTieuChuan = $"%{request.MaBoTieuChuan}%", MaDonVi = $"%{currentUserOfficeCode}%", ChucVu = $"%{userInfo.MaChucVu}%", ChucDanh = $"%{userInfo.MaChucDanh}%", Catalog = $"%{userInfo.Catalog}%" }
                );

                if (data == null || data.Data == null)
                    throw new NotFoundException($"Không tìm thấy mẫu phiếu đánh giá nào với mã user: {currentUserId}");

                //CheckMauMacDinhUser
                var sqlUser = $@"SELECT MaPhieuDanhGia FROM [Identity].[ApplicationUserGroups] where Id = N'{currentUserGruopId}'";
                var maMacDinhUser = await _dapperRepository.QuerySingleAsync<string>(sqlUser);
                if (!string.IsNullOrEmpty(maMacDinhUser))
                {
                    var lstCheck = data.Data;
                    var lstmau04 = data.Data.Where(x => x.Ten != null && x.Ten.Contains("Phụ lục 04:")).ToList();
                    if (lstmau04.Count > 1)
                    {
                        foreach (var itemCheckMau04 in lstmau04)
                        {
                            if (!string.IsNullOrEmpty(itemCheckMau04.Id.ToString()) && !maMacDinhUser.Contains(itemCheckMau04.Id.ToString()))
                                data.Data.Remove(itemCheckMau04);
                        }
                    }
                    //var checkMauTT1 = data.Data.FirstOrDefault(x => x.Ten == "Phụ lục 04: Thẩm tra viên, Thư ký làm nhiệm vụ giúp việc cho Lãnh đạo, Thẩm phán Tòa án nhân dân tối cao");
                    //var checkMauTT2 = data.Data.FirstOrDefault(x => x.Ten == "Phụ lục 04: Thẩm tra viên, Thư ký công tác tại các Vụ Giám đốc kiểm tra TANDTC, Phòng Giám đốc kiểm tra TANDCC hoặc thực hiện các nhiệm vụ về công tác thi hành án tại TAND tỉnh, TAND huyện");
                    //var checkMauTT2 = data.Data.FirstOrDefault(x => x.Ten == "Phụ lục 04: Thư ký làm công tác thư ký các phiên tòa sơ thẩm, phúc thẩm");
                    //if (checkMauTT1 != null && checkMauTT2 != null)
                    //{
                    //    if (!string.IsNullOrEmpty(checkMauTT1.Id.ToString()) && !maMacDinhUser.Contains(checkMauTT1.Id.ToString()))
                    //        data.Data.Remove(checkMauTT1);
                    //    if (!string.IsNullOrEmpty(checkMauTT2.Id.ToString()) && !maMacDinhUser.Contains(checkMauTT2.Id.ToString()))
                    //        data.Data.Remove(checkMauTT2);


                    //}
                }
                //CheckUserKhongCHucVu
                if (string.IsNullOrEmpty(userInfo.MaChucVu))
                {
                    var dsCauHinhCV = data.Data.Where(x => x.MaChucVuDanhGia != null && x.MaChucVuDanhGia != "[]").ToList();
                    if (dsCauHinhCV.Count > 0)
                    {
                        foreach (var itemCV in dsCauHinhCV)
                        {
                            data.Data.Remove(itemCV);
                        }
                    }

                }
                //CheckUserKhongChucDanh
                if (string.IsNullOrEmpty(userInfo.MaChucDanh))
                {
                    var dsCauHinhCD = data.Data.Where(x => x.MaChucDanhDanhGia != null && x.MaChucDanhDanhGia != "[]").ToList();
                    if (dsCauHinhCD.Count > 0)
                    {
                        foreach (var itemCD in dsCauHinhCD)
                        {
                            data.Data.Remove(itemCD);
                        }
                    }
                }

                foreach (var item in data.Data)
                {

                    var res = await _mdeiator.Send(new GetLstTieuChiByMauPhieuQuery()
                    {
                        MaMauPhieuDanhGia = item.Ma.ToString(),
                    });

                    if (res != null)
                    {
                        item.JsonDanhGia = JsonConvert.SerializeObject(res.Data.DanhSachTieuChi, Formatting.Indented).Replace("\r\n", "").Replace("  ", string.Empty);
                        item.DanhSachPhanLoaiDanhGia = JsonConvert.SerializeObject(res.Data.DanhSachPhanLoaiDanhGia, Formatting.Indented).Replace("\r\n", "").Replace("  ", string.Empty);
                    }
                }
                return Result<PaginationResponse<MauPhieuDanhGiaDto>>.Success(data);
            }
            catch (Exception ex)
            {
                throw new NotFoundException(ex.Message);
            }
        }
        
        private async Task<BoTieuChuanInfoDto> GetBoInfoAsync(Guid? maBoTieuChuan, CancellationToken cancellationToken)
        {
            var userSql = $@"SELECT MaBoTieuChi,LoaiThoiGian,ThoiGian FROM {TableNames.BoTieuChuans}
 WHERE MaBoTieuChi = @MaBoTieuChi";     
            return await _dapperRepository.QueryFirstOrDefaultObjectAsync<BoTieuChuanInfoDto>(userSql, new { MaBoTieuChi = maBoTieuChuan });
        }
        private async Task<GiaHanInfoDto> GetGiaHanInfoAsync(Guid? maBoTieuChuan, string? currentUserOfficeCode, CancellationToken cancellationToken)
        {
            var userSql = $@"SELECT TuNgay,DenNgay FROM [Business].[GiaHanDanhGias]
 WHERE MaBoTieuChi = @MaBoTieuChi and MaDonVi=@MaDonVi Order By CreatedOn DESC";
            return await _dapperRepository.QueryFirstOrDefaultObjectAsync<GiaHanInfoDto>(userSql, new { MaBoTieuChi = maBoTieuChuan, MaDonVi = currentUserOfficeCode });
        }
        private async Task<UserInfoDto> GetUserInfoAsync(string currentUserGruopId, CancellationToken cancellationToken)
        {
            var userSql = $@"
                SELECT u.[GroupCode] AS MaDonVi, aug.[ChucVuId] AS ChucVuId, aug.[ChucDanhId] AS ChucDanhId 
                FROM [Identity].[Users] u
                LEFT JOIN [Identity].[ApplicationUserGroups] aug ON u.[Id] = aug.[UserId]
                WHERE u.[Id] = @UserId";

            var userSql2 = $@"
                SELECT aug.[OfficeCode] AS MaDonVi, aug.[ChucVuId] AS ChucVuId, aug.[ChucDanhId] AS ChucDanhId ,g.Catalog
                FROM [Catalog].[Groups] g
                LEFT JOIN [Identity].[ApplicationUserGroups] aug ON g.[GroupCode] = aug.[OfficeCode]
                WHERE aug.[Id] = @UserGruopId";
            return await _dapperRepository.QueryFirstOrDefaultObjectAsync<UserInfoDto>(userSql2, new { UserGruopId = currentUserGruopId });
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

        private string BuildWhereClause(GetMauPhieuDanhGiaByUserAndBoTieuChuanQuery request, UserInfoDto userInfo)
        {
            var where = new StringBuilder();
            where.Append(" WHERE 1=1");

            // Tạm tắt do user

            if (!string.IsNullOrEmpty(userInfo.MaDonVi))
                where.Append($"AND (  MaDonViDanhGia LIKE @MaDonVi  OR MaDonViDanhGia IS NULL OR MaDonViDanhGia ='[]' )");

            if (!string.IsNullOrEmpty(userInfo.MaChucVu))
                where.Append(" AND ( MaChucVuDanhGia LIKE @ChucVu    OR MaChucVuDanhGia IS NULL OR MaChucVuDanhGia ='[]' )");

            if (!string.IsNullOrEmpty(userInfo.MaChucDanh))
                where.Append(" AND ( MaChucDanhDanhGia LIKE @ChucDanh  OR MaChucDanhDanhGia IS NULL OR MaChucDanhDanhGia ='[]' ) ");

            if (!string.IsNullOrEmpty(userInfo.Catalog))
                where.Append(" AND ( MaCapDanhGia LIKE @Catalog  OR MaCapDanhGia IS NULL OR MaCapDanhGia ='[]') ");
            if (request.MaBoTieuChuan != Guid.Empty)
                where.Append(" AND MaBoTieuChi LIKE @MaBoTieuChuan");
            where.Append(" AND (MaCaNhanDanhGia LIKE @UserGruopId  OR MaCaNhanDanhGia IS NULL OR MaCaNhanDanhGia ='[]') ");
            where.Append(" And LevelBoTieuChi Is NUll");
            where.Append(" And SuDung = 1 ");
            where.Append(" AND NOT (MaCapDanhGia IS NULL    AND MaDonViDanhGia IS NULL     AND MaChucVuDanhGia IS NULL     AND MaChucDanhDanhGia IS NULL     AND MaCaNhanDanhGia IS NULL  )");
            return where.ToString();
        }
    }

    public class UserInfoDto
    {
        public string MaDonVi { get; set; }
        public string MaChucVu { get; set; }
        public string MaChucDanh { get; set; }

        public Guid ChucVuId { get; set; }
        public Guid ChucDanhId { get; set; }
        public Guid DonViId { get; set; }
        public string Catalog { get; set; }
    }
    public class BoTieuChuanInfoDto
    {
        public string? LoaiThoiGian { get; set; }
        public string? ThoiGian { get; set; }
        public string? MaBoTieuChi { get; set; }
    }
    public class GiaHanInfoDto
    {
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
    }
  
   
}
