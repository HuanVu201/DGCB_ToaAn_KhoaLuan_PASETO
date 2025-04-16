//using MediatR;
//using Microsoft.Extensions.Configuration;
//using Newtonsoft.Json.Linq;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using Tandan.OpenReport;
//using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp;
//using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
//using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;
//using TD.DanhGiaCanBo.Application.Common.Minio;
//using TD.DanhGiaCanBo.Application.Common.Persistence;
//using TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaCaNhan;
//using TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaDonVi;
//using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
//using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp;

//namespace TD.DanhGiaCanBo.Infrastructure.ExportData.Bussiness;
//public class ExportPhieuDanhGiaDonViService : IExportPhieuDanhGiaDonVi
//{
//    private readonly IDapperRepository _dapperRepository;
//    private readonly IMediator _mediator;
//    private readonly IMinioService _minioService;
//    private readonly string? FileUploadLocalPath;
//    private List<object> _listTieuChiMauPhieu;
//    private List<object> _listPointOfTieuChi;

//    public ExportPhieuDanhGiaDonViService(IDapperRepository dapperRepository, IMediator mediator, IMinioService minioService, IConfiguration configuration)
//    {
//        _dapperRepository = dapperRepository;
//        _mediator = mediator;
//        _minioService = minioService;
//        FileUploadLocalPath = configuration.GetValue<string>("FileConfig:FileUploadLocalPath");
//        _listTieuChiMauPhieu = new List<object>();
//        _listPointOfTieuChi = new List<object>();

//    }

//    public async Task<UrlPhieuDanhGiaDto> ExportPhieuDanhGiaDonVi(GetDanhGiaDonViDto data, string urlPhoi)
//    {
//        var fileRes = await _minioService.GetFileByKey2Async(string.Empty, urlPhoi);
//        if (fileRes == null || fileRes.ByteRes == null || fileRes.ByteRes.Length == 0)
//        {
//            throw new Exception("File not found or is empty.");
//        }

//        try
//        {
//            string localPathUpload = !string.IsNullOrEmpty(FileUploadLocalPath) ? FileUploadLocalPath : AppDomain.CurrentDomain.BaseDirectory + "Files";
//            using (var stream = new MemoryStream(fileRes.ByteRes))
//            {
//                using (var rp = WordReport.Open(stream))
//                {
//                    rp.SetTag("nguoiTuDanhGia", data.NguoiTuDanhGia ?? string.Empty);
//                    rp.SetTag("nguoiThamMuu", data.NguoiThamMuu ?? string.Empty);
//                    rp.SetTag("nguoiDanhGia", data.NguoiDanhGia ?? string.Empty);

//                    if (!string.IsNullOrEmpty(data.TenDonVi) || !string.IsNullOrEmpty(data.TenPhongBan))
//                        rp.SetTag("tenPhongBanDonVi", data.TenPhongBan ?? data.TenDonVi);


//                    if (!string.IsNullOrEmpty(data.LoaiThoiGian) && data.NamDanhGia > 0)
//                    {
//                        if (data.LoaiThoiGian.ToLower() == "năm")
//                        {
//                            rp.SetTag("thoiGian", $"Năm {data.NamDanhGia}");
//                        }
//                        else
//                        {
//                            rp.SetTag("thoiGian", $"{data.LoaiThoiGian} {data.ThoiGian} năm {data.NamDanhGia}");
//                        }
//                    }

//                    rp.SetTag("ngay", DateTime.Now.Day);
//                    rp.SetTag("thang", DateTime.Now.Month);
//                    rp.SetTag("nam", DateTime.Now.Year);

//                    List<ChiTietDanhGiaDonViDto> mauPhieus = new List<ChiTietDanhGiaDonViDto>();
//                    data.MauPhieus.ForEach(item =>
//                    {
//                        mauPhieus.Add(item);
//                    });
//                    if (mauPhieus.Count == 0)
//                        throw new Exception("Không có thông tin các mẫu phiếu");

//                    #region Xử lý thông tin chi tiết các loại điiểm
//                    if (mauPhieus.Count > 0)
//                    {
//                        rp.SetTag("tieuDePhieu1", GetTieuDeMauPhieu(mauPhieus[0].TenMauPhieu ?? string.Empty));

//                        #region Xử lý điểm tổng
//                        string scorePoint = mauPhieus[0].ScorePoint ?? string.Empty;
//                        string chiTietDiemTuDanhGia = mauPhieus[0].ChiTietDiemTuDanhGia ?? string.Empty;
//                        string chiTietDiemThamMuu = mauPhieus[0].ChiTietDiemThamMuu ?? string.Empty;
//                        string chiTietDiemLanhDaoDanhGia = mauPhieus[0].ChiTietDiemLanhDaoDanhGia ?? string.Empty;

//                        _listPointOfTieuChi.Add(new PointObject1
//                        {
//                            Title1 = "Tổng điểm đạt yêu cầu",
//                            DiemScore1 = !string.IsNullOrEmpty(scorePoint) ? scorePoint.Split("#")[0] : string.Empty,
//                            DiemTuCham1 = !string.IsNullOrEmpty(chiTietDiemTuDanhGia) ? chiTietDiemTuDanhGia.Split("#")[0] : string.Empty,
//                            DiemThamMuu1 = !string.IsNullOrEmpty(chiTietDiemThamMuu) ? chiTietDiemThamMuu.Split("#")[0] : string.Empty,
//                            DiemLanhDaoDanhGia1 = !string.IsNullOrEmpty(chiTietDiemLanhDaoDanhGia) ? chiTietDiemLanhDaoDanhGia.Split("#")[0] : string.Empty,

