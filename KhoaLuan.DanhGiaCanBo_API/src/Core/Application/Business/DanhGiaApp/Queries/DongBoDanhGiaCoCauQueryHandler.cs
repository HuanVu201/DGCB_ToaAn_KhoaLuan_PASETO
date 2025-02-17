//using Newtonsoft.Json.Linq;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
//using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
//using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
//using TD.DanhGiaCanBo.Application.Common.Caching;
//using TD.DanhGiaCanBo.Application.Common.Persistence;
//using TD.DanhGiaCanBo.Domain.Business;
//using TD.DanhGiaCanBo.Domain.Constant;
//using static TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Queries.GetBuocXuLyQuery;
//using static TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos.ChiTietQuyTrinhXuLyDto;
//namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

//public class DongBoDanhGiaCoCauQueryWhereBuilder
//{

//    public static string Build(DongBoDanhGiaCoCauQuery req)
//    {
//        string where = string.Empty;
//        if (where.TrimStart().StartsWith("AND"))
//            where = where.TrimStart().Substring("AND".Length);
//        if (where != string.Empty)
//            return $" WHERE ({where})";
//        return where;
//    }

//}
//public class DongBoDanhGiaCoCauQueryHandler : IQueryHandler<DongBoDanhGiaCoCauQuery, DongBoDanhGiaCoCauDto>
//{
//    private readonly ICacheService _cacheService;
//    private readonly int _cacheTime = 2;
//    private readonly IDapperRepository _dapperRepository;
//    private readonly ICurrentUser _currentUser;
//    public DongBoDanhGiaCoCauQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
//    {
//        _dapperRepository = dapperRepository;
//        _currentUser = currentUser;
//    }

//    private class Total
//    {
//        public int Count { get; set; }
//    }

//    public async Task<Result<DongBoDanhGiaCoCauDto>> Handle(DongBoDanhGiaCoCauQuery request, CancellationToken cancellationToken)
//    {
//        var lstData = new DongBoDanhGiaCoCauDto();
//        try
//        {
//            string userGroupId = _currentUser.GetUserGroupId() ?? string.Empty;
//            int sumCN = 0; int sumTM = 0; var lstDanhGia = new List<DanhGia>();
//            int currYear = DateTime.Today.Year;
//            int currMonth = DateTime.Today.Month;
//            if (request.thoiGianQuery == 0)
//            {

//                if (currMonth < 10) request.thoiGianQuery = int.Parse($"{currYear}0{currMonth}");
//                else request.thoiGianQuery = int.Parse($"{currYear}{currMonth}");
//            }
//            else
//            {
//                var strTG = request.thoiGianQuery.ToString();
//                currYear = int.Parse(strTG.Substring(0, 4));
//                currMonth = int.Parse(strTG.Substring(4, 2));
//            }
//            var namDanhGiaCheck = request.thoiGianQuery.ToString().Substring(0, 4);
//            try
//            {
//                var lstUser = GetListCauHinh(client, urlRoot, id, top, idUser, thoiGianSuaTN, thoiGianTaoTN, thoiGianSuaDN, thoiGianTaoDN, maDonVi, includes, dongBoUser);
//                if (lstUser.Count > 0)
//                {
//                    //LstDanhGia
//                    Dapper_DanhGiaRepos DGRespo = new Dapper_DanhGiaRepos();
//                    result.error.code = 200;
//                    //Get
//                    //
//                    if (dongBoUser == "1")
//                    {
//                        if (idUser == 0)
//                        {
//                            var infoCacheUser = MemoryCacheHelper.GetValue(keyCacheLstUser);
//                            if (infoCacheUser != null)
//                            {
//                                lstDataUser = (List<UserList>)infoCacheUser;
//                            }
//                            else
//                                lstDataUser = DGRespo.GetAllUserList();
//                        }
//                    }
//                    if (idUser == 0)
//                    {
//                        var infoCache = MemoryCacheHelper.GetValue(keyCacheLstDanhGia);
//                        if (infoCache != null)
//                        {
//                            lstDanhGia = (List<DanhGia>)infoCache;
//                        }
//                        else
//                            lstDanhGia = DGRespo.GetDanhGiaTaiKhoan(thoiGianQuery);
//                    }


//                    for (var i = 0; i < lstUser.Count; i++)
//                    {
//                        var item = lstUser[i];
//                        try
//                        {

