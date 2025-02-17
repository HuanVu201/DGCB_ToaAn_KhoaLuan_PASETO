

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.ActionApp;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp;


public class BoTieuChuanDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string MaBoTieuChi { get; set; }
    public string TenBoTieuChi { get; set; }
    public bool SuDung { get; set; }
    public string DinhKem { get; set; }
    public string SoKyHieu { get; set; }
    public string NgayBanHanh { get; set; }
    public string CoQuanBanHanh { get; set; }
    public string LoaiThoiGian { get; set; }
    public string ThoiGian { get; set; }
    public string DonVi { get; set; }
    public int? CauHinhThoiGianGiaHan { get; set; }
    public bool? LaDonVi { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    //Update

    [JsonIgnore] 
    public int TotalCount { get; set; }
}
