using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;
namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class GetNhacViecQueryWhereBuilder
{
  
    public static string Build(GetNhacViecQuery req)
    {
        string where = string.Empty;
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }

}
public class GetNhacViecQueryHandler : IQueryHandler<GetNhacViecQuery, List<NhacViecDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public GetNhacViecQueryHandler(IDapperRepository dapperRepository,ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    private class Total
    {
        public int Count { get; set; }
    }
    private async Task<BoTieuChuanNVDto> GetBoNamAsync(CancellationToken cancellationToken)
    {
        var userSql = $@"SELECT MaBoTieuChi,LoaiThoiGian,ThoiGian FROM {TableNames.BoTieuChuans}
 WHERE LoaiThoiGian = N'Năm' and LaDonVi IS NULL and DeletedOn IS NULL and SuDung = 1";
        return await _dapperRepository.QueryFirstOrDefaultObjectAsync<BoTieuChuanNVDto>(userSql);
    }
    private async Task<string> GetTrangThaiDanhGiaAsync(string userGroupId, CancellationToken cancellationToken)
    {
        int currYear = DateTime.Now.Year;
        var userSql = $@"SELECT TrangThai FROM {TableNames.DanhGias}
 WHERE MaNguoiDung = @MaNguoiDung and NamDanhGia = @NamDanhGia and LoaiThoiGian = N'Năm' and DeletedOn IS NULL and SuDung = 1 Order By CreatedOn DESC";
        return await _dapperRepository.QueryFirstOrDefaultObjectAsync<string>(userSql, new { MaNguoiDung = userGroupId, NamDanhGia = currYear });
    }
    private async Task<GiaHanNVDto> GetGiaHanNVAsync(string? maBoTieuChuan, string? currentUserOfficeCode, CancellationToken cancellationToken)
    {
        var userSql = $@"SELECT TuNgay,DenNgay FROM [Business].[GiaHanDanhGias]
 WHERE MaBoTieuChi = @MaBoTieuChi and MaDonVi=@MaDonVi Order By CreatedOn DESC";
        return await _dapperRepository.QueryFirstOrDefaultObjectAsync<GiaHanNVDto>(userSql, new { MaBoTieuChi = maBoTieuChuan, MaDonVi = currentUserOfficeCode });
    }
    private async Task<UserQuyenDanhGiaDto> GetUserQuyenDanhGiaAsync(string currentUserGruopId, CancellationToken cancellationToken)
    {
        var userSql2 = $@"SELECT [KhongDanhGia] FROM [Identity].[ApplicationUserGroups] WHERE [Id] = @UserGruopId";
        return await _dapperRepository.QueryFirstOrDefaultObjectAsync<UserQuyenDanhGiaDto>(userSql2, new { UserGruopId = currentUserGruopId });
    }
    public async Task<Result<List<NhacViecDto>>> Handle(GetNhacViecQuery request, CancellationToken cancellationToken)
    {
        var lstData = new List<NhacViecDto>();
        try
        {
            string userGroupId = _currentUser.GetUserGroupId() ?? string.Empty;
            if (string.IsNullOrEmpty(request.MaDV))
            {
                request.MaDV = _currentUser.GetOfficeCode();
            }
            int currYear = DateTime.Now.Year;
            int currMonth = DateTime.Now.Month;
            var sumNX = 0; var sumCDCP = 0; var sumTMDV = 0; var sumDGDV = 0; var sumGiaHan = 0; var sumKhieuNai = 0;
            var sumLDDG = 0;
            var itemUser = await GetUserQuyenDanhGiaAsync(userGroupId,cancellationToken);
            if (itemUser == null)
                throw new NotFoundException($"Không tìm thấy thông tin user voi ma usergroup: "+ userGroupId);
            if (itemUser != null)
            {
                if(!itemUser.KhongDanhGia.HasValue || (itemUser.KhongDanhGia.HasValue && !itemUser.KhongDanhGia.Value))
                {
                    var trangThaiDanhGiaCheck = await GetTrangThaiDanhGiaAsync(userGroupId, cancellationToken);
                    if (trangThaiDanhGiaCheck == null || trangThaiDanhGiaCheck == "" || trangThaiDanhGiaCheck == "Chưa đánh giá")
                    {
                        //CheckBo
                        var checkDenHan = 0; var checkQuaHan = 0;
                        var itemBoCheck = await GetBoNamAsync(cancellationToken);
                        var currentUserOfficeCode = _currentUser.GetOfficeCode();
                        if (itemBoCheck == null)
                            throw new NotFoundException($"Không tìm thấy thông tin bo tieu chuan danh gia nam ca nhan");
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
                            DateTime currentDate = DateTime.Today;
                            int currentDay = currentDate.Day;    // Lấy ngày
                            int currentMonth = currentDate.Month; // Lấy tháng
                            int currentYear = currentDate.Year;
                            if (startMonthInt > 0)
                            {
                                if (startMonthInt == currentMonth && startDayInt <= currentDay && currentDay <= endDayInt)
                                {
                                    checkDenHan = 1;
                                }
                                else
                                {
                                    //CheckGiaHan
                                    var itemGiaHanCheck = await GetGiaHanNVAsync(itemBoCheck.MaBoTieuChi, currentUserOfficeCode, cancellationToken);
                                    if (itemGiaHanCheck != null && itemGiaHanCheck.TuNgay.HasValue && itemGiaHanCheck.DenNgay.HasValue)
                                    {
                                        var tuNgayCheck = itemGiaHanCheck.TuNgay;
                                        var denNgayCheck = itemGiaHanCheck.DenNgay.Value.AddDays(1);
                                        if (currentDate >= tuNgayCheck && currentDate < denNgayCheck)
                                        {
                                            checkDenHan = 1;
                                        }
                                        else if (currentDate >= denNgayCheck)
                                        {
                                            checkQuaHan = 1;
                                        }

                                    }
                                    else
                                    {
                                        if ((startMonthInt == currentMonth && currentDay > endDayInt) || (startMonthInt == 12 && currentMonth == 1) || (startMonthInt < currentMonth))
                                        {
                                            checkQuaHan = 1;
                                        }

                                    }
                                }
                            }

                        }
                        //Đến hạn đánh giá
                        if (checkDenHan == 1)
                        {
                            var item = new NhacViecDto
                            {
                                DuongDan = "/dgcb/tu-cham-diem/can-bo-tu-cham-diem",
                                MauSac = "DanhGia",
                                Class = "warning",
                                MoTa = "Đến hạn chưa đánh giá",
                                GiaTri = "1",
                                Icon = "fas fa-user-check",
                                Ma = "DenHanDanhGia"
                            };
                            lstData.Add(item);
                        }

                        //Quá hạn đánh giá
                        if (checkQuaHan == 1)
                        {
                            var item = new NhacViecDto
                            {
                                DuongDan = "/dgcb/tu-cham-diem/can-bo-tu-cham-diem",
                                MauSac = "DanhGia",
                                Class = "warning",
                                MoTa = "Quá hạn chưa đánh giá",
                                GiaTri = "1",
                                Icon = "fas fa-user-check",
                                Ma = "QuaHanDanhGia"
                            };
                            lstData.Add(item);
                        }
                    }
                }
            }
           

            // NhanXet
            string queryNX = $@"SELECT COUNT(ID) Count FROM {TableNames.DanhGias}";
            string whereNX = $@" WHERE SuDung = 1 AND DeletedOn IS NULL and (KhongDanhGia!=1 OR KhongDanhGia Is Null) and TrangThai!=N'Chưa đánh giá' AND ThoiGianNhanXet is null";
            whereNX += $@" AND NguoiDangXuLyId =  @CurrentUserName";
            whereNX += $@" AND LoaiThoiGian =  @LoaiThoiGian";
            whereNX += $@" and TrangThai=N'Chờ nhận xét'";
            whereNX += $@" and NamDanhGia = @CurrentYear";

            // Query for count and expect an integer result
             var res = await _dapperRepository.QueryFirstOrDefaultAsync<Total>(queryNX + whereNX,
                new { CurrentUserName = userGroupId, CurrentYear = currYear, MaDonVi = request.MaDV, LoaiThoiGian = request.LoaiThoiGian });
            sumNX = res.Count;
            if (sumNX > 0)
            {
                var item = new NhacViecDto
                {
                    DuongDan = "/dgcb/cbql-cho-nhan-xet",
                    MauSac = "DanhGia",
                    Class = "info",
                    MoTa = "Chờ chấm điểm, nhận xét",
                    Icon = "fas fa-user-check",
                    GiaTri = sumNX.ToString(),
                    Ma = "NXDG_ChoNhanXet"
                };
                lstData.Add(item);
            }

            // ThamMuu
            string queryTM = $@"SELECT COUNT(ID) Count FROM {TableNames.DanhGias}";
            string whereTM = $@" WHERE SuDung = 1 AND DeletedOn IS NULL and (KhongDanhGia!=1 OR KhongDanhGia Is Null) and TrangThai!=N'Chưa đánh giá' AND ThoiGianThamMuu is null";
            whereTM += $@" AND NguoiDangXuLyId =  @CurrentUserName";
            whereTM += $@" AND LoaiThoiGian =  @LoaiThoiGian";
            whereTM += $@" and TrangThai=N'Chờ tham mưu'";
            whereTM += $@" and NamDanhGia = @CurrentYear";

            // Query for count and expect an integer result
            var resTM = await _dapperRepository.QueryFirstOrDefaultAsync<Total>(queryTM + whereTM,
                new { CurrentUserName = userGroupId, CurrentYear = currYear, MaDonVi = request.MaDV, LoaiThoiGian = request.LoaiThoiGian });
            sumCDCP = resTM.Count;
            if (sumCDCP > 0)
            {
                var item = new NhacViecDto
                {
                    DuongDan = "/dgcb/cbdg-cho-tham-muu",
                    MauSac = "DanhGia",
                    Class = "info",
                    MoTa = "Chờ tham mưu đánh giá",
                    Icon = "fas fa-users",
                    GiaTri = sumCDCP.ToString(),
                    Ma = "LDDV_ChoThamMuu"
                };
                lstData.Add(item);
            }

            // DanhGia
            string queryDG = $@"SELECT COUNT(ID) Count FROM {TableNames.DanhGias}";
            string whereDG = $@" WHERE SuDung = 1 AND DeletedOn IS NULL and (KhongDanhGia!=1 OR KhongDanhGia Is Null) and TrangThai!=N'Chưa đánh giá' AND ThoiGianDanhGia is null";
            whereDG += $@" AND NguoiDangXuLyId =  @CurrentUserName";
            whereDG += $" AND ((MaDonVi = @MaDonVi) or (MaDonViCha = @MaDonVi))";
            whereDG += $@"  AND LoaiThoiGian =  @LoaiThoiGian";
            whereDG += $@" and TrangThai=N'Chờ đánh giá'";
            whereDG += $@" and NamDanhGia = @CurrentYear";

            // Query for count and expect an integer result
            var resDG  = await _dapperRepository.QueryFirstOrDefaultAsync<Total>(queryDG + whereDG,
                new { CurrentUserName = userGroupId, CurrentYear = currYear, MaDonVi = request.MaDV, LoaiThoiGian = request.LoaiThoiGian });
            sumLDDG = resDG.Count;
            if (sumLDDG > 0)
            {
                var item = new NhacViecDto
                {
                    DuongDan = "/dgcb/cbdg-cho-danh-gia",
                    MauSac = "DanhGia",
                    MoTa = "Chờ đánh giá, xếp loại",
                    Class = "warning",
                    Icon = "fas fa-user-shield",
                    GiaTri = sumLDDG.ToString(),
                    Ma = "LDDG_ChoDanhGia"
                };
                lstData.Add(item);
            }
            // ThamMuuDonVi
            string queryTMDV = $@"SELECT COUNT(ID) Count FROM {TableNames.DanhGiaDonVis}";
            string whereTMDV = $@" WHERE SuDung = 1 AND DeletedOn IS NULL and TrangThai!=N'Chưa đánh giá' AND ThoiGianThamMuu is null";
            whereTMDV += $@" AND NguoiDangXuLyId =  @CurrentUserName";
            whereTMDV += $@" AND LoaiThoiGian =  @LoaiThoiGian";
            whereTMDV += $@" and TrangThai=N'Chờ tham mưu'";
            whereTMDV += $@" and NamDanhGia = @CurrentYear";

            // Query for count and expect an integer result
            var resTMDV = await _dapperRepository.QueryFirstOrDefaultAsync<Total>(queryTMDV + whereTMDV,
                new { CurrentUserName = userGroupId, CurrentYear = currYear, MaDonVi = request.MaDV, LoaiThoiGian = request.LoaiThoiGian });
            sumTMDV = resTMDV.Count;
            if (sumTMDV > 0)
            {
                var item = new NhacViecDto
                {
                    DuongDan = "/dgcb/tham-muu-danh-gia-don-vi?TrangThai=Chờ tham mưu",
                    MauSac = "DanhGia",
                    Class = "info",
                    MoTa = "Chờ tham mưu đơn vị",
                    Icon = "fas fa-users",
                    GiaTri = sumTMDV.ToString(),
                    Ma = "LDDV_ChoThamMuuDonVi"
                };
                lstData.Add(item);
            }

            // DanhGiaDonVi
            string queryDGDV = $@"SELECT COUNT(ID) Count FROM {TableNames.DanhGiaDonVis}";
            string whereDGV = $@" WHERE SuDung = 1 AND DeletedOn IS NULL and TrangThai!=N'Chưa đánh giá' AND ThoiGianDanhGia is null";
            whereDGV += $@" AND NguoiDangXuLyId =  @CurrentUserName";
            whereDGV += $@"  AND LoaiThoiGian =  @LoaiThoiGian";
            whereDGV += $@" and TrangThai=N'Chờ đánh giá'";
            whereDGV += $@" and NamDanhGia = @CurrentYear";

            // Query for count and expect an integer result
            var resDGDV = await _dapperRepository.QueryFirstOrDefaultAsync<Total>(queryDGDV + whereDGV,
                new { CurrentUserName = userGroupId, CurrentYear = currYear, MaDonVi = request.MaDV, LoaiThoiGian = request.LoaiThoiGian });
            sumDGDV = resDGDV.Count;
            if (sumDGDV > 0)
            {
                var item = new NhacViecDto
                {
                    DuongDan = "/dgcb/danh-gia-xep-loai-don-vi?TrangThai=Chờ đánh giá",
                    MauSac = "DanhGia",
                    MoTa = "Chờ đánh giá, xếp loại đơn vị",
                    Class = "warning",
                    Icon = "fas fa-user-shield",
                    GiaTri = sumDGDV.ToString(),
                    Ma = "LDDG_ChoDanhGiaDonVi"
                };
                lstData.Add(item);
            }
            //Khiếu nại
            string queryKN = $@"SELECT COUNT(hs.Id) Count FROM Business.KhieuNaiDanhGias as hs inner join Business.DanhGias as dg on hs.MaPhieu = dg.Id";
            string whereKN = $@" WHERE hs.DeletedOn IS NULL";
            whereKN += $@" and hs.TrangThai=N'Chờ xử lý'";
            whereKN += $@" and dg.NguoiDanhGiaId = @CurrentUserName";

            // Query for count and expect an integer result
            var resKN = await _dapperRepository.QueryFirstOrDefaultAsync<Total>(queryKN + whereKN,
                new { CurrentUserName = userGroupId, CurrentYear = currYear, MaDonVi = request.MaDV, LoaiThoiGian = request.LoaiThoiGian });
            sumKhieuNai = resKN.Count;
            if (sumKhieuNai > 0)
            {
                var item = new NhacViecDto
                {
                    DuongDan = "/dgcb/xu-ly-khieu-nai-kien-nghi?TrangThai=Chờ xử lý",
                    MauSac = "DanhGia",
                    MoTa = "Chờ xử lý khiếu nại, kiến nghị",
                    Class = "warning",
                    Icon = "fas fa-user-shield",
                    GiaTri = sumKhieuNai.ToString(),
                    Ma = "ChoXuLyKhieuNai"
                };
                lstData.Add(item);
            }
            //Gia hạn
            string queryGiaHan = $@"SELECT COUNT(ID) Count FROM Business.GiaHanDanhGias";
            string whereGiaHan= $@" WHERE DeletedOn IS NULL";
            whereGiaHan += $@" and TrangThai=N'Chờ xử lý'";
            whereGiaHan += $@" and MaDonViCha = @MaDonVi";


            // Query for count and expect an integer result
            var resGiaHan = await _dapperRepository.QueryFirstOrDefaultAsync<Total>(queryDGDV + whereDGV,
                new { CurrentUserName = userGroupId, CurrentYear = currYear, MaDonVi = request.MaDV, LoaiThoiGian = request.LoaiThoiGian });
            sumGiaHan = resGiaHan.Count;
            if (sumGiaHan > 0)
            {
                var item = new NhacViecDto
                {
                    DuongDan = "/dgcb/xu-ly-gia-han-danh-gia?TrangThai=Chờ xử lý",
                    MauSac = "DanhGia",
                    MoTa = "Chờ xử lý gia hạn",
                    Class = "warning",
                    Icon = "fas fa-user-shield",
                    GiaTri = sumGiaHan.ToString(),
                    Ma = "ChoXuLyGiaHan"
                };
                lstData.Add(item);
            }

        }
        catch (Exception ex)
        {
            return Result<List<NhacViecDto>>.Fail(ex.Message);
        }

        return Result<List<NhacViecDto>>.Success(lstData);
    }
}
public class BoTieuChuanNVDto
{
    public string? LoaiThoiGian { get; set; }
    public string? ThoiGian { get; set; }
    public string? MaBoTieuChi { get; set; }
}
public class GiaHanNVDto
{
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
}
public class UserQuyenDanhGiaDto
{
    public bool? KhongDanhGia { get;  set; }
}
