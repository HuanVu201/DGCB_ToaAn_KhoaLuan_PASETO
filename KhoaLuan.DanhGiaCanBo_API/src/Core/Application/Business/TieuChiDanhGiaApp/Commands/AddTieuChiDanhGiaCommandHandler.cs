using Newtonsoft.Json;
using System.Text.RegularExpressions;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Commands;
public class GetTieuChiByIdSpec : Specification<TieuChiDanhGia>, ISingleResultSpecification
{
    public GetTieuChiByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);

    }
}
public class GetTieuChiByMaSpec : Specification<TieuChiDanhGia>, ISingleResultSpecification
{
    public GetTieuChiByMaSpec(string ma)
    {
        Query.Where(x => x.MaTieuChi == ma);
        Query.Where(x => x.SuDung == true);

    }
}
public class GetTieuChiByMaMauPhieuSpec : Specification<TieuChiDanhGia>, ISingleResultSpecification
{
    public GetTieuChiByMaMauPhieuSpec(string ma)
    {
        Query.Where(x => x.MaMauPhieuDanhGia == ma);
        Query.Where(x => x.SuDung == true);

    }
}
public class GetMauMauPhieuByIdSpec : Specification<MauPhieuDanhGia>, ISingleResultSpecification
{
    public GetMauMauPhieuByIdSpec(string ma)
    {
        Query.Where(x => x.Ma == ma);
    }
}

