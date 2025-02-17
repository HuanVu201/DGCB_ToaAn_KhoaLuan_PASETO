

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.ActionApp;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;


public class TieuChiDanhGiaDto : IDto
{
    public DefaultIdType Id { get; set; }
    [MaxLength(5000)]
    public string Ten { get; set; }
    [MaxLength(100)]
    public string Ma { get; set; }
    public string KieuTieuChi { get; set; }
    public string DonViTinh { get; set; }
    public string LoaiDiem { get; set; }
    public string ThuocTieuChi { get; set; }//Mã nhóm tiêu chí
    public string NhomTieuChi { get; set; } //Tiêu nhóm tiêu chí hiển thị
    public int ThuTu { get; set; }
    public string MaDayDu { get; set; }
    //Update

    [JsonIgnore] 
    public int TotalCount { get; set; }
}
