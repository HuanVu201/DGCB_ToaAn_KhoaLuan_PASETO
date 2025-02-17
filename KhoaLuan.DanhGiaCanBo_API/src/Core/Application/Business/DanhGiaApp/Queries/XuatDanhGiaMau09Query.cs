using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;


public class XuatDanhGiaMau09Query : IQuery<List<ItemThongKeBaoCaoDto>>
{
    public string? KyDanhGia { get; set; }
    public string? NamDanhGia { get; set; }
    public string? MaDonVi { get; set; }
    public string? LoaiThoiGian { get; set; }

}
