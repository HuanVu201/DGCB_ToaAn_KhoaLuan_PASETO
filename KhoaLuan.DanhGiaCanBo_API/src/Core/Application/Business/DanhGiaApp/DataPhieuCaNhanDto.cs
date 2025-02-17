using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

public class DataPhieuCaNhanDto : IDto
{
    public string Thang { get; set; }
    public string DiemDanhGia { get; set; }
    public string XepLoai { get; set; }
}