//                            var strNhom = item.TenNhomDoiTuongDanhGia;
//                            var taiKHoan = item.UserProfile.Account != null ? item.UserProfile.Account.Trim() : "";
//                            var maNguoiDung = item.Code.Trim();
//                            var tenTaiKhoan = item.UserProfile.FullName != null ? item.UserProfile.FullName.Trim() : "";
//                            var maDonViU = item.UserOffice.GroupCode != null ? item.UserOffice.GroupCode.Trim() : "";
//                            var tenDonVi = item.UserOffice.GroupName != null ? item.UserOffice.GroupName.Trim() : "";
//                            var tenPB = item.Group.GroupName != null ? item.Group.GroupName.Trim() : "";
//                            var maPB = item.Group.GroupCode != null ? item.Group.GroupCode.Trim() : "";
//                            var truongDV = item.TruongDonVi;
//                            var khongDG = item.KhongDanhGia;
//                            var chucVu = item.Position.Name != null ? item.Position.Name.Trim() : "";
//                            var soDT = item.UserProfile.Phone != null ? item.UserProfile.Phone.Trim() : "";
//                            var email = item.UserProfile.Email != null ? item.UserProfile.Email.Trim() : "";
//                            //
//                            var nguoiTaoU = item.Author.Name;
//                            var nguoiSuaU = item.Editor.Name;
//                            if (!string.IsNullOrEmpty(nguoiTaoU))
//                                nguoiTaoU = nguoiTaoU.Split('|')[2].Trim();
//                            if (!string.IsNullOrEmpty(nguoiSuaU))
//                                nguoiSuaU = nguoiSuaU.Split('|')[2].Trim();
//                            var itemDUser = new UserList();
//                            if (dongBoUser == "1")
//                            {
//                                if (!string.IsNullOrEmpty(item.Note))
//                                    itemDUser.Note = item.Note;
//                                itemDUser.IDList = item.ID;
//                                itemDUser.ProfileOrder = item.ProfileOrder;
//                                itemDUser.Code = maNguoiDung;
//                                itemDUser.Account = taiKHoan;
//                                itemDUser.Position = chucVu;
//                                itemDUser.CanBoQuanLyLoginName = item.CanBoQuanLyLoginName;
//                                itemDUser.CanBoQuanLyCode = item.CanBoQuanLyCode;
//                                itemDUser.CanBoQuanLyName = item.CanBoQuanLyName;
//                                if (item.TruongDonVi == 1)
//                                    itemDUser.TruongDonVi = true;
//                                else itemDUser.TruongDonVi = false;
//                                itemDUser.UserProfile_Email = email;
//                                itemDUser.UserProfile_Phone = soDT;
//                                itemDUser.UserProfile_FullName = item.UserProfile.FullName;
//                                if (!string.IsNullOrEmpty(item.UserProfile.Sex))
//                                {
//                                    if (item.UserProfile.Sex == "Nữ") itemDUser.UserProfile_Sex = false;
//                                    if (item.UserProfile.Sex == "Nam") itemDUser.UserProfile_Sex = true;
//                                }
//                                if (!string.IsNullOrEmpty(item.DonViTheoDoi)) itemDUser.DonViTheoDoi = item.DonViTheoDoi;
//                                if (!string.IsNullOrEmpty(item.DonViTheoDoiText)) itemDUser.DonViTheoDoiText = item.DonViTheoDoiText;
//                                if (item.UserProfile.Birthday.HasValue) itemDUser.UserProfile_Birthday = item.UserProfile.Birthday;
//                                if (khongDG)
//                                    itemDUser.KhongDanhGia = khongDG;
//                                else itemDUser.KhongDanhGia = false;
//                                if (item.BanTVTUQuanLy.HasValue)
//                                    itemDUser.BanTVTUQuanLy = item.BanTVTUQuanLy;
//                                else itemDUser.BanTVTUQuanLy = false;
//                                itemDUser.CreatedBy = nguoiTaoU;
//                                itemDUser.ModifiedBy = nguoiSuaU;
//                                itemDUser.Modified = item.Modified;
//                                itemDUser.Created = item.Created;
//                                itemDUser.UserOfficeCode = maDonViU;
//                                itemDUser.TenNhomDoiTuongDanhGia = strNhom;
//                                itemDUser.MaNhomDoiTuongDanhGia = item.MaNhomDoiTuongDanhGia;
//                                if (item.DaCoNhomDoiTuong.HasValue)
//                                {
//                                    if (item.DaCoNhomDoiTuong > 0)
//                                        itemDUser.DaCoNhomDoiTuong = true;
//                                    else itemDUser.DaCoNhomDoiTuong = false;
//                                }
//                                else itemDUser.DaCoNhomDoiTuong = false;
//                                itemDUser.UserOfficeName = tenDonVi;
//                                itemDUser.GroupCode = maPB;
//                                itemDUser.GroupName = tenPB;
//                                if (thaoTac == "Xoa")
//                                {
//                                    itemDUser.SuDung = false;
//                                    itemDUser.DeletedBy = user;
//                                    itemDUser.Deleted = DateTime.Now;
//                                }
//                                else
//                                {
//                                    itemDUser.SuDung = true;
//                                }
//                            }
//                            //CheckDaTTChua
//                            var itemUser = new DanhGia();
//                            itemUser.LoaiThoiGian = "Tháng";
//                            itemUser.ThoiGian = "Tháng " + currMonth;
//                            itemUser.NamDanhGia = currYear;
//                            itemUser.ThuTu = item.ProfileOrder;
//                            itemUser.ThoiGianQuery = thoiGianQuery;
//                            itemUser.HoVaTen = tenTaiKhoan;
//                            itemUser.MaNguoiDung = maNguoiDung;
//                            itemUser.TaiKhoan = taiKHoan;
//                            itemUser.ChucVu = chucVu;
//                            itemUser.TaiKhoanCanBoQuanLy = item.CanBoQuanLyLoginName;
//                            itemUser.MaCanBoQuanLy = item.CanBoQuanLyCode;
//                            itemUser.TenCanBoQuanLy = item.CanBoQuanLyName;
//                            itemUser.TruongDonVi = item.TruongDonVi;
//                            itemUser.Email = email;
//                            itemUser.Phone = soDT;
//                            itemUser.NguoiTaoUser = nguoiTaoU;
//                            itemUser.NguoiSuaUser = nguoiSuaU;
//                            itemUser.NgaySuaUser = item.Modified;
//                            itemUser.NgayTaoUser = item.Created;
//                            if (item.BanTVTUQuanLy.HasValue) itemUser.BanTVTUQuanLy = item.BanTVTUQuanLy;
//                            else itemUser.BanTVTUQuanLy = false;
//                            if (!string.IsNullOrEmpty(item.Note))
//                                itemUser.YKienLanhDao = item.Note;
//                            if (dongBoUser == "1")
//                            {
//                                if (idUser > 0)
//                                {
//                                    lstDataUser = DGRespo.GetItemUserList(idUser);
//                                }
//                            }
//                            if (idUser > 0)
//                            {

