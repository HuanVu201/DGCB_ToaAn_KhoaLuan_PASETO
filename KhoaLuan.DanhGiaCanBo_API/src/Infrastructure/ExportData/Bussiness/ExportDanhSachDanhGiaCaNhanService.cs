//using DocumentFormat.OpenXml.Spreadsheet;
//using MediatR;
//using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
//using Microsoft.Extensions.Configuration;
//using Newtonsoft.Json.Linq;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using Tandan.OpenReport;
//using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
//using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
//using TD.DanhGiaCanBo.Application.Common.Minio;
//using TD.DanhGiaCanBo.Application.Common.Persistence;
//using TD.DanhGiaCanBo.Application.ExportData.Bussiness.DanhSachDanhGiaCaNhan;
//using TD.DanhGiaCanBo.Application.ExportData.Bussiness.PhieuDanhGiaCaNhan;

//namespace TD.DanhGiaCanBo.Infrastructure.ExportData.Bussiness;
//public class ExportDanhSachDanhGiaCaNhanService : IExportExcelDanhGiaCaNhan
//{
//    private readonly IDapperRepository _dapperRepository;
//    private readonly IMediator _mediator;
//    private readonly IMinioService _minioService;
//    private readonly string? FileUploadLocalPath;

//    public ExportDanhSachDanhGiaCaNhanService(IDapperRepository dapperRepository, IMediator mediator, IMinioService minioService, IConfiguration configuration)
//    {
//        _dapperRepository = dapperRepository;
//        _mediator = mediator;
//        _minioService = minioService;
//        FileUploadLocalPath = configuration.GetValue<string>("FileConfig:FileUploadLocalPath");

//    }

//    public async Task<string> ExportDanhSachDanhGiaCaNhan(List<DanhGiaDto> danhGias, string urlPhoi)
//    {
//        var fileRes = await _minioService.GetFileByKey2Async(string.Empty, urlPhoi);
//        if (fileRes == null || fileRes.ByteRes == null || fileRes.ByteRes.Length == 0)
//        {
//            throw new Exception("File not found or is empty.");
//        }

//        string localPathUpload = !string.IsNullOrEmpty(FileUploadLocalPath) ? FileUploadLocalPath : AppDomain.CurrentDomain.BaseDirectory + "Files";
//        using (var stream = new MemoryStream(fileRes.ByteRes))
//        {
//            using (var rp = ExcelReport.Open(stream))
//            {
//                try
//                {
//                    string result = JsonConvert.SerializeObject(danhGias);
//                    var jArr = JArray.Parse(result);
//                    //if (!string.IsNullOrEmpty(parameters.GroupName))
//                    //    rp.SetTag("GroupName", parameters.GroupName.ToUpper());
//                    //if (!string.IsNullOrEmpty(parameters.TuNgay) || !string.IsNullOrEmpty(parameters.DenNgay))
//                    //    rp.SetTag("ThoiGian", $"Từ ngày {parameters.TuNgay ?? "..."} đến ngày {parameters.DenNgay ?? "..."} ");
//                    //if (!string.IsNullOrEmpty(parameters.TrangThaiHoSo))
//                    //    rp.SetTag("TrangThaiHoSo", $"Trạng thái hồ sơ: {parameters.TrangThaiHoSo}");

//                    for (int i = 0; i < jArr.Count; i++)
//                    {
//                        var jObj = (JObject)jArr[i];
//                        string kyDanhGiaValue = string.Empty;
//                        string thuocPhongBanDonViValue = string.Empty;
//                        string chucDanhChucVuValue = string.Empty;

//                        if (!string.IsNullOrEmpty(jObj["LoaiThoiGian"]?.ToString()) && jObj["LoaiThoiGian"]?.ToString().ToLower() != "năm")
//                        {
//                            kyDanhGiaValue = jObj["LoaiThoiGian"]?.ToString() + " " + jObj["ThoiGian"]?.ToString();
//                        }
//                        else
//                        {
//                            kyDanhGiaValue = jObj["LoaiThoiGian"]?.ToString() ?? string.Empty;
//                        }

//                        thuocPhongBanDonViValue = jObj["TenPhongBan"]?.ToString() + " - " + jObj["TenDonVi"]?.ToString();
//                        chucDanhChucVuValue = jObj["ChucDanh"]?.ToString() + " - " + jObj["ChucVu"]?.ToString();
//                        if (thuocPhongBanDonViValue.StartsWith(" - "))
//                            thuocPhongBanDonViValue = thuocPhongBanDonViValue.Substring(" - ".Length);
//                        if (chucDanhChucVuValue.StartsWith(" - "))
//                            chucDanhChucVuValue = chucDanhChucVuValue.Substring(" - ".Length);

//                        var obj = new ObjectDanhGiaCaNhan
//                        {
//                            STT = i + 1,
//                            KyDanhGia = kyDanhGiaValue,
//                            NamDanhGia = jObj["NamDanhGia"]?.ToString(),
//                            ThuocPhongBanDonVi = thuocPhongBanDonViValue,
//                            ChucDanhChucVu = chucDanhChucVuValue,
//                            DiemDanhGia = jObj["DiemDanhGia"]?.ToString(),
//                            XepLoaiDanhGia = jObj["PhanLoaiDanhGia"]?.ToString(),
//                            ThoiGianTuDanhGia = !string.IsNullOrWhiteSpace(jObj["CreatedOn"]?.ToString()) ?
//                                        DateTime.Parse(jObj["CreatedOn"].ToString()).ToString("HH:mm, dd/MM/yyyy") : string.Empty,
//                            TrangThai = jObj["TrangThai"]?.ToString(),
//                        };

//                        rp.SetRepeat(obj);
//                    }

//                    string fileName = $"Danh sách đánh giá cá nhân_{DateTime.Now.ToString("dd_MM_yyyy_hh_mm_ss")}.xlsx";
//                    string pathSave = $"{localPathUpload}/{fileName}";

//                    using (var streamOutput = new MemoryStream())
//                    {
//                        rp.Save(streamOutput, ExcelFileType.Excel2013);

//                        string res = await _minioService.UploadFileWithStreamExcelReturnUrlAsync(streamOutput, fileName, "", "DanhSachDanhGiaCaNhan");
//                        return res ?? string.Empty;
//                    }
//                }
//                catch (Exception ex)
//                {
//                    Console.WriteLine("Lỗi xuất file excel: " + ex.ToString());
//                    throw new Exception("Lỗi xuất excel" + ex.Message);
//                }
//            }
//        }
//    }

//    public class ObjectDanhGiaCaNhan
//    {
//        public int STT { get; set; }
//        public string? KyDanhGia { get; set; }
//        public string? NamDanhGia { get; set; }
//        public string? ThuocPhongBanDonVi { get; set; }
//        public string? ChucDanhChucVu { get; set; }
//        public string? DiemDanhGia { get; set; }
//        public string? XepLoaiDanhGia { get; set; }
//        public string? ThoiGianTuDanhGia { get; set; }
//        public string? TrangThai { get; set; }
//    }
//}