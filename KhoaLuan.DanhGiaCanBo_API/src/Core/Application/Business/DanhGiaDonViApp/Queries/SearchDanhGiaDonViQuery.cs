using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;

public class SearchDanhGiaDonViQuery : PaginationFilter, IRequest<PaginationResponse<DanhGiaDonViDto>>
{

    public string? TrangThai { get; set; }
    public List<string>? TrangThais { get; set; }
    public string? PhanLoaiDanhGia { get; set; }
    public string? LoaiNgay { get; set; }
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
    public bool? SendDanhGia { get; set; }

    public string? ChucVu { get; set; }
    public string? ChucDanh { get; set; }
    public string? HoVaTen { get; set; }
    public bool? ToanBoDonVi { get; set; }
    public bool? SuDung { get; set; } = true;
    public bool? DifferencePerson { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