//                                lstDanhGia = DGRespo.GetDanhGiaTheoMa(maNguoiDung, thoiGianQuery, namDanhGiaCheck);
//                            }
//                            //Common.WriteLogError("GetListDanhGia_" + thoiGianQuery, JsonConvert.SerializeObject(lstDanhGia));
//                            var itemCheck = lstDanhGia.FirstOrDefault(x => x.MaNguoiDung == maNguoiDung);
//                            if (itemCheck != null)
//                            {
//                                if (itemCheck.TrangThai != "Đã đánh giá")
//                                {
//                                    if (khongDG)
//                                        itemCheck.KhongDanhGia = khongDG;
//                                    else itemCheck.KhongDanhGia = false;
//                                    if (khongDG)
//                                        itemUser.KhongDanhGia = khongDG;
//                                    else itemUser.KhongDanhGia = false;
//                                }
//                                if (!string.IsNullOrEmpty(capNhatTT))
//                                {
//                                    if (capNhatTT == "ThuTu")
//                                    {
//                                        DGRespo.CapNhatThuTu(itemCheck, itemUser);
//                                        id = item.ID;
//                                        sumCN = sumCN + 1;
//                                    }
//                                    else if (capNhatTT == "KhongDanhGia")
//                                    {
//                                        DGRespo.CapNhatKhongDanhGia(itemCheck, itemUser);
//                                        id = item.ID;
//                                        sumCN = sumCN + 1;
//                                    }

//                                }
//                                else
//                                {

//                                    //Update Note

