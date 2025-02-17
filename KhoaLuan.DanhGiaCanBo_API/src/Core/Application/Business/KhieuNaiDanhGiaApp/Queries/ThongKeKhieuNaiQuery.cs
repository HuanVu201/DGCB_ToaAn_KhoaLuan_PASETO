using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Queries;


public class ThongKeKhieuNaiCommand : IRequest<Result<List<DataThongKeKhieuNaiDanhGiaDto>>>
{
    public string? MaPhongBan { get; set; }
    public string? MaDonVi { get; set; }
    public string? TrangThai { get; set; }

    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