//                        });
//                        _listPointOfTieuChi.Add(new PointObject1
//                        {
//                            Title1 = "Tổng điểm thưởng",
//                            DiemScore1 = !string.IsNullOrEmpty(scorePoint) ? scorePoint.Split("#")[1] : string.Empty,
//                            DiemTuCham1 = !string.IsNullOrEmpty(chiTietDiemTuDanhGia) ? chiTietDiemTuDanhGia.Split("#")[1] : string.Empty,
//                            DiemThamMuu1 = !string.IsNullOrEmpty(chiTietDiemThamMuu) ? chiTietDiemThamMuu.Split("#")[1] : string.Empty,
//                            DiemLanhDaoDanhGia1 = !string.IsNullOrEmpty(chiTietDiemLanhDaoDanhGia) ? chiTietDiemLanhDaoDanhGia.Split("#")[1] : string.Empty,


//                        });
//                        _listPointOfTieuChi.Add(new PointObject1
//                        {
//                            Title1 = "Tổng điểm trừ",
//                            DiemScore1 = !string.IsNullOrEmpty(scorePoint) ? scorePoint.Split("#")[2] : string.Empty,
//                            DiemTuCham1 = !string.IsNullOrEmpty(chiTietDiemTuDanhGia) ? chiTietDiemTuDanhGia.Split("#")[2] : string.Empty,
//                            DiemThamMuu1 = !string.IsNullOrEmpty(chiTietDiemThamMuu) ? chiTietDiemThamMuu.Split("#")[2] : string.Empty,
//                            DiemLanhDaoDanhGia1 = !string.IsNullOrEmpty(chiTietDiemLanhDaoDanhGia) ? chiTietDiemLanhDaoDanhGia.Split("#")[2] : string.Empty,


//                        });
//                        _listPointOfTieuChi.Add(new PointObject1
//                        {
//                            Title1 = "TỔNG SỐ",
//                            DiemScore1 = string.Empty,
//                            DiemTuCham1 = mauPhieus[0].DiemTuDanhGia.ToString() ?? string.Empty,
//                            DiemThamMuu1 = mauPhieus[0].DiemThamMuu.ToString() ?? string.Empty,
//                            DiemLanhDaoDanhGia1 = mauPhieus[0].DiemLanhDaoDanhGia.ToString() ?? string.Empty,

//                        });
//                        #endregion

//                        #region Xử lý điểm của từng tiêu chí
//                        List<TieuChiDanhGiaNooTreeDto> dataRequest = JsonConvert.DeserializeObject<TieuChiDanhGiaNooTreeDto>(mauPhieus[0].DataLanhDaoDanhGia ?? mauPhieus[0].DataThamMuu ?? mauPhieus[0].DataTuDanhGia).DanhSachTieuChiCon;
//                        List<string> listRootTieuChi = new List<string>();
//                        dataRequest.ForEach(item =>
//                        {
//                            listRootTieuChi.Add(item.MaTieuChi ?? string.Empty);
//                        });

//                        GetListTieuChiOfMauPhieu(0, dataRequest, string.Join("##", listRootTieuChi));
//                        #endregion
//                    }

//                    if (mauPhieus.Count > 1)
//                    {
//                        rp.SetTag("tieuDePhieu2", GetTieuDeMauPhieu(mauPhieus[1].TenMauPhieu ?? string.Empty));

//                        #region Xử lý điểm tổng
//                        string scorePoint = mauPhieus[1].ScorePoint ?? string.Empty;
//                        string chiTietDiemTuDanhGia = mauPhieus[1].ChiTietDiemTuDanhGia ?? string.Empty;
//                        string chiTietDiemThamMuu = mauPhieus[1].ChiTietDiemThamMuu ?? string.Empty;
//                        string chiTietDiemLanhDaoDanhGia = mauPhieus[1].ChiTietDiemLanhDaoDanhGia ?? string.Empty;

//                        _listPointOfTieuChi.Add(new PointObject2
//                        {
//                            Title2 = "Tổng điểm đạt yêu cầu",
//                            DiemScore2 = !string.IsNullOrEmpty(scorePoint) ? scorePoint.Split("#")[0] : string.Empty,
//                            DiemTuCham2 = !string.IsNullOrEmpty(chiTietDiemTuDanhGia) ? chiTietDiemTuDanhGia.Split("#")[0] : string.Empty,
//                            DiemThamMuu2 = !string.IsNullOrEmpty(chiTietDiemThamMuu) ? chiTietDiemThamMuu.Split("#")[0] : string.Empty,
//                            DiemLanhDaoDanhGia2 = !string.IsNullOrEmpty(chiTietDiemLanhDaoDanhGia) ? chiTietDiemLanhDaoDanhGia.Split("#")[0] : string.Empty,
//                        });
//                        _listPointOfTieuChi.Add(new PointObject2
//                        {
//                            Title2 = "Tổng điểm thưởng",
//                            DiemScore2 = !string.IsNullOrEmpty(scorePoint) ? scorePoint.Split("#")[1] : string.Empty,
//                            DiemTuCham2 = !string.IsNullOrEmpty(chiTietDiemTuDanhGia) ? chiTietDiemTuDanhGia.Split("#")[1] : string.Empty,
//                            DiemThamMuu2 = !string.IsNullOrEmpty(chiTietDiemThamMuu) ? chiTietDiemThamMuu.Split("#")[1] : string.Empty,
//                            DiemLanhDaoDanhGia2 = !string.IsNullOrEmpty(chiTietDiemLanhDaoDanhGia) ? chiTietDiemLanhDaoDanhGia.Split("#")[1] : string.Empty,