//                                    var maCBNXDG = itemCheck.MaCanBoQuanLy;
//                                    var maCBCauHinh = item.CanBoQuanLyCode;
//                                    if (maCBNXDG != maCBCauHinh)
//                                    {
//                                        if (!string.IsNullOrEmpty(maCBNXDG))
//                                        {
//                                            if (itemCheck.TrangThai == "Chờ nhận xét")
//                                            {
//                                                if (string.IsNullOrEmpty(maCBCauHinh)) itemUser.TrangThai = "Chờ đánh giá";
//                                            }
//                                        }
//                                        else
//                                        {
//                                            if (itemCheck.TrangThai == "Chờ đánh giá")
//                                            {
//                                                if (!string.IsNullOrEmpty(maCBCauHinh) && string.IsNullOrEmpty(maCBNXDG)) itemUser.TrangThai = "Chờ nhận xét";
//                                            }
//                                        }
//                                    }
//                                    var maDVCu = itemCheck.MaDonVi; var maPBCu = itemCheck.MaPhongBan;
//                                    if (maDVCu != maDonViU || maPBCu != maPB)
//                                    {
//                                        if (itemCheck.TrangThai == "Chưa đánh giá")
//                                        {

//                                            DGRespo.Delete(itemCheck.ID);
//                                            lstDanhGia.Remove(itemCheck);
//                                            //AddMoiDVMoi
//                                            itemUser.MaDonVi = maDonViU;
//                                            itemUser.MaDonViCha = DGRespo.GetMaCha(itemUser.MaDonVi);
//                                            itemUser.TenDonVi = tenDonVi;
//                                            itemUser.MaPhongBan = maPB;
//                                            itemUser.TenPhongBan = tenPB;
//                                            if (khongDG)
//                                                itemUser.KhongDanhGia = khongDG;
//                                            else itemUser.KhongDanhGia = false;

//                                            if (!string.IsNullOrEmpty(itemUser.MaDonVi) && !string.IsNullOrEmpty(itemUser.MaPhongBan))
//                                            {
//                                                try
//                                                {
//                                                    if (khongDG) { }
//                                                    else
//                                                    {
//                                                        if (!string.IsNullOrEmpty(strNhom) && strNhom.Contains("BoTieuChuan") && strNhom.Contains("DoiTuongDanhGia"))
//                                                        {
//                                                            var lstItemNhom = JsonConvert.DeserializeObject<List<DataNhomDoiTuong>>(strNhom);
//                                                            if (lstItemNhom.Count > 0)
//                                                            {
//                                                                if (lstItemNhom[0].DoiTuongDanhGia != null)
//                                                                {
//                                                                    itemUser.TenNhomDoiTuong = lstItemNhom[0].DoiTuongDanhGia.TenDTDG.Trim();
//                                                                    itemUser.MaNhomDoiTuong = lstItemNhom[0].DoiTuongDanhGia.MaDTDG.Trim();
//                                                                }
//                                                                itemUser.BoTieuChuanID = lstItemNhom[0].BoTieuChuan.ID;

//                                                            }
//                                                        }
//                                                    }
//                                                    itemUser.SuDung = true;
//                                                    itemUser.TrangThai = "Chưa đánh giá";

//                                                    var itemDGAdd = DGRespo.Add(itemUser);
//                                                    lstDanhGia.Add(itemDGAdd);
//                                                    sumTM = sumTM + 1;
//                                                    id = item.ID;
//                                                }
//                                                catch (Exception ex)
//                                                {
//                                                    var strAddUser = JsonConvert.SerializeObject(itemUser);
//                                                    Common.WriteLogError("DongBoDanhGiaTheoCCTC_AddDanhGia", idUser + "##" + strAddUser + "##" + ex.ToString());

//                                                }



//                                            }
//                                        }
//                                        else
//                                        {
//                                            //ChuyenPhieu
//                                            if (!string.IsNullOrEmpty(thaoTac))
//                                            {
//                                                if (thaoTac == "ChuyenDonVi")
//                                                {

