using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

namespace TD.DanhGiaCanBo.Application.ExportData.Bussiness.DanhSachDanhGiaCaNhan;
public class ExportExcelDanhGiaCaNhanRequest : IRequest<Result<string>>
{
    public string? TrangThai { get; set; }
    public string? PhanLoaiDanhGia { get; set; }
    public string? LoaiNgay { get; set; }
    public string? LoaiDanhGia { get; set; }
    public string? Type { get; set; }
    public string? MaPhongBan { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaDonViCha { get; set; }
    public string? ThoiGianQuery { get; set; }
    public string? LoaiThoiGian { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public bool? TruongDonVi { get; set; }
    public bool? GetDataCurrentUser { get; set; }
    public bool? FilterByUserRole { get; set; }
    public bool? ToanBoDonVi { get; set; }
    public bool? SuDung { get; set; } = true;
    public bool? DifferencePerson { get; set; }
    public bool? ChuaKhieuNai { get; set; }
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}