//                        });
//                        _listPointOfTieuChi.Add(new PointObject2
//                        {
//                            Title2 = "Tổng điểm trừ",
//                            DiemScore2 = !string.IsNullOrEmpty(scorePoint) ? scorePoint.Split("#")[2] : string.Empty,
//                            DiemTuCham2 = !string.IsNullOrEmpty(chiTietDiemTuDanhGia) ? chiTietDiemTuDanhGia.Split("#")[2] : string.Empty,
//                            DiemThamMuu2 = !string.IsNullOrEmpty(chiTietDiemThamMuu) ? chiTietDiemThamMuu.Split("#")[2] : string.Empty,
//                            DiemLanhDaoDanhGia2 = !string.IsNullOrEmpty(chiTietDiemLanhDaoDanhGia) ? chiTietDiemLanhDaoDanhGia.Split("#")[2] : string.Empty,


//                        });
//                        _listPointOfTieuChi.Add(new PointObject2
//                        {
//                            Title2 = "TỔNG SỐ",
//                            DiemScore2 = string.Empty,
//                            DiemTuCham2 = mauPhieus[1].DiemTuDanhGia.ToString() ?? string.Empty,
//                            DiemThamMuu2 = mauPhieus[1].DiemThamMuu.ToString() ?? string.Empty,
//                            DiemLanhDaoDanhGia2 = mauPhieus[1].DiemLanhDaoDanhGia.ToString() ?? string.Empty,

//                        });
//                        #endregion

//                        #region Xử lý điểm của từng tiêu chí
//                        List<TieuChiDanhGiaNooTreeDto> dataRequest = JsonConvert.DeserializeObject<TieuChiDanhGiaNooTreeDto>(mauPhieus[1].DataLanhDaoDanhGia ?? mauPhieus[1].DataThamMuu ?? mauPhieus[1].DataTuDanhGia).DanhSachTieuChiCon;
//                        List<string> listRootTieuChi = new List<string>();
//                        dataRequest.ForEach(item =>
//                        {
//                            listRootTieuChi.Add(item.MaTieuChi ?? string.Empty);
//                        });

//                        GetListTieuChiOfMauPhieu(1, dataRequest, string.Join("##", listRootTieuChi));
//                        #endregion
//                    }

//                    if (mauPhieus.Count > 2)
//                    {
//                        rp.SetTag("tieuDePhieu3", GetTieuDeMauPhieu(mauPhieus[2].TenMauPhieu ?? string.Empty));

//                        #region Xử lý điểm tổng
//                        string scorePoint = mauPhieus[2].ScorePoint ?? string.Empty;
//                        string chiTietDiemTuDanhGia = mauPhieus[2].ChiTietDiemTuDanhGia ?? string.Empty;
//                        string chiTietDiemThamMuu = mauPhieus[2].ChiTietDiemThamMuu ?? string.Empty;
//                        string chiTietDiemLanhDaoDanhGia = mauPhieus[2].ChiTietDiemLanhDaoDanhGia ?? string.Empty;

//                        _listPointOfTieuChi.Add(new PointObject3
//                        {
//                            Title3 = "Tổng điểm đạt yêu cầu",
//                            DiemScore3 = !string.IsNullOrEmpty(scorePoint) ? scorePoint.Split("#")[0] : string.Empty,
//                            DiemTuCham3 = !string.IsNullOrEmpty(chiTietDiemTuDanhGia) ? chiTietDiemTuDanhGia.Split("#")[0] : string.Empty,
//                            DiemThamMuu3 = !string.IsNullOrEmpty(chiTietDiemThamMuu) ? chiTietDiemThamMuu.Split("#")[0] : string.Empty,
//                            DiemLanhDaoDanhGia3 = !string.IsNullOrEmpty(chiTietDiemLanhDaoDanhGia) ? chiTietDiemLanhDaoDanhGia.Split("#")[0] : string.Empty,

//                        });
//                        _listPointOfTieuChi.Add(new PointObject3
//                        {
//                            Title3 = "Tổng điểm thưởng",
//                            DiemScore3 = !string.IsNullOrEmpty(scorePoint) ? scorePoint.Split("#")[1] : string.Empty,
//                            DiemTuCham3 = !string.IsNullOrEmpty(chiTietDiemTuDanhGia) ? chiTietDiemTuDanhGia.Split("#")[1] : string.Empty,
//                            DiemThamMuu3 = !string.IsNullOrEmpty(chiTietDiemThamMuu) ? chiTietDiemThamMuu.Split("#")[1] : string.Empty,
//                            DiemLanhDaoDanhGia3 = !string.IsNullOrEmpty(chiTietDiemLanhDaoDanhGia) ? chiTietDiemLanhDaoDanhGia.Split("#")[1] : string.Empty,


//                        });
//                        _listPointOfTieuChi.Add(new PointObject3
//                        {
//                            Title3 = "Tổng điểm trừ",
//                            DiemScore3 = !string.IsNullOrEmpty(scorePoint) ? scorePoint.Split("#")[2] : string.Empty,
//                            DiemTuCham3 = !string.IsNullOrEmpty(chiTietDiemTuDanhGia) ? chiTietDiemTuDanhGia.Split("#")[2] : string.Empty,
//                            DiemThamMuu3 = !string.IsNullOrEmpty(chiTietDiemThamMuu) ? chiTietDiemThamMuu.Split("#")[2] : string.Empty,
//                            DiemLanhDaoDanhGia3 = !string.IsNullOrEmpty(chiTietDiemLanhDaoDanhGia) ? chiTietDiemLanhDaoDanhGia.Split("#")[2] : string.Empty,


