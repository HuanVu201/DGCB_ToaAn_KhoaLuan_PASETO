using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;
namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class ThongKeTimerJob2QueryWhereBuilder
{

    public static string Build(ThongKeTimerJob2Query req)
    {
        string where = string.Empty;
      
        return where;
    }

}
public class ThongKeTimerJob2QueryHandler : IQueryHandler<ThongKeTimerJob2Query, List<DataDGAutoThongKe>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly IRepository<DuLieuThongKe> _duLieuThongKerepository;
    public ThongKeTimerJob2QueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser, IRepository<DuLieuThongKe> duLieuThongKerepository)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _duLieuThongKerepository = duLieuThongKerepository;
    }

    private string GetThoiGianDanhGiaByThoiGianQuery(int thoiGianQuery)
    {
        string rel = string.Empty;
        try
        {
            string s = thoiGianQuery.ToString();
            string thang = s.Substring(4);

            if (s.Length == 6)
            {
                if (thang.StartsWith("0"))
                    rel = "Tháng " + thang.Replace("0", "");
                else
                    rel = "Tháng " + thang;

            }
            else if (s.Length == 7)
            {
                var intThang = int.Parse(thang);
                if (intThang == 1) rel = "Quý I";
                if (intThang == 2) rel = "Quý II";
                if (intThang == 3) rel = "Quý III";
                if (intThang == 4) rel = "Quý IV";
            }
            else if (s.Length == 8)
            {
                var intThang = int.Parse(thang);
                if (intThang == 1) rel = "6 tháng đầu năm";
                if (intThang == 2) rel = "6 tháng cuối năm";
            }


        }
        catch
        {
            return "Error";
        }
        return rel;
    }
    private int GetNamDanhGiaByThoiGianQuery(int thoiGianQuery)
    {
        try
        {
            string s = thoiGianQuery.ToString();
            string nam = s.Substring(0, 4);
            return int.Parse(nam);
        }
        catch { return 0; }
    }
    private string GetLoaiThoiGian(int thoiGianQuery)
    {
        string rel = string.Empty;
        try
        {
            if (thoiGianQuery.ToString().Length == 6) rel = "Tháng";
            else if (thoiGianQuery.ToString().Length == 7) rel = "Quý";
            else if (thoiGianQuery.ToString().Length == 8) rel = "6 tháng";
            else rel = "Năm";


        }
        catch { }
        return rel;
    }
    private async Task<List<Domain.Catalog.Group>> GetGroupChild2(string? groupCode, string? type, bool? includeChild, bool? includeAll)
    {
        string query = $@"SELECT * FROM {TableNames.Groups}";
        string where = $@" WHERE Active = 1 AND DeletedOn IS NULL";
        string _grpCodeChild = string.Empty;
        string _grpCodeBegin = string.Empty;
            _grpCodeChild = groupCode;
        if (type == "nhom")
            where += $" and GroupCode = '{groupCode}'";
        else if (type == "don-vi")
        {
            if (includeAll.HasValue && includeAll.Value == true)
            {
                where += $" and FullCode like '%{_grpCodeChild}%'";
            }                  
            else if (includeChild.HasValue && includeChild.Value == true)
            {
                where += $" and FullCode like '%{_grpCodeChild}%'";
            }
            else
                where += $" and GroupCode = '{groupCode}'";
        }
        var res = await _dapperRepository.QueryAsync<Domain.Catalog.Group>(query + where);
        return (List<Domain.Catalog.Group>)res;
    }
    private async Task<string> GetGrpCodeChild(string groupCode)
    {

        string _grpCodeChild = string.Empty;
        string _grpCodeBegin = string.Empty;

        if (groupCode.StartsWith("000.00.00"))
        {
            _grpCodeChild = groupCode.Replace("000.00.00", "");
            _grpCodeBegin = "000.00.";
        }
        else if (groupCode.StartsWith("000.00"))
        {
            _grpCodeChild = groupCode.Replace("000.00", "");
            _grpCodeBegin = "000.";
        }
        else if (groupCode.StartsWith("000"))
            _grpCodeChild = groupCode.Replace("000", "");
        else
            _grpCodeChild = groupCode;
        return _grpCodeChild;
    }


    public async Task<Result<List<DataDGAutoThongKe>>> Handle(ThongKeTimerJob2Query request, CancellationToken cancellationToken)
    {
        var lstData = new List<DataDGAutoThongKe>();
        try
        {
            var lstGrp = await GetGroupChild2(request.MaDonVi, request.Type, request.IncludeChild, request.IncludeAll);
            string _grpCodeChild = request.MaDonVi;
            #region Get User
            string queryUser = $@"Select u.UserName as TaiKhoan,ug.GroupCode as MaPhongBan,ug.OfficeCode as MaDonVi,ug.KhongDanhGia,g.FullCode from [Identity].users u 
  left join [Identity].[ApplicationUserGroups] ug on u.id = ug.UserId
  inner join [Catalog].[Groups] g on ug.OfficeCode = g.GroupCode";
            string whereUser = $" WHERE  ug.Id IS NOT NULL and ug.OfficeCode IS NOT NULL and ug.DeletedOn is null";
            if (request.Type == "nhom")
                whereUser += $" and ug.GroupCode = '{request.MaDonVi}'";
            else if (request.Type == "don-vi")
                whereUser += $" and g.FullCode like '%{_grpCodeChild}%'";
            //whereUser += $" and ug.OfficeCode like '{_grpCodeChild}%'";
            #endregion
            var dataDUser = await _dapperRepository.QueryAsync<DataUserThongKe>(queryUser + whereUser);
            #region Get Đánh giá
            string queryDG = "SELECT TaiKhoan,TrangThai,PhanLoaiDanhGia,MaDonVi,MaPhongBan,KhongDanhGia,YKienLanhDao,MaDonViFull FROM [Business].[DanhGias]";
            string whereDG = $" WHERE DeletedOn IS NULL and SuDung=1 and ThoiGianQuery={request.ThoiGianQuery}";
            if (request.Type == "nhom")
                whereDG += $" and MaPhongBan = '{request.MaDonVi}'";
            else if (request.Type == "don-vi")
                whereDG += $" and MaDonViFull like '%{_grpCodeChild}%'";
            //whereDG += $" and MaDonVi like '{_grpCodeChild}%'";
            var dataDanhGia = await _dapperRepository.QueryAsync<DataDGAutoThongKe>(queryDG + whereDG);
            #endregion

            #region Get Dữ liệu thống kê theo thoiGianQuery
            string queryDLTK = "SELECT top 10000 * FROM  [Business].DuLieuThongKes";
            string whereDLTK = $" WHERE DeletedOn IS NULL and ThoiGianQuery={request.ThoiGianQuery}";

            if (request.IncludeChild.HasValue && request.IncludeChild.Value)
                 whereDLTK += $" and FullMa like '%{_grpCodeChild}%'";
                //whereDLTK += $" and MaDonVi like '{_grpCodeChild}%'";
            else
                whereDLTK += $" and MaDonVi = '{request.MaDonVi}'";
            var thongKeLstAll = await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
            #endregion
            #region Thêm mới hoặc cập nhật 
            if (lstGrp.Count > 0)
            {
                foreach (var grp in lstGrp)
                {
                   
                    var grpCodeChild = await GetGrpCodeChild(grp.GroupCode);
                    var thongKeCurr = new DuLieuThongKe();
                    thongKeCurr = thongKeLstAll.FirstOrDefault(x => x.MaDonVi == grp.GroupCode);
                    var danhGiaCurr = new List<DataDGAutoThongKe>();
                    var userCurr = new List<DataUserThongKe>();
                    if (grp.Type == "don-vi") danhGiaCurr = dataDanhGia.Where(x => x.MaDonViFull.Contains(grpCodeChild)).ToList();
                    else if (grp.Type == "nhom") danhGiaCurr = dataDanhGia.Where(x => x.MaPhongBan == grp.GroupCode).ToList();
                    if (grp.Type == "don-vi") userCurr = dataDUser.Where(x => x.FullCode.Contains(grpCodeChild)).ToList();
                    else if (grp.Type == "nhom") userCurr = dataDUser.Where(x => x.MaPhongBan == grp.GroupCode).ToList();
                    if (thongKeCurr == null)
                    {
                        thongKeCurr = new DuLieuThongKe()
                        {
                            LoaiThoiGian = GetLoaiThoiGian(request.ThoiGianQuery.Value),
                            LoaiThongKe = grp.Type,
                            NamDanhGia = GetNamDanhGiaByThoiGianQuery(request.ThoiGianQuery.Value),
                            ThoiGian = GetThoiGianDanhGiaByThoiGianQuery(request.ThoiGianQuery.Value),
                            TenDonVi = grp.GroupName,
                            MaDonVi = grp.GroupCode,
                            MaDonViCha = grp.OfGroupCode,
                            FullMa = grp.FullCode,
                            ThoiGianTao = DateTime.Now,
                            ThoiGianQuery = request.ThoiGianQuery,
                            TongSoCanBo = userCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue)).Count(),
                            TongSoKhongDanhGia = userCurr.Where(x => x.KhongDanhGia.HasValue && x.KhongDanhGia.Value && !x.TaiKhoan.StartsWith("admin")).Count(),
                            TongSoTuDanhGia = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai != "Chưa đánh giá").Count(),
                            TongSoDaXepLoai = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai == "Đã đánh giá").Count(),
                            DanhGiaLoaiA = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai == "Đã đánh giá" && x.PhanLoaiDanhGia == "Loại A - Hoàn thành xuất sắc nhiệm vụ").Count(),
                            DanhGiaLoaiB = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai == "Đã đánh giá" && x.PhanLoaiDanhGia == "Loại B - Hoàn thành tốt nhiệm vụ").Count(),
                            DanhGiaLoaiC = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai == "Đã đánh giá" && x.PhanLoaiDanhGia == "Loại C - Hoàn thành nhiệm vụ").Count(),
                            DanhGiaLoaiD = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai == "Đã đánh giá" && x.PhanLoaiDanhGia == "Loại D - Không hoàn thành nhiệm vụ").Count(),
                        };
                        if (!string.IsNullOrEmpty(thongKeCurr.LoaiThoiGian))
                        {
                            if (thongKeCurr.LoaiThongKe == "nhom") thongKeCurr.LoaiThongKe = "Nhóm";
                            else thongKeCurr.LoaiThongKe = "Đơn vị";
                            //                     Create(string loaiThongKe, string tenDonVi, string maDonVi, string loaiThoiGian, string thoiGian, int namDanhGia, DateTime ? thoiGianTao, int danhGiaLoaiA,
                            //int danhGiaLoaiB, int danhGiaLoaiC, int danhGiaLoaiD, int tongSoCanBo, int tongSoKhongDanhGia, int tongSoTuDanhGia, int tongSoDaXepLoai, int tongSoCongViec, int congViecChuaHoanThanh, int congViecDangXuLy, int congViecDaHoanThanh,
                            //int khenThuongDeXuat, int khenThuong, int thoiGianQuery, string category)
                            var input = DuLieuThongKe.Create(thongKeCurr.LoaiThongKe,
                                                             thongKeCurr.TenDonVi,
                                                             thongKeCurr.MaDonVi,
                                                             thongKeCurr.LoaiThoiGian,
                                                             thongKeCurr.ThoiGian,
                                                             thongKeCurr.NamDanhGia,
                                                             thongKeCurr.ThoiGianTao,
                                                             thongKeCurr.DanhGiaLoaiA,
                                                             thongKeCurr.DanhGiaLoaiB,
                                                             thongKeCurr.DanhGiaLoaiC,
                                                             thongKeCurr.DanhGiaLoaiD,
                                                             thongKeCurr.TongSoCanBo,
                                                             thongKeCurr.TongSoKhongDanhGia,
                                                             thongKeCurr.TongSoTuDanhGia,
                                                             thongKeCurr.TongSoDaXepLoai,
                                                             thongKeCurr.TongSoCongViec,
                                                             thongKeCurr.CongViecChuaHoanThanh,
                                                             thongKeCurr.CongViecDangXuLy,
                                                             thongKeCurr.CongViecDaHoanThanh,
                                                             thongKeCurr.KhenThuongDeXuat,
                                                             thongKeCurr.KhenThuong,
                                                             thongKeCurr.ThoiGianQuery,
                                                             thongKeCurr.Category, thongKeCurr.MaDonViCha, thongKeCurr.FullMa);
                            try
                            {
                                _duLieuThongKerepository.AddAsync(input);

                            }
                            catch (Exception ex)
                            {
                             
                            }
                         
                            //thongKeLstAll.Add(thongKeCurr); //Thêm vào danh sách thống kê đã lấy về
                        }
                        //if (thongKeCurr.TongSoCanBo > 0)
                        //{

                        //}
                    }
                    else
                    {
                        thongKeCurr.LoaiThoiGian = GetLoaiThoiGian(request.ThoiGianQuery.Value);
                        if (!string.IsNullOrEmpty(thongKeCurr.LoaiThoiGian))
                        {
                            thongKeCurr.TenDonVi = grp.GroupName;
                            thongKeCurr.LoaiThongKe = grp.Type;
                            if (thongKeCurr.LoaiThongKe == "nhom") thongKeCurr.LoaiThongKe = "Nhóm";
                            else thongKeCurr.LoaiThongKe = "Đơn vị";
                            thongKeCurr.TongSoCanBo = userCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue)).Count();
                            thongKeCurr.TongSoKhongDanhGia = userCurr.Where(x => x.KhongDanhGia.HasValue && x.KhongDanhGia.Value && !x.TaiKhoan.StartsWith("admin")).Count();
                            thongKeCurr.TongSoTuDanhGia = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai != "Chưa đánh giá").Count();
                            thongKeCurr.TongSoDaXepLoai = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai == "Đã đánh giá").Count();
                            thongKeCurr.DanhGiaLoaiA = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai == "Đã đánh giá" && x.PhanLoaiDanhGia == "Loại A - Hoàn thành xuất sắc nhiệm vụ").Count();
                            thongKeCurr.DanhGiaLoaiB = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai == "Đã đánh giá" && x.PhanLoaiDanhGia == "Loại B - Hoàn thành tốt nhiệm vụ").Count();
                            thongKeCurr.DanhGiaLoaiC = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai == "Đã đánh giá" && x.PhanLoaiDanhGia == "Loại C - Hoàn thành nhiệm vụ").Count();
                            thongKeCurr.DanhGiaLoaiD = danhGiaCurr.Where(x => ((x.KhongDanhGia.HasValue && !x.KhongDanhGia.Value) || !x.KhongDanhGia.HasValue) && x.TrangThai == "Đã đánh giá" && x.PhanLoaiDanhGia == "Loại D - Không hoàn thành nhiệm vụ").Count();
                            //if (thongKeCurr.TongSoCanBo > 0)
                            try
                            {
                                var itemExitst = await _duLieuThongKerepository.GetByIdAsync(thongKeCurr.Id, cancellationToken);
                                if (itemExitst != null)
                                {
                                    var updatedChiTietDanhGiaDonVi = itemExitst.Update(thongKeCurr.LoaiThongKe,
                                                                 thongKeCurr.TenDonVi,
                                                                 thongKeCurr.MaDonVi,
                                                                 thongKeCurr.LoaiThoiGian,
                                                                 thongKeCurr.ThoiGian,
                                                                 thongKeCurr.NamDanhGia,
                                                                 thongKeCurr.ThoiGianTao,
                                                                 thongKeCurr.DanhGiaLoaiA,
                                                                 thongKeCurr.DanhGiaLoaiB,
                                                                 thongKeCurr.DanhGiaLoaiC,
                                                                 thongKeCurr.DanhGiaLoaiD,
                                                                 thongKeCurr.TongSoCanBo,
                                                                 thongKeCurr.TongSoKhongDanhGia,
                                                                 thongKeCurr.TongSoTuDanhGia,
                                                                 thongKeCurr.TongSoDaXepLoai,
                                                                 thongKeCurr.TongSoCongViec,
                                                                 thongKeCurr.CongViecChuaHoanThanh,
                                                                 thongKeCurr.CongViecDangXuLy,
                                                                 thongKeCurr.CongViecDaHoanThanh,
                                                                 thongKeCurr.KhenThuongDeXuat,
                                                                 thongKeCurr.KhenThuong,
                                                                 thongKeCurr.ThoiGianQuery,
                                                                 thongKeCurr.Category, thongKeCurr.MaDonViCha, thongKeCurr.FullMa);

                                    await _duLieuThongKerepository.UpdateAsync(updatedChiTietDanhGiaDonVi, cancellationToken);
                                }
                            }
                            catch (Exception ex)
                            {

                            }
                            //Update(thongKeCurr);
                        }

                    }
                    //if (request.ReturnRes.HasValue && request.ReturnRes.Value)
                    //    //lstData.Add(thongKeCurr);
                    //else if (((request.ReturnRes.HasValue && request.ReturnRes.Value) || (request.ReturnRes.HasValue && request.ReturnRes.Value)) && thongKeCurr.MaDonVi == request.MaDonVi)
                    //    lstData.Add(thongKeCurr);
                }
            }


            #endregion


        }
        catch (Exception ex)
        {
            return Result<List<DataDGAutoThongKe>>.Fail(ex.Message);
        }
        return Result<List<DataDGAutoThongKe>>.Success(lstData);

    }
}