//                                                    //Update SuDung= 0
//                                                    //DGRespo.XoaDanhGiaCoCau(itemCheck.ID);
//                                                    lstDanhGia.Remove(itemCheck);
//                                                    //AddMoiDVMoi
//                                                    itemUser.MaDonVi = maDonViU;
//                                                    itemUser.MaDonViCha = DGRespo.GetMaCha(itemUser.MaDonVi);
//                                                    itemUser.TenDonVi = tenDonVi;
//                                                    itemUser.MaPhongBan = maPB;
//                                                    itemUser.TenPhongBan = tenPB;
//                                                    if (khongDG)
//                                                        itemUser.KhongDanhGia = khongDG;
//                                                    else itemUser.KhongDanhGia = false;
//                                                    if (itemCheck.TrangThai != "Đã đánh giá")
//                                                    {
//                                                        if (!string.IsNullOrEmpty(itemUser.MaDonVi) && !string.IsNullOrEmpty(itemUser.MaPhongBan))
//                                                        {
//                                                            if (khongDG) { }
//                                                            else
//                                                            {
//                                                                if (!string.IsNullOrEmpty(strNhom) && strNhom.Contains("BoTieuChuan") && strNhom.Contains("DoiTuongDanhGia"))
//                                                                {
//                                                                    var lstItemNhom = JsonConvert.DeserializeObject<List<DataNhomDoiTuong>>(strNhom);
//                                                                    if (lstItemNhom.Count > 0)
//                                                                    {
//                                                                        if (lstItemNhom[0].DoiTuongDanhGia != null)
//                                                                        {
//                                                                            itemUser.TenNhomDoiTuong = lstItemNhom[0].DoiTuongDanhGia.TenDTDG.Trim();
//                                                                            itemUser.MaNhomDoiTuong = lstItemNhom[0].DoiTuongDanhGia.MaDTDG.Trim();
//                                                                        }
//                                                                        itemUser.BoTieuChuanID = lstItemNhom[0].BoTieuChuan.ID;

//                                                                    }
//                                                                }
//                                                            }
//                                                        }
//                                                        DGCBDbContext dbContext = new DGCBDbContext();
//                                                        Dapper_DanhGiaRepos danhGiaR = new Dapper_DanhGiaRepos();
//                                                        danhGiaR.UpdateDongBo(itemCheck.ID, itemUser, itemCheck.NamDanhGia.ToString());
//                                                        id = item.ID;
//                                                        sumCN = sumCN + 1;
//                                                        lstDanhGia.Add(itemUser);
//                                                        //itemUser.SuDung = true;
//                                                        //itemUser.TrangThai = "Chưa đánh giá";
//                                                        //var itemDGAdd = DGRespo.Add(itemUser);
//                                                        //var strAddUser = JsonConvert.SerializeObject(itemUser);
//                                                        //Common.WriteLogError("DongBoDanhGiaTheoCCTC", idUser + "##" + strAddUser, "AddDanhGia");
//                                                        //lstDanhGia.Add(itemDGAdd);
//                                                        //sumTM = sumTM + 1;
//                                                        //id = item.ID;
//                                                    }
//                                                    //}
//                                                }
//                                            }
//                                            else
//                                            {
//                                                DGCBDbContext dbContext = new DGCBDbContext();
//                                                Dapper_DanhGiaRepos danhGiaR = new Dapper_DanhGiaRepos();
//                                                try
//                                                {
//                                                    danhGiaR.UpdateDongBo(itemCheck.ID, itemUser, itemCheck.NamDanhGia.ToString());
//                                                    id = item.ID;
//                                                    sumCN = sumCN + 1;
//                                                }
//                                                catch (Exception ex)
//                                                {
//                                                    Common.WriteLogError("DongBoDanhGiaTheoCCTC_UpdateDongBo", idUser + "##" + ex.ToString());

//                                                }

//                                            }

//                                        }
//                                    }
//                                    else
//                                    {
//                                        //XoaTaiKhoan
//                                        if (itemCheck.TrangThai == "Chưa đánh giá")
//                                        {
//                                            if (!string.IsNullOrEmpty(thaoTac))
//                                            {
//                                                if (thaoTac == "Xoa")
//                                                {
//                                                    DGRespo.XoaDanhGiaCoCau(itemCheck.ID, itemCheck.NamDanhGia.ToString());
//                                                    lstDanhGia.Remove(itemCheck);
//                                                }
//                                            }
//                                            else
//                                            {
//                                                if (!string.IsNullOrEmpty(strNhom) && strNhom.Contains("BoTieuChuan") && strNhom.Contains("DoiTuongDanhGia"))
//                                                {
//                                                    var lstItemNhom = JsonConvert.DeserializeObject<List<DataNhomDoiTuong>>(strNhom);
//                                                    if (lstItemNhom.Count > 0)
//                                                    {
//                                                        if (lstItemNhom[0].DoiTuongDanhGia != null)
//                                                        {
//                                                            itemUser.TenNhomDoiTuong = lstItemNhom[0].DoiTuongDanhGia.TenDTDG.Trim();
//                                                            itemUser.MaNhomDoiTuong = lstItemNhom[0].DoiTuongDanhGia.MaDTDG.Trim();
//                                                        }
//                                                        itemUser.BoTieuChuanID = lstItemNhom[0].BoTieuChuan.ID;