//                        });
//                        _listPointOfTieuChi.Add(new PointObject3
//                        {
//                            Title3 = "TỔNG SỐ",
//                            DiemScore3 = string.Empty,
//                            DiemTuCham3 = mauPhieus[2].DiemTuDanhGia.ToString() ?? string.Empty,
//                            DiemThamMuu3 = mauPhieus[2].DiemThamMuu.ToString() ?? string.Empty,
//                            DiemLanhDaoDanhGia3 = mauPhieus[2].DiemLanhDaoDanhGia.ToString() ?? string.Empty,

//                        });
//                        #endregion

//                        #region Xử lý điểm của từng tiêu chí
//                        List<TieuChiDanhGiaNooTreeDto> dataRequest = JsonConvert.DeserializeObject<TieuChiDanhGiaNooTreeDto>(mauPhieus[2].DataLanhDaoDanhGia ?? mauPhieus[2].DataThamMuu ?? mauPhieus[2].DataTuDanhGia).DanhSachTieuChiCon;
//                        List<string> listRootTieuChi = new List<string>();
//                        dataRequest.ForEach(item =>
//                        {
//                            listRootTieuChi.Add(item.MaTieuChi ?? string.Empty);
//                        });

//                        GetListTieuChiOfMauPhieu(2, dataRequest, string.Join("##", listRootTieuChi));
//                        #endregion
//                    }
//                    #endregion

//                    #region Xử lý điểm từng tiêu chí
//                    string resultTieuChi = JsonConvert.SerializeObject(_listTieuChiMauPhieu);
//                    var jArrTieuChi = JArray.Parse(resultTieuChi);

//                    for (int i = 0; i < jArrTieuChi.Count; i++)
//                    {
//                        var jObj = (JObject)jArrTieuChi[i];
//                        if (jObj["TenTieuChiBold1"] != null && !string.IsNullOrEmpty(jObj["TenTieuChiBold1"].ToString()))
//                        {
//                            var obj = new TieuChiBoldMauPhieu1Object
//                            {
//                                STTBold1 = jObj["STTBold1"]?.ToString() ?? string.Empty,
//                                TenTieuChiBold1 = jObj["TenTieuChiBold1"]?.ToString() ?? string.Empty,
//                                ThangDiemBold1 = jObj["ThangDiemBold1"]?.ToString() ?? string.Empty,
//                                DonViTinhBold1 = jObj["DonViTinhBold1"]?.ToString() ?? string.Empty,
//                                DiemTuChamBold1 = jObj["DiemTuChamBold1"]?.ToString() ?? string.Empty,
//                                DiemThamMuuBold1 = jObj["DiemThamMuuBold1"]?.ToString() ?? string.Empty,
//                                DiemLanhDaoDanhGiaBold1 = jObj["DiemLanhDaoDanhGiaBold1"]?.ToString() ?? string.Empty,
//                            };
//                            rp.SetRepeat(obj);
//                        }

//                        if (jObj["TenTieuChi1"] != null && !string.IsNullOrEmpty(jObj["TenTieuChi1"].ToString()))
//                        {
//                            var obj = new TieuChiNormalMauPhieu1Object
//                            {
//                                STT1 = jObj["STT1"]?.ToString() ?? string.Empty,
//                                TenTieuChi1 = jObj["TenTieuChi1"]?.ToString() ?? string.Empty,
//                                ThangDiem1 = jObj["ThangDiem1"]?.ToString() ?? string.Empty,
//                                DonViTinh1 = jObj["DonViTinh1"]?.ToString() ?? string.Empty,
//                                DiemTuCham1 = jObj["DiemTuCham1"]?.ToString() ?? string.Empty,
//                                DiemThamMuu1 = jObj["DiemThamMuu1"]?.ToString() ?? string.Empty,
//                                DiemLanhDaoDanhGia1 = jObj["DiemLanhDaoDanhGia1"]?.ToString() ?? string.Empty,
//                            };
//                            rp.SetRepeat(obj);
//                        }

//                        if (jObj["TenTieuChiBold2"] != null && !string.IsNullOrEmpty(jObj["TenTieuChiBold2"].ToString()))
//                        {
//                            var obj = new TieuChiBoldMauPhieu2Object
//                            {
//                                STTBold2 = jObj["STTBold2"]?.ToString() ?? string.Empty,
//                                TenTieuChiBold2 = jObj["TenTieuChiBold2"]?.ToString() ?? string.Empty,
//                                ThangDiemBold2 = jObj["ThangDiemBold2"]?.ToString() ?? string.Empty,
//                                DonViTinhBold2 = jObj["DonViTinhBold2"]?.ToString() ?? string.Empty,
//                                DiemTuChamBold2 = jObj["DiemTuChamBold2"]?.ToString() ?? string.Empty,
//                                DiemThamMuuBold2 = jObj["DiemThamMuuBold2"]?.ToString() ?? string.Empty,
//                                DiemLanhDaoDanhGiaBold2 = jObj["DiemLanhDaoDanhGiaBold2"]?.ToString() ?? string.Empty,
//                            };
//                            rp.SetRepeat(obj);
//                        }

