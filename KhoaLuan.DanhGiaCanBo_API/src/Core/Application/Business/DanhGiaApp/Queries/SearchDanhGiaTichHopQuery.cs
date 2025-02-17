using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class SearchDanhGiaTichHopQuery : PaginationFilter, IRequest<PaginationResponse<DSDanhGiaDto>>
{
    public string? TrangThai { get; set; }
    public string? PhanLoaiDanhGia { get; set; }
    public string? Nguon { get; set; }
    public string? LoaiNgay { get; set; }
    public string? LoaiThoiGian { get; set; }
    public string? LoaiDanhGia { get; set; }
    public string? Type { get; set; }
    public string? MaPhongBan { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaDonViCha { get; set; }
    public string? ThoiGianQuery { get; set; }
    public string? KyDanhGia { get; set; }
    public int? NamDanhGia { get; set; }

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