public class AddTieuChiDanhGiaCommandHandler : ICommandHandler<AddTieuChiDanhGiaCommand, Guid>
{
    private readonly IRepositoryWithEvents<TieuChiDanhGia> _repositoryWithEvents;
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<TieuChiDanhGia> _tieuChirepository;
    private readonly IRepository<MauPhieuDanhGia> _mauDanhGiarepository;
    public AddTieuChiDanhGiaCommandHandler(IRepositoryWithEvents<TieuChiDanhGia> repositoryWithEvents, IDapperRepository dapperRepository, IRepository<TieuChiDanhGia> TieuChirepository, IRepository<MauPhieuDanhGia> mauDanhGiarepository)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
        _tieuChirepository = TieuChirepository;
        _mauDanhGiarepository = mauDanhGiarepository;
    }
    public async void CapNhatSTTTieuChi(TieuChiDanhGia input)
    {
        var maCuoi = input.MaDayDu.Split('.')[input.MaDayDu.Split('.').Length - 1];
        var maCheck = input.MaDayDu.Replace("." + maCuoi, "");

        string query = "SELECT Id,ThuTu,MaDayDu FROM Business.TieuChiDanhGias";
        string where = $" WHERE SuDung = 1 and ThuTu IS NOT NULL and ThuTu>=@ThuTu and MaTieuChi!=@MaTieuChi";
        where += $" and MaMauPhieuDanhGia=@MaMauPhieuDanhGia and MaDayDu IS NOT NULL and MaDayDu like N'{maCheck}%'";
        var lstDG = await _dapperRepository.QueryAsync<TieuChiDanhGia>(query + where, input);

        if (lstDG.Count > 0)
        {
            var sum = 0;
            foreach (var itemDG in lstDG)
            {

                //Update
                var checkMaDayDu = itemDG.MaDayDu.Split('.').ToList();
                var checkMaAdd = input.MaDayDu.Split('.').ToList();
                if (checkMaAdd.Count == checkMaDayDu.Count)
                {
                    int strDiemTuDG = itemDG.ThuTu.Value + 1;
                    var item = await _tieuChirepository.FirstOrDefaultAsync(new GetTieuChiByIdSpec(itemDG.Id));
                    item.UpdateThuTu(strDiemTuDG);

                }

            }

        }
    }

    public async void UpdateTongChuanChaConLai(TieuChiDanhGia entity, string maMauPhieuDanhGia)
    {
        if (entity.DiemLiet != true && entity.DiemThuong != true && entity.DiemTru != true)
        {
            if (entity.MaDayDu != null)
            {
                var maTieuChiCha = entity.MaDayDu.Split('.')[entity.MaDayDu.Split('.').Length - 2];
                if (maTieuChiCha != null)
                {
                    var tieuChiCha = await _tieuChirepository.FirstOrDefaultAsync(new GetTieuChiByMaSpec(maTieuChiCha));
                    if (tieuChiCha != null)
                    {
                        if (tieuChiCha.DiemLiet != true && tieuChiCha.DiemThuong != true && tieuChiCha.DiemTru != true)
                        {
                            var diem = await TongDiemTheoTieuChiCon(maTieuChiCha, entity.MaMauPhieuDanhGia);
                            tieuChiCha.UpdateThangDiem(diem.ToString());
                            UpdateTongChuanChaConLai(tieuChiCha, maMauPhieuDanhGia);
                        }
                    }


                }
            }

        }
    }
    public async Task<int> TongDiemTheoTieuChiCon(string maTieuChi, string nhomDoiTuongID)
    {
        var lstTieuChi = await _tieuChirepository.ListAsync(new GetTieuChiByMaMauPhieuSpec(nhomDoiTuongID));


        var lstTieuChiCon = lstTieuChi
            .Where(x => x.DiemLiet != true && x.DiemThuong != true && x.DiemTru != true && x.MaDayDu.Split('.')[x.MaDayDu.Split('.').Length - 2] == maTieuChi)
            .Select(x => x.ThangDiem)
            .ToList();
        var diemTieuChiCha = 0;
        foreach (var t in lstTieuChiCon)
        {
            diemTieuChiCha += int.Parse(t);
        }
        return diemTieuChiCha;
    }
    public async Task<List<TieuChiTheoMaNhomDoiTuongDto>> DanhSachTieuChiTheoMaNhomDoiTuong(string maNhomDoiTuong, string maDonVi = null, string checkKiemNhiem = null, string level = null)
    {
        var rs = new List<TieuChiTheoMaNhomDoiTuongDto>();
        var keyMemory = "DataTieuChi_" + maNhomDoiTuong + "_" + checkKiemNhiem + "_" + level;
        var keyMemoryDonVi = "DataTieuChi_" + maNhomDoiTuong + "_" + maDonVi + "_" + checkKiemNhiem + "_" + level;
        var dataKey = _cacheService.Get<List<TieuChiTheoMaNhomDoiTuongDto>>(keyMemory);
        var dataKeyDonVi = _cacheService.Get<List<TieuChiTheoMaNhomDoiTuongDto>>(keyMemoryDonVi);
        if (dataKey != null && dataKey.Count > 0 && string.IsNullOrEmpty(maDonVi))
        {
            rs = dataKey;
        }
        else if (dataKeyDonVi != null && dataKeyDonVi.Count > 0 && !string.IsNullOrEmpty(maDonVi))
        {
            rs = dataKeyDonVi;
        }

        else
        {
            string queryNDT = "SELECT Id,MaBoTieuChi,Ma,DataTieuChi,Ten,DiemDatYeuCau,DiemThuong,DiemTru,LevelBoTieuChi FROM Business.MauPhieuDanhGias";
            string whereNDT = $" WHERE Ma='{maNhomDoiTuong}'";
            if (!string.IsNullOrEmpty(level)) whereNDT += $"  and LevelBoTieuChi=N'{level}'";
            else whereNDT += $"  and LevelBoTieuChi IS NULL";
            var lstNhomDoiTuongFilter = await _dapperRepository.QueryAsync<MauPhieuDanhGia>(queryNDT + whereNDT);
            //Get Bộ tiêu chuẩn theo nhóm đối tượng
            var lstBoTieuChuanId = new List<string>();
            foreach (MauPhieuDanhGia dt in lstNhomDoiTuongFilter)
            {
                if (dt.MaBoTieuChi != null)
                    lstBoTieuChuanId.Add(dt.MaBoTieuChi);
            }
            if (lstBoTieuChuanId.Count > 0)
            {
                // Get all Phân loại đánh giá
                string queryPLDG = "SELECT Id,Ten,Ma,DiemToiDa,DiemToiThieu,MaBoTieuChi FROM Business.XepLoaiDanhGias";
                var lstPLDG = await _dapperRepository.QueryAsync<PhanLoaiDanhGiaViewModel>(queryPLDG);
                // Get all Tiêu chí đánh giá
                string queryTC = "SELECT * FROM  Business.TieuChiDanhGias";
                var whereTC = "";
                if (string.IsNullOrEmpty(maDonVi))
                {
                    whereTC = $" and SuDung = 1";
                }
                else
                {
                    var maDonViCha1 = "";
                    var maDonViCha2 = "";
                    var maDonViCha3 = "";

                    if (Regex.IsMatch(maDonVi, @"[0-9]{3}\.[A-Z0-9]{2}\.[A-Z0-9]{2}\.[A-Z][0-9]{2}"))
                    {
                        if (maDonVi.StartsWith("000.00"))
                        {
                            //var arrMa = Regex.Split(maDonVi,@"000.00");
                            var arrMa = maDonVi.Split('.');
                            maDonViCha1 = "000.00.00." + arrMa[arrMa.Length - 1];
                            if (maDonVi == maDonViCha1)
                            {
                                whereTC = $" and SuDung = 1 and (MaDonVi IS NULL or MaDonVi IN ('{maDonVi}'))";
                            }
                            else
                            {
                                whereTC = $" and SuDung = 1 and (MaDonVi IS NULL or MaDonVi IN ('{maDonVi}','{maDonViCha1}'))";
                            }
                        }
                        else if (maDonVi.StartsWith("000."))
                        {
                            var arrMa = maDonVi.Split('.');
                            maDonViCha1 = "000.00.00." + arrMa[arrMa.Length - 1];
                            maDonViCha2 = "000.00." + arrMa[arrMa.Length - 2] + "." + arrMa[arrMa.Length - 1];
                            whereTC = $" and SuDung = 1 and (MaDonVi IS NULL or MaDonVi IN ('{maDonVi}','{maDonViCha1}','{maDonViCha2}'))";
                        }
                        else if (!maDonVi.StartsWith("000."))
                        {
                            var arrMa = maDonVi.Split('.');
                            maDonViCha1 = "000.00.00." + arrMa[arrMa.Length - 1];
                            maDonViCha2 = "000.00." + arrMa[arrMa.Length - 2] + "." + arrMa[arrMa.Length - 1];
                            maDonViCha3 = "000." + arrMa[arrMa.Length - 3] + "." + arrMa[arrMa.Length - 2] + "." + arrMa[arrMa.Length - 1];
                            whereTC = $" and SuDung = 1 and (MaDonVi IS NULL or MaDonVi IN ('{maDonVi}','{maDonViCha1}','{maDonViCha2}','{maDonViCha3}'))";
                        }
                    }
                }
                if (!string.IsNullOrEmpty(checkKiemNhiem))
                {
                    if (checkKiemNhiem == "0")
                    {
                        whereTC = $" and ((KiemNhiem = 0{whereTC}) or (KiemNhiem  IS NULL{whereTC}))";
                    }
                }
                else whereTC = $" and ((KiemNhiem = 0{whereTC}) or (KiemNhiem  IS NULL{whereTC}))";
                whereTC = $" WHERE Id IS NOT NULL" + whereTC;
                var whereOderTC = $" ORDER BY ThuTu";
                var lstTieuChi = await _dapperRepository.QueryAsync<TieuChiDanhGia>(queryTC + whereTC + whereOderTC);
                var dataTC = JsonConvert.SerializeObject(rs);
                //CheckTruoc
                lstBoTieuChuanId = lstBoTieuChuanId.Distinct().ToList(); // lọc các ID thừa
                if (lstBoTieuChuanId.Count > 0)
                {
                    string inIdBTC = string.Join(",", lstBoTieuChuanId);

                    string queryBTC = "SELECT Id,MaBoTieuChi,TenBoTieuChi,LoaiThoiGian,ThoiGian FROM  Business.BoTieuChuans";
                    string whereBTC = $" WHERE MaBoTieuChi in ({inIdBTC})";
                    var lstBoTieuChuan = await _dapperRepository.QueryAsync<BoTieuChuan>(queryBTC + whereBTC);
                    if (lstBoTieuChuan.Count == 0)
                    {
                        return null;
                    }
                    else
                    {
                        foreach (var boTieuChuan in lstBoTieuChuan)
                        {
                            var lstPhanLoaiDanhGiaFilter = lstPLDG.Where(x => x.MaBoTieuChi != null && x.MaBoTieuChi == boTieuChuan.MaBoTieuChi).ToList();
                            var btc = new TieuChiTheoMaNhomDoiTuongDto
                            {
                                Id = boTieuChuan.Id,
                                TenBoTieuChi = boTieuChuan.TenBoTieuChi,
                                MaBoTieuChi = boTieuChuan.MaBoTieuChi,
                                ThoiGian = boTieuChuan.ThoiGian,
                                LoaiThoiGian = boTieuChuan.LoaiThoiGian,
                                DanhSachPhanLoaiDanhGia = lstPhanLoaiDanhGiaFilter
                            };
                            var lst = new List<NhomDoiTuongViewModel>();
                            var ngayHienTai = DateTime.Now.Day;
                            var thangHienTai = DateTime.Now.Month;
                            if (boTieuChuan.LoaiThoiGian == "Tháng")
                            {
                                var arrNgay = boTieuChuan.ThoiGian.Split('-');
                                if (ngayHienTai < Int32.Parse(arrNgay[0]) || ngayHienTai > Int32.Parse(arrNgay[1]))
                                {
                                    btc.CanhBao = "Nam ngoai pham vi";
                                }
                            }
                            else if (boTieuChuan.LoaiThoiGian == "Quý")
                            {
                                var arrQuy = Regex.Split(boTieuChuan.ThoiGian, @"##");
                                var arrNgay = arrQuy[1].Split('-');
                                if (ngayHienTai < Int32.Parse(arrNgay[0]) || ngayHienTai > Int32.Parse(arrNgay[1]))
                                {
                                    if (arrQuy[0] == "1" && thangHienTai > 3)
                                    {
                                        btc.CanhBao = "Nam ngoai pham vi";
                                    }
                                    else if (arrQuy[0] == "2" && (thangHienTai > 6 || thangHienTai < 4))
                                    {
                                        btc.CanhBao = "Nam ngoai pham vi";
                                    }
                                    else if (arrQuy[0] == "3" && (thangHienTai > 9 || thangHienTai < 7))
                                    {
                                        btc.CanhBao = "Nam ngoai pham vi";
                                    }
                                    else if (arrQuy[0] == "4" && thangHienTai < 10)
                                    {
                                        btc.CanhBao = "Nam ngoai pham vi";
                                    }
                                }
                            }
                            else if (boTieuChuan.LoaiThoiGian == "6 tháng")
                            {
                                var arr6Thang = Regex.Split(boTieuChuan.ThoiGian, @"##");
                                var arrNgay = arr6Thang[1].Split('-');
                                if ((ngayHienTai < Int32.Parse(arrNgay[0]) || ngayHienTai > Int32.Parse(arrNgay[1]))
                                    && arr6Thang[0] != thangHienTai.ToString())
                                {
                                    btc.CanhBao = "Nam ngoai pham vi";
                                }
                            }
                            else if (boTieuChuan.LoaiThoiGian == "Năm")
                            {
                                var arrNam = Regex.Split(boTieuChuan.ThoiGian, @"##");
                                var arrNgay = arrNam[1].Split('-');
                                if ((ngayHienTai < Int32.Parse(arrNgay[0]) || ngayHienTai > Int32.Parse(arrNgay[1]))
                                    && arrNam[0] != thangHienTai.ToString())
                                {
                                    btc.CanhBao = "Nam ngoai pham vi";
                                }
                            }
                            foreach (var nhomDoiTuong in lstNhomDoiTuongFilter)
                            {
                                var lstTieuChiFilter = lstTieuChi.Where(x => x.MaMauPhieuDanhGia == nhomDoiTuong.Ma).ToList();
                                if (nhomDoiTuong != null && nhomDoiTuong.MaBoTieuChi == boTieuChuan.MaBoTieuChi)
                                {
                                    // Tinh diem tieu chi doi tuong
                                    var lstTieuChiConDoiTuong = lstTieuChiFilter
                                        .Where(x => x.MaDayDu.Split('.')[x.MaDayDu.Split('.').Length - 2] == nhomDoiTuong.Ma)
                                        .Select(x => x.ThangDiem)
                                        .ToList();
                                    var diemNDT = 0;
                                    foreach (var t in lstTieuChiConDoiTuong)
                                    {
                                        diemNDT += Int32.Parse(t);
                                    }
                                    var doiTuongTieuChi = new NhomDoiTuongViewModel
                                    {
                                        TenTieuChi = nhomDoiTuong.Ten,
                                        MaTieuChi = nhomDoiTuong.Ma,
                                        ThangDiem = diemNDT.ToString(),
                                        Level = nhomDoiTuong.LevelBoTieuChi,
                                        DiemTru = nhomDoiTuong.DiemTru.HasValue ? nhomDoiTuong.DiemTru.Value.ToString() : "",
                                        DiemThuong = nhomDoiTuong.DiemThuong.HasValue ? nhomDoiTuong.DiemThuong.Value.ToString() : "",
                                        DiemDatYeuCau = nhomDoiTuong.DiemDatYeuCau.HasValue ? nhomDoiTuong.DiemDatYeuCau.Value.ToString() : "",
                                        KiemNhiem = null,
                                        DanhSachTieuChiCon = DanhSachTieuChiCon(lstTieuChi, nhomDoiTuong.Ma, nhomDoiTuong.Ma)
                                    };
                                    if (doiTuongTieuChi.DanhSachTieuChiCon.Count != 0)
                                    {
                                        lst.Add(doiTuongTieuChi);
                                    }
                                }
                                else
                                {
                                    btc.CanhBao = "Nam ngoai pham vi";
                                }
                            }
                            btc.DanhSachTieuChi = lst;
                            rs.Add(btc);
                        }

                    }
                }


                _cacheService.Set(maDonVi == null ? keyMemory : keyMemoryDonVi, dataTC, TimeSpan.FromMinutes(1));

                //MemoryCacheHelper.Add(maDonVi == null ? keyMemory : keyMemoryDonVi, dataTC, DateTimeOffset.UtcNow.AddMinutes(1));
            }
        }
        return rs;
    }
    public List<TieuChiViewModel> DanhSachTieuChiCon(IReadOnlyList<TieuChiDanhGia> lstTieuChi, string maTieuChi, string maMauPhieuDanhGia)
    {
        var lstTieuChiCon = new List<TieuChiViewModel>();
        var tieuChiCons = lstTieuChi
            .Where(x => x.MaDayDu.Split('.')[x.MaDayDu.Split('.').Length - 2] == maTieuChi && x.MaMauPhieuDanhGia == maMauPhieuDanhGia)
            .ToList();
        if (tieuChiCons.Count != 0)
        {
            foreach (var tieuChi in tieuChiCons)
            {
                var tieuChiVM = new TieuChiViewModel
                {
                    Id = tieuChi.Id,
                    TenTieuChi = tieuChi.TenTieuChi,
                    MaDayDu = tieuChi.MaDayDu,
                    MaTieuChi = tieuChi.MaTieuChi,
                    ThangDiem = tieuChi.ThangDiem,
                    GhiChu = tieuChi.GhiChu,
                    DiemTru = tieuChi.DiemTru,
                    MaDonVi = tieuChi.MaDonVi,
                    DiemThuong = tieuChi.DiemThuong,
                    DiemLiet = tieuChi.DiemLiet,
                    KiemNhiem = tieuChi.KiemNhiem,
                    TieuChiLienKet = tieuChi.TieuChiLienKet,
                    DuocChamNhieuLan = tieuChi.DuocChamNhieuLan,
                    JsonLienKet = tieuChi.JsonLienKet,
                    JsonDiemLiet = tieuChi.JsonDiemLiet,
                    DonViTinh = tieuChi.DonViTinh,
                    SoLan = tieuChi.SoLan,
                    STT = tieuChi.STT,
                    DanhSachTieuChiCon = DanhSachTieuChiCon(lstTieuChi, tieuChi.MaTieuChi, maMauPhieuDanhGia)
                };
                lstTieuChiCon.Add(tieuChiVM);

            }
            return lstTieuChiCon;
        }
        return lstTieuChiCon;
    }
    public async Task<Result<Guid>> Handle(AddTieuChiDanhGiaCommand request, CancellationToken cancellationToken)
    {
        var input = TieuChiDanhGia.Create(request.MaTieuChi, request.MaDayDu, request.TenTieuChi, request.SuDung, request.DiemTru, request.ThuTu, request.ThuTuHienThi, request.ThangDiem, request.GhiChu, request.MaMauPhieuDanhGia, request.MaDonVi, request.DiemThuong, request.DiemLiet, request.TieuChiLienKet, request.DuocChamNhieuLan, request.KiemNhiem, request.STT, request.DonViTinh, request.JsonLienKet, request.JsonDiemLiet, request.SoLan, request.MaKhoTieuChi);


        Regex.Replace(request.TenTieuChi, @"[^,.!$&()=@{}[]';]+", "");
        var tieuChiAdd = await _tieuChirepository.AddAsync(input);
        //tieuChiAdd.MaTieuChi = tieuChiAdd.Id.ToString();

        //tieuChiAdd.MaDayDu = tieuChiAdd.MaDayDu +"."+ tieuChiAdd.Id.ToString();
       
        //CapNhatSTTTieuChi(input);

        //var doiTuong = await _mauDanhGiarepository.FirstOrDefaultAsync(new GetMauMauPhieuByIdSpec(input.MaMauPhieuDanhGia));

        //if (input.DiemLiet != true && input.DiemThuong != true && input.DiemTru != true)
        //{
        //    UpdateTongChuanChaConLai(input, input.MaMauPhieuDanhGia);
        //}
        //string checkKiemNhiem = string.Empty; string level = string.Empty;
        //if (input.KiemNhiem == true) checkKiemNhiem = "1";
        //else checkKiemNhiem = "0";
        //if (!string.IsNullOrEmpty(doiTuong.LevelBoTieuChi)) level = doiTuong.LevelBoTieuChi;
        //else level = "";


        //if (input.MaDonVi == null)
        //{
        //    _cacheService.Remove("DataTieuChi_" + doiTuong.Ma + "_" + checkKiemNhiem + "_" + level);
        //    var rsNDT = DanhSachTieuChiTheoMaNhomDoiTuong(doiTuong.Ma, "", checkKiemNhiem, level);

        //    var dataTCNDT = JsonConvert.SerializeObject(rsNDT);
        //    _cacheService.Set("DataTieuChi_" + doiTuong.Ma + "_" + checkKiemNhiem + "_" + level, dataTCNDT, TimeSpan.FromMinutes(15));
        //}
        //else
        //{
        //    var maDonViCon = "";
        //    var maDonVi = input.MaDonVi;
        //    if (maDonVi.StartsWith("000.00.00"))
        //    {
        //        //var arrMa = Regex.Split(maDonVi,@"000.00");
        //        var arrMa = maDonVi.Split('.');
        //        maDonViCon = arrMa[arrMa.Length - 1];
        //    }
        //    else if (maDonVi.StartsWith("000.00"))
        //    {
        //        var arrMa = maDonVi.Split('.');
        //        maDonViCon = arrMa[arrMa.Length - 2] + "." + arrMa[arrMa.Length - 1];
        //    }
        //    else if (maDonVi.StartsWith("000."))
        //    {
        //        var arrMa = maDonVi.Split('.');
        //        maDonViCon = arrMa[arrMa.Length - 3] + "." + arrMa[arrMa.Length - 2] + "." + arrMa[arrMa.Length - 1];

        //    }
        //    else if (!maDonVi.StartsWith("000."))
        //    {
        //        maDonViCon = maDonVi;
        //    }
        //    //TamAnXoaCacheChoHaiXem

        //    _cacheService.Remove(nameof(PostTieuChiTheoDoiTuongQuery) + maDonViCon);
        //    //foreach (var item in MemoryCache.Default)
        //    //{
        //    //    //add the item.keys to list
        //    //    if (item.Key.Contains(maDonViCon))
        //    //    {
        //    //        MemoryCacheHelper.Delete(item.Key);
        //    //    }
        //    //}
        //    //MemoryCacheHelper.Delete("DataTieuChi_" + doiTuong.MaNhomDoiTuong + "_" + input.MaDonVi);
        //    var rsNDT = DanhSachTieuChiTheoMaNhomDoiTuong(doiTuong.Ma, input.MaDonVi, checkKiemNhiem, level);
        //    var dataTCNDT = JsonConvert.SerializeObject(rsNDT);
        //    _cacheService.Set("DataTieuChi_" + doiTuong.Ma + "_" + input.MaDonVi + "_" + checkKiemNhiem + "_" + level, dataTCNDT, TimeSpan.FromMinutes(15));
        //}
        return Result<Guid>.Success(tieuChiAdd.Id);
    }
}