//                        if (jObj["TenTieuChi2"] != null && !string.IsNullOrEmpty(jObj["TenTieuChi2"].ToString()))
//                        {
//                            var obj = new TieuChiNormalMauPhieu2Object
//                            {
//                                STT2 = jObj["STT2"]?.ToString() ?? string.Empty,
//                                TenTieuChi2 = jObj["TenTieuChi2"]?.ToString() ?? string.Empty,
//                                ThangDiem2 = jObj["ThangDiem2"]?.ToString() ?? string.Empty,
//                                DonViTinh2 = jObj["DonViTinh2"]?.ToString() ?? string.Empty,
//                                DiemTuCham2 = jObj["DiemTuCham2"]?.ToString() ?? string.Empty,
//                                DiemThamMuu2 = jObj["DiemThamMuu2"]?.ToString() ?? string.Empty,
//                                DiemLanhDaoDanhGia2 = jObj["DiemLanhDaoDanhGia2"]?.ToString() ?? string.Empty,
//                            };
//                            rp.SetRepeat(obj);
//                        }

//                        if (jObj["TenTieuChiBold3"] != null && !string.IsNullOrEmpty(jObj["TenTieuChiBold3"].ToString()))
//                        {
//                            var obj = new TieuChiBoldMauPhieu3Object
//                            {
//                                STTBold3 = jObj["STTBold3"]?.ToString() ?? string.Empty,
//                                TenTieuChiBold3 = jObj["TenTieuChiBold3"]?.ToString() ?? string.Empty,
//                                ThangDiemBold3 = jObj["ThangDiemBold3"]?.ToString() ?? string.Empty,
//                                DonViTinhBold3 = jObj["DonViTinhBold3"]?.ToString() ?? string.Empty,
//                                DiemTuChamBold3 = jObj["DiemTuChamBold3"]?.ToString() ?? string.Empty,
//                                DiemThamMuuBold3 = jObj["DiemThamMuuBold3"]?.ToString() ?? string.Empty,
//                                DiemLanhDaoDanhGiaBold3 = jObj["DiemLanhDaoDanhGiaBold3"]?.ToString() ?? string.Empty,
//                            };
//                            rp.SetRepeat(obj);
//                        }

//                        if (jObj["TenTieuChi3"] != null && !string.IsNullOrEmpty(jObj["TenTieuChi3"].ToString()))
//                        {
//                            var obj = new TieuChiNormalMauPhieu3Object
//                            {
//                                STT3 = jObj["STT3"]?.ToString() ?? string.Empty,
//                                TenTieuChi3 = jObj["TenTieuChi3"]?.ToString() ?? string.Empty,
//                                ThangDiem3 = jObj["ThangDiem3"]?.ToString() ?? string.Empty,
//                                DonViTinh3 = jObj["DonViTinh3"]?.ToString() ?? string.Empty,
//                                DiemTuCham3 = jObj["DiemTuCham3"]?.ToString() ?? string.Empty,
//                                DiemThamMuu3 = jObj["DiemThamMuu3"]?.ToString() ?? string.Empty,
//                                DiemLanhDaoDanhGia3 = jObj["DiemLanhDaoDanhGia3"]?.ToString() ?? string.Empty,
//                            };
//                            rp.SetRepeat(obj);
//                        }
//                    }
//                    #endregion

//                    #region Xử lý điểm cuối
//                    string resultDiemCuoi = JsonConvert.SerializeObject(_listPointOfTieuChi);
//                    var jArrDiemCuoi = JArray.Parse(resultDiemCuoi);

//                    for (int i = 0; i < jArrDiemCuoi.Count; i++)
//                    {
//                        var jObj = (JObject)jArrDiemCuoi[i];
//                        if (jObj["Title1"] != null && !string.IsNullOrEmpty(jObj["Title1"].ToString()))
//                        {
//                            var obj = new PointObject1
//                            {
//                                Title1 = jObj["Title1"]?.ToString() ?? string.Empty,
//                                DiemScore1 = jObj["DiemScore1"]?.ToString() ?? string.Empty,
//                                DiemTuCham1 = jObj["DiemTuCham1"]?.ToString() ?? string.Empty,
//                                DiemThamMuu1 = jObj["DiemThamMuu1"]?.ToString() ?? string.Empty,
//                                DiemLanhDaoDanhGia1 = jObj["DiemLanhDaoDanhGia1"]?.ToString() ?? string.Empty,
//                                Null1 = string.Empty,
//                            };
//                            rp.SetRepeat(obj);
//                        }

//                        if (jObj["Title2"] != null && !string.IsNullOrEmpty(jObj["Title2"].ToString()))
//                        {
//                            var obj = new PointObject2
//                            {
//                                Title2 = jObj["Title2"]?.ToString() ?? string.Empty,
//                                DiemScore2 = jObj["DiemScore2"]?.ToString() ?? string.Empty,
//                                DiemTuCham2 = jObj["DiemTuCham2"]?.ToString() ?? string.Empty,
//                                DiemThamMuu2 = jObj["DiemThamMuu2"]?.ToString() ?? string.Empty,
//                                DiemLanhDaoDanhGia2 = jObj["DiemLanhDaoDanhGia2"]?.ToString() ?? string.Empty,
//                                Null2 = string.Empty,
//                            };
//                            rp.SetRepeat(obj);
//                        }

//                        if (jObj["Title3"] != null && !string.IsNullOrEmpty(jObj["Title3"].ToString()))
//                        {
//                            var obj = new PointObject3
//                            {
//                                Title3 = jObj["Title3"]?.ToString() ?? string.Empty,
//                                DiemScore3 = jObj["DiemScore3"]?.ToString() ?? string.Empty,
//                                DiemTuCham3 = jObj["DiemTuCham3"]?.ToString() ?? string.Empty,
//                                DiemThamMuu3 = jObj["DiemThamMuu3"]?.ToString() ?? string.Empty,
//                                DiemLanhDaoDanhGia3 = jObj["DiemLanhDaoDanhGia3"]?.ToString() ?? string.Empty,
//                                Null3 = string.Empty,
//                            };
//                            rp.SetRepeat(obj);
//                        }

