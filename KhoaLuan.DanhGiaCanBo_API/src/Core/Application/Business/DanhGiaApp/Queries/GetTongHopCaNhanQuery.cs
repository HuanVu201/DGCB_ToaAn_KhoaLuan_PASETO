using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;


public class GetTongHopCaNhanQuery : IQuery<List<DataPhieuCaNhanDto>>
{
    public string? MaNguoiDung { get; set; }
    public string? NamHienTai { get; set; }
  

}
