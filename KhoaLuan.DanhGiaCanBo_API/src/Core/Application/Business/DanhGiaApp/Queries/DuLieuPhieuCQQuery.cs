using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;


public class DuLieuPhieuCQQuery : IQuery<List<DataPhieuTongHopCQDto>>
{
    public string? KyDanhGia { get; set; }
    public string? MaPhongBan { get; set; }
    public string? NamHienTai { get; set; }
    public string? Type { get; set; }
    public string? XepLoai { get; set; }

}
    