//                    }
//                    #endregion

//                    string fileName = $"Phiếu đánh giá phòng ban, đơn vị_{DateTime.Now.ToString("dd_MM_yyyy_hh_mm_ss")}.docx";
//                    string pathSave = $"{localPathUpload}/{fileName}";

//                    using (var streamOutput = new MemoryStream())
//                    {
//                        rp.Save(streamOutput, WordType.Docx);

//                        var res = await _minioService.UploadFileWithStreamDocxReturnUrlAsync(data.Id, streamOutput, fileName, "", "PhieuDanhGiaDonVi");
//                        return new UrlPhieuDanhGiaDto
//                        {
//                            UrlPdf = res.UrlPdf,
//                            UrlDocx = res.UrlDocx,
//                        };
//                    }
//                }
//            }
//        }
//        catch (Exception ex)
//        {
//            throw new Exception("Lỗi xuất phiếu đánh giá" + ex.Message);
//        }

//    }

//    private void GetListTieuChiOfMauPhieu(int index, List<TieuChiDanhGiaNooTreeDto> data, string listRootTieuChi)
//    {
//        if (index == 0)
//        {
//            data.ForEach(item =>
//            {

//                if (listRootTieuChi.Contains(item.MaTieuChi ?? string.Empty))
//                {
//                    TieuChiBoldMauPhieu1Object tieuChi = new TieuChiBoldMauPhieu1Object();
//                    tieuChi.STTBold1 = item.STT;
//                    tieuChi.TenTieuChiBold1 = item.TenTieuChi;
//                    tieuChi.ThangDiemBold1 = item.ThangDiem;
//                    tieuChi.DonViTinhBold1 = item.DonViTinh;
//                    tieuChi.DiemTuChamBold1 = item.DiemTuCham != null ? item.DiemTuCham.ToString() : string.Empty;
//                    tieuChi.DiemThamMuuBold1 = item.DiemThamMuu != null ? item.DiemThamMuu.ToString() : string.Empty;
//                    tieuChi.DiemLanhDaoDanhGiaBold1 = item.DiemDanhGia != null ? item.DiemDanhGia.ToString() : string.Empty;
//                    _listTieuChiMauPhieu.Add(tieuChi);
//                }
//                else
//                {
//                    TieuChiNormalMauPhieu1Object tieuChi = new TieuChiNormalMauPhieu1Object();
//                    tieuChi.STT1 = item.STT;
//                    tieuChi.TenTieuChi1 = item.TenTieuChi;
//                    tieuChi.ThangDiem1 = item.ThangDiem;
//                    tieuChi.DonViTinh1 = item.DonViTinh;
//                    tieuChi.DiemTuCham1 = item.DiemTuCham != null ? item.DiemTuCham.ToString() : string.Empty;
//                    tieuChi.DiemThamMuu1 = item.DiemThamMuu != null ? item.DiemThamMuu.ToString() : string.Empty;
//                    tieuChi.DiemLanhDaoDanhGia1 = item.DiemDanhGia != null ? item.DiemDanhGia.ToString() : string.Empty;
//                    _listTieuChiMauPhieu.Add(tieuChi);
//                }

//                if (item.DanhSachTieuChiCon.Count > 0)
//                {
//                    GetListTieuChiOfMauPhieu(index, item.DanhSachTieuChiCon, listRootTieuChi);
//                }
//            });
//        }

//        if (index == 1)
//        {
//            data.ForEach(item =>
//            {

//                if (listRootTieuChi.Contains(item.MaTieuChi ?? string.Empty))
//                {
//                    TieuChiBoldMauPhieu2Object tieuChi = new TieuChiBoldMauPhieu2Object();
//                    tieuChi.STTBold2 = item.STT;
//                    tieuChi.TenTieuChiBold2 = item.TenTieuChi;
//                    tieuChi.ThangDiemBold2 = item.ThangDiem;
//                    tieuChi.DonViTinhBold2 = item.DonViTinh;
//                    tieuChi.DiemTuChamBold2 = item.DiemTuCham != null ? item.DiemTuCham.ToString() : string.Empty;
//                    tieuChi.DiemThamMuuBold2 = item.DiemThamMuu != null ? item.DiemThamMuu.ToString() : string.Empty;
//                    tieuChi.DiemLanhDaoDanhGiaBold2 = item.DiemDanhGia != null ? item.DiemDanhGia.ToString() : string.Empty;
//                    _listTieuChiMauPhieu.Add(tieuChi);
//                }
//                else
//                {
//                    TieuChiNormalMauPhieu2Object tieuChi = new TieuChiNormalMauPhieu2Object();
//                    tieuChi.STT2 = item.STT;
//                    tieuChi.TenTieuChi2 = item.TenTieuChi;
//                    tieuChi.ThangDiem2 = item.ThangDiem;
//                    tieuChi.DonViTinh2 = item.DonViTinh;
//                    tieuChi.DiemTuCham2 = item.DiemTuCham != null ? item.DiemTuCham.ToString() : string.Empty;
//                    tieuChi.DiemThamMuu2 = item.DiemThamMuu != null ? item.DiemThamMuu.ToString() : string.Empty;
//                    tieuChi.DiemLanhDaoDanhGia2 = item.DiemDanhGia != null ? item.DiemDanhGia.ToString() : string.Empty;
//                    _listTieuChiMauPhieu.Add(tieuChi);
//                }