//                                                    }
//                                                }
//                                            }

//                                        }
//                                        if (string.IsNullOrEmpty(thaoTac))
//                                        {
//                                            DGCBDbContext dbContext = new DGCBDbContext();
//                                            Dapper_DanhGiaRepos danhGiaR = new Dapper_DanhGiaRepos();
//                                            danhGiaR.UpdateDongBo(itemCheck.ID, itemUser, itemCheck.NamDanhGia.ToString());
//                                            id = item.ID;
//                                            sumCN = sumCN + 1;
//                                        }
//                                        else
//                                        {
//                                            //XoaPhieuDaDanhGia
//                                            if (itemCheck.TrangThai != "Chưa đánh giá")
//                                            {
//                                                if (thaoTac == "Xoa")
//                                                {
//                                                    DGRespo.XoaDanhGiaCoCau(itemCheck.ID, itemCheck.NamDanhGia.ToString());
//                                                    lstDanhGia.Remove(itemCheck);
//                                                }
//                                            }
//                                        }

//                                    }
//                                }
//                                //CapNhatUser
//                                if (dongBoUser == "1")
//                                {
//                                    var itemCheckUser = lstDataUser.FirstOrDefault(x => x.IDList == idUser);
//                                    if (itemCheckUser != null)
//                                    {
//                                        DGCBDbContext dbContext = new DGCBDbContext();
//                                        UserListRespository danhGiaR = new UserListRespository(dbContext);
//                                        danhGiaR.Update(itemCheckUser.IDList, itemDUser);

//                                    }
//                                    else
//                                    {
//                                        Dapper_UserListRepos userL = new Dapper_UserListRepos();
//                                        var itemDGAdd = userL.Add(itemDUser);
//                                        var strAddUser = JsonConvert.SerializeObject(itemUser);
//                                        lstDataUser.Add(itemDGAdd);

//                                        //TaoMoi
//                                    }

//                                }
//                            }
//                            else
//                            {
//                                //CapNhatUser
//                                if (dongBoUser == "1")
//                                {
//                                    var itemCheckUser = lstDataUser.FirstOrDefault(x => x.IDList == idUser);
//                                    if (itemCheckUser != null)
//                                    {
//                                        DGCBDbContext dbContext = new DGCBDbContext();
//                                        UserListRespository danhGiaR = new UserListRespository(dbContext);
//                                        danhGiaR.Update(itemCheckUser.IDList, itemDUser);

//                                    }
//                                    else
//                                    {
//                                        Dapper_UserListRepos userL = new Dapper_UserListRepos();
//                                        var itemDGAdd = userL.Add(itemDUser);
//                                        var strAddUser = JsonConvert.SerializeObject(itemUser);
//                                        lstDataUser.Add(itemDGAdd);

//                                        //TaoMoi
//                                    }

//                                }
//                                if (string.IsNullOrEmpty(capNhatTT))
//                                {
//                                    if (khongDG)
//                                        itemUser.KhongDanhGia = khongDG;
//                                    else itemUser.KhongDanhGia = false;
//                                    itemUser.MaDonVi = maDonViU;
//                                    itemUser.MaDonViCha = DGRespo.GetMaCha(itemUser.MaDonVi);
//                                    itemUser.TenDonVi = tenDonVi;
//                                    itemUser.MaPhongBan = maPB;
//                                    itemUser.TenPhongBan = tenPB;
//                                    if (khongDG)
//                                        itemUser.KhongDanhGia = khongDG;
//                                    else itemUser.KhongDanhGia = false;
//                                    if (!string.IsNullOrEmpty(itemUser.MaDonVi) && !string.IsNullOrEmpty(itemUser.MaPhongBan))
//                                    {
//                                        try
//                                        {
//                                            if (khongDG) { }
//                                            else
//                                            {
//                                                if (!string.IsNullOrEmpty(strNhom) && strNhom.Contains("BoTieuChuan") && strNhom.Contains("DoiTuongDanhGia"))
//                                                {
//                                                    var lstItemNhom = JsonConvert.DeserializeObject<List<DataNhomDoiTuong>>(strNhom);
//                                                    if (lstItemNhom.Count > 0)
//                                                    {
//                                                        if (lstItemNhom[0].DoiTuongDanhGia != null)
//                                                        {
//                                                            itemUser.TenNhomDoiTuong = lstItemNhom[0].DoiTuongDanhGia.TenDTDG.Trim();
//                                                            itemUser.MaNhomDoiTuong = lstItemNhom[0].DoiTuongDanhGia.MaDTDG.Trim();
//                                                        }
//                                                        itemUser.BoTieuChuanID = lstItemNhom[0].BoTieuChuan.ID;