//                if (item.DanhSachTieuChiCon.Count > 0)
//                {
//                    GetListTieuChiOfMauPhieu(index, item.DanhSachTieuChiCon, listRootTieuChi);
//                }
//            });
//        }

//        if (index == 2)
//        {
//            data.ForEach(item =>
//            {

//                if (listRootTieuChi.Contains(item.MaTieuChi ?? string.Empty))
//                {
//                    TieuChiBoldMauPhieu3Object tieuChi = new TieuChiBoldMauPhieu3Object();
//                    tieuChi.STTBold3 = item.STT;
//                    tieuChi.TenTieuChiBold3 = item.TenTieuChi;
//                    tieuChi.ThangDiemBold3 = item.ThangDiem;
//                    tieuChi.DonViTinhBold3 = item.DonViTinh;
//                    tieuChi.DiemTuChamBold3 = item.DiemTuCham != null ? item.DiemTuCham.ToString() : string.Empty;
//                    tieuChi.DiemThamMuuBold3 = item.DiemThamMuu != null ? item.DiemThamMuu.ToString() : string.Empty;
//                    tieuChi.DiemLanhDaoDanhGiaBold3 = item.DiemDanhGia != null ? item.DiemDanhGia.ToString() : string.Empty;
//                    _listTieuChiMauPhieu.Add(tieuChi);
//                }
//                else
//                {
//                    TieuChiNormalMauPhieu3Object tieuChi = new TieuChiNormalMauPhieu3Object();
//                    tieuChi.STT3 = item.STT;
//                    tieuChi.TenTieuChi3 = item.TenTieuChi;
//                    tieuChi.ThangDiem3 = item.ThangDiem;
//                    tieuChi.DonViTinh3 = item.DonViTinh;
//                    tieuChi.DiemTuCham3 = item.DiemTuCham != null ? item.DiemTuCham.ToString() : string.Empty;
//                    tieuChi.DiemThamMuu3 = item.DiemThamMuu != null ? item.DiemThamMuu.ToString() : string.Empty;
//                    tieuChi.DiemLanhDaoDanhGia3 = item.DiemDanhGia != null ? item.DiemDanhGia.ToString() : string.Empty;
//                    _listTieuChiMauPhieu.Add(tieuChi);
//                }

//                if (item.DanhSachTieuChiCon.Count > 0)
//                {
//                    GetListTieuChiOfMauPhieu(index, item.DanhSachTieuChiCon, listRootTieuChi);
//                }
//            });
//        }
//    }

//    private class TieuChiBoldMauPhieu1Object
//    {
//        public string? STTBold1 { get; set; }
//        public string? TenTieuChiBold1 { get; set; }
//        public string? ThangDiemBold1 { get; set; }
//        public string? DonViTinhBold1 { get; set; }
//        public string? DiemTuChamBold1 { get; set; }
//        public string? DiemThamMuuBold1 { get; set; }
//        public string? DiemLanhDaoDanhGiaBold1 { get; set; }
//    }

//    private class TieuChiNormalMauPhieu1Object
//    {
//        public string? STT1 { get; set; }
//        public string? TenTieuChi1 { get; set; }
//        public string? ThangDiem1 { get; set; }
//        public string? DonViTinh1 { get; set; }
//        public string? DiemTuCham1 { get; set; }
//        public string? DiemThamMuu1 { get; set; }
//        public string? DiemLanhDaoDanhGia1 { get; set; }
//    }

//    private class TieuChiBoldMauPhieu2Object
//    {
//        public string? STTBold2 { get; set; }
//        public string? TenTieuChiBold2 { get; set; }
//        public string? ThangDiemBold2 { get; set; }
//        public string? DonViTinhBold2 { get; set; }
//        public string? DiemTuChamBold2 { get; set; }
//        public string? DiemThamMuuBold2 { get; set; }
//        public string? DiemLanhDaoDanhGiaBold2 { get; set; }
//    }

//    private class TieuChiNormalMauPhieu2Object
//    {
//        public string? STT2 { get; set; }
//        public string? TenTieuChi2 { get; set; }
//        public string? ThangDiem2 { get; set; }
//        public string? DonViTinh2 { get; set; }
//        public string? DiemTuCham2 { get; set; }
//        public string? DiemThamMuu2 { get; set; }
//        public string? DiemLanhDaoDanhGia2 { get; set; }
//    }

//    private class TieuChiBoldMauPhieu3Object
//    {
//        public string? STTBold3 { get; set; }
//        public string? TenTieuChiBold3 { get; set; }
//        public string? ThangDiemBold3 { get; set; }
//        public string? DonViTinhBold3 { get; set; }
//        public string? DiemTuChamBold3 { get; set; }
//        public string? DiemThamMuuBold3 { get; set; }
//        public string? DiemLanhDaoDanhGiaBold3 { get; set; }
//    }

//    private class TieuChiNormalMauPhieu3Object
//    {
//        public string? STT3 { get; set; }
//        public string? TenTieuChi3 { get; set; }
//        public string? ThangDiem3 { get; set; }
//        public string? DonViTinh3 { get; set; }
//        public string? DiemTuCham3 { get; set; }
//        public string? DiemThamMuu3 { get; set; }
//        public string? DiemLanhDaoDanhGia3 { get; set; }
//    }