//                                                    }
//                                                }
//                                            }
//                                            itemUser.SuDung = true;
//                                            itemUser.TrangThai = "Chưa đánh giá";
//                                            var itemDGAdd = DGRespo.Add(itemUser);
//                                            lstDanhGia.Add(itemDGAdd);
//                                            sumTM = sumTM + 1;
//                                            id = item.ID;
//                                        }
//                                        catch (Exception ex)
//                                        {
//                                            var strAddUser = JsonConvert.SerializeObject(itemUser);
//                                            Common.WriteLogError("DongBoDanhGiaTheoCCTC_AddDanhGia", idUser + "##" + strAddUser + "##" + ex.ToString());
//                                        }

//                                    }

//                                }

//                                //TaoMoi
//                            }
//                            if (i == lstUser.Count - 1)
//                            {
//                                id = item.ID;
//                            }

//                        }
//                        catch (Exception ex)
//                        {
//                            Common.WriteLogError("DongBoDanhGiaCoCau", token + "##" + item.ID + "##" + ex.ToString());
//                            MemoryCacheHelper.Delete(keyCacheLstDanhGia);
//                        }
//                    }
//                    if (dongBoUser == "1")
//                    {
//                        if (idUser == 0) MemoryCacheHelper.Add(keyCacheLstUser, lstDataUser, DateTimeOffset.Now.AddHours(1));
//                    }
//                    if (idUser == 0) MemoryCacheHelper.Add(keyCacheLstDanhGia, lstDanhGia, DateTimeOffset.Now.AddHours(1));
//                    var outP = new OutPutDongBo();
//                    outP.ID = id;
//                    outP.SoLieuCapNhat = sumCN;
//                    outP.SoLieuThemMoi = sumTM;
//                    result.data = outP;
//                }
//                else
//                {
//                    Common.WriteLogError("DongBoDanhGiaCoCau", token + "##" + id + "##" + idUser + "##Khong get ra duoc list user");
//                }

//            }
//            catch (Exception ex)
//            {
//                result.error.code = 500;
//                result.error.internalMessage = token + "##" + ex.ToString();
//                Common.WriteLogError("DongBoDanhGiaCoCau", token + "##" + id + "##" + idUser + ex.ToString());
//                MemoryCacheHelper.Delete(keyCacheLstDanhGia);


//            }




//            // DanhGia
//            //string queryDG = $@"SELECT COUNT(ID) FROM {TableNames.DanhGias}";
//            //string whereDG = $@" WHERE SuDung = 1 AND DeletedOn IS NULL and KhongDanhGia!=1 and TrangThai!=N'Chưa đánh giá' AND ThoiGianDanhGia is null";
//            //whereDG += $@" AND NguoiDangXuLyId =  @CurrentUserName";
//            //whereDG += $" AND ((MaDonVi = @MaDonVi) or (MaDonViCha = @MaDonVi))";
//            //whereDG += $@"  AND LoaiThoiGian =  @LoaiThoiGian";
//            //whereDG += $@" and TrangThai=N'Chờ đánh giá'";
//            //whereDG += $@" and NamDanhGia = @CurrentYear";

//            //// Query for count and expect an integer result
//            //var resDG = await _dapperRepository.QueryFirstOrDefaultAsync<Total>(queryDG + whereDG,
//            //    new { CurrentUserName = userGroupId, CurrentYear = currYear, MaDonVi = request.MaDV, LoaiThoiGian = request.LoaiThoiGian });
//            //sumLDDG = resDG.Count;

//        }
//        catch (Exception ex)
//        {
//            return Result<DongBoDanhGiaCoCauDto>.Fail(ex.Message);
//        }

//        return Result<DongBoDanhGiaCoCauDto>.Success(lstData);
//    }
//}