//    public class PointObject1
//    {
//        public string? Title1 { get; set; }
//        public string? DiemScore1 { get; set; }
//        public string? DiemTuCham1 { get; set; }
//        public string? DiemThamMuu1 { get; set; }
//        public string? DiemLanhDaoDanhGia1 { get; set; }
//        public string? Null1 { get; set; }
//    }
//    public class PointObject2
//    {
//        public string? Title2 { get; set; }
//        public string? DiemScore2 { get; set; }
//        public string? DiemTuCham2 { get; set; }
//        public string? DiemThamMuu2 { get; set; }
//        public string? DiemLanhDaoDanhGia2 { get; set; }
//        public string? Null2 { get; set; }
//    }

//    public class PointObject3
//    {
//        public string? Title3 { get; set; }
//        public string? DiemScore3 { get; set; }
//        public string? DiemTuCham3 { get; set; }
//        public string? DiemThamMuu3 { get; set; }
//        public string? DiemLanhDaoDanhGia3 { get; set; }
//        public string? Null3 { get; set; }
//    }

//    private string GetTieuDeMauPhieu(string tenMauPhieu)
//    {
//        string stringResponse = string.Empty;
//        switch (tenMauPhieu)
//        {
//            case "Phụ lục 01: Tiêu chí chung":
//                stringResponse = "VỀ CÁC TIÊU CHÍ CHUNG";
//                break;
//            case "Phụ lục 02: Lãnh đạo cấp trưởng":
//                stringResponse = "ĐỐI VỚI CÔNG TÁC LÃNH ĐẠO, CHỈ ĐẠO";
//                break;
//            case "Phụ lục 02: Lãnh đạo cấp phó":
//                stringResponse = "ĐỐI VỚI CÔNG TÁC LÃNH ĐẠO, CHỈ ĐẠO";
//                break;
//            case "Phụ lục 03: Phiếu chấm điểm áp dụng đối với Thẩm phán":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI THẨM PHÁN";
//                break;
//            case "Phụ lục 04: Thẩm tra viên, Thư ký công tác tại các Vụ Giám đốc kiểm tra TANDTC, Phòng Giám đốc kiểm tra TANDCC hoặc thực hiện các nhiệm vụ về công tác thi hành án tại TAND tỉnh, TAND huyện":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI THẨM TRA VIÊN, THƯ KÝ LÀM CÔNG TÁC NGHIỆP VỤ";
//                break;
//            case "Phụ lục 04: Thư ký làm công tác thư ký các phiên tòa sơ thẩm, phúc thẩm":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI THẨM TRA VIÊN, THƯ KÝ LÀM CÔNG TÁC NGHIỆP VỤ";
//                break;
//            case "Phụ lục 04: Thẩm tra viên, Thư ký làm nhiệm vụ giúp việc cho Lãnh đạo, Thẩm phán Tòa án nhân dân tối cao":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI THẨM TRA VIÊN, THƯ KÝ LÀM CÔNG TÁC NGHIỆP VỤ";
//                break;
//            case "Công tác kiêm nhiệm (nhiệm vụ được phân công thực hiện thường xuyên ngoài nhiệm vụ chuyên môn được giao theo Quyết định)":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI THẨM TRA VIÊN, THƯ KÝ LÀM CÔNG TÁC NGHIỆP VỤ";
//                break;
//            case "Phụ lục 05: Các vị trí tham mưu giúp việc":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI CÔNG CHỨC, VIÊN CHỨC LÀM CÔNG TÁC CHUYÊN MÔN VÀ HỖ TRỢ PHỤC VỤ";
//                break;
//            case "Phụ lục 05: Vị trí kế toán":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI CÔNG CHỨC, VIÊN CHỨC LÀM CÔNG TÁC CHUYÊN MÔN VÀ HỖ TRỢ PHỤC VỤ";
//                break;
//            case "Phụ lục 05: Vị trí văn thư, lưu trữ":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI CÔNG CHỨC, VIÊN CHỨC LÀM CÔNG TÁC CHUYÊN MÔN VÀ HỖ TRỢ PHỤC VỤ";
//                break;
//            case "Phụ lục 05: Vị trí công nghệ thông tin":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI CÔNG CHỨC, VIÊN CHỨC LÀM CÔNG TÁC CHUYÊN MÔN VÀ HỖ TRỢ PHỤC VỤ";
//                break;
//            case "Phụ lục 05: Vị trí lái xe":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI CÔNG CHỨC, VIÊN CHỨC LÀM CÔNG TÁC CHUYÊN MÔN VÀ HỖ TRỢ PHỤC VỤ";
//                break;
//            case "Phụ lục 05: Vị trí bảo vệ":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI CÔNG CHỨC, VIÊN CHỨC LÀM CÔNG TÁC CHUYÊN MÔN VÀ HỖ TRỢ PHỤC VỤ";
//                break;
//            case "Phụ lục 05: Vị trí kỹ thuật":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI CÔNG CHỨC, VIÊN CHỨC LÀM CÔNG TÁC CHUYÊN MÔN VÀ HỖ TRỢ PHỤC VỤ";
//                break;
//            case "Phụ lục 05: Vị trí phục vụ":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI CÔNG CHỨC, VIÊN CHỨC LÀM CÔNG TÁC CHUYÊN MÔN VÀ HỖ TRỢ PHỤC VỤ";
//                break;
//            case "Công tác kiêm nhiệm (Các công việc, nhiệm vụ được phân công thực hiện thường xuyên ngoài công tác chuyên môn được giao theo quyết định của cơ quan có thẩm quyền)":
//                stringResponse = "ÁP DỤNG ĐỐI VỚI CÔNG CHỨC, VIÊN CHỨC LÀM CÔNG TÁC CHUYÊN MÔN VÀ HỖ TRỢ PHỤC VỤ";
//                break;
//            default:
//                stringResponse = "";
//                break;
//        }

//        return stringResponse;
//    }
//